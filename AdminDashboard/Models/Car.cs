using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Models
{
    public class Car
    {
        public long id { get; set; }
        public long account_id { get; set; }
        public string name { get; set; }
        public string vin_code { get; set; }
    }
}
