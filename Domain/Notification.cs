﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
   public class Notification
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public AppUser Receiever { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
