using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.CsvExport.Entities
{
    public class AccountCar
    {
        [Key]
        public long id { get; set; }
        public long account_id { get; set; }
        public string name { get; set; }
        public string vin_code { get; set; }

    }
    public class AccountCarViewModel
    {
     
        public long id { get; set; }
        public string name { get; set; }
        

    }
}
