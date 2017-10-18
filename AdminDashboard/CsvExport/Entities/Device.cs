using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AdminDashboard.CsvExport.Entities
{
    public class Device
    {
        [Key]
        public long id { get; set; }
        public string original_id { get; set; }
        public virtual List<ObdData> obdRecords { get; set; }
    }
}
