using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
namespace server.Models
{
    public class UserBook
    {
      public int Id { get; set; }

      [JsonIgnore]
      [ValidateNever]
      public string UserId { get; set; }

      [JsonIgnore]
      [ValidateNever]
      public ApplicationUser User { get; set; }

      public string Title { get; set; }
      public string Author { get; set; }

      public string Isbn {get; set;}
      public string Status {get; set;}

      public int CurrentPage { get; set; }
      public bool IsCompleted { get; set; }

      public DateTime AddedDate { get; set; }

    }
}
