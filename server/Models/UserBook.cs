using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class UserBook
    {
      public int Id { get; set; }
      public string UserId { get; set; }
      public ApplicationUser User { get; set; }

      public string Title { get; set; }
      public string Author { get; set; }

      public int CurrentPage { get; set; }
      public bool IsCompleted { get; set; }

      public DateTime AddedDate { get; set; }
    }
}
