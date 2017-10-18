﻿using System.ComponentModel.DataAnnotations;

namespace backend.auth.api.Entities
{
    public class AuthFacebook
    {
        [Key]
        public long account_id { get; set; }
        public string email { get; set; }
        public string facebook_id { get; set; }
    }
}
