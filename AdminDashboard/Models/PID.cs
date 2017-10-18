using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Models
{
    public class PID
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public PID(string name, string code)
        {
            Code = code;
            Name = name;
        }
    }
}
