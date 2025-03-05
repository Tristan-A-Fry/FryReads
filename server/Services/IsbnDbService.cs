

public interface IIsbnDbService
{
    Task<string> GetBookByIsbnAsync(string isbn); 
}

public class IsbnDbService : IIsbnDbService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _baseUrl;

    public IsbnDbService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Isbndb:ApiKey"] ?? throw new ArgumentNullException(nameof(_apiKey));
        _baseUrl = configuration["Isbndb:BaseUrl"] ?? throw new ArgumentNullException(nameof(_baseUrl));

        // ✅ Set the correct Authorization header format (No Bearer)
        _httpClient.DefaultRequestHeaders.Add("Authorization", _apiKey);
    }

    public async Task<string> GetBookByIsbnAsync(string isbn)
    {
        var requestUrl = $"{_baseUrl}/book/{isbn}";
        
        //For debugging
        // Console.WriteLine($"📌 Sending request to: {requestUrl}");
        // Console.WriteLine($"📌 Authorization: {_apiKey}");

        var response = await _httpClient.GetAsync(requestUrl);
        
        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"❌ Failed with status: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
        }

        return await response.Content.ReadAsStringAsync();
    }
}

