using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace user.office.api.Entities
{
    public class Device
    {
        [Key]
        public long id { get; set; }
        public string original_id { get; set; }
        public virtual List<OBDRecord> obdRecords { get; set; }
       
    }
}
