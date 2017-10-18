using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Models
{
    public class ObdDataRecord
    {
        public string original_id { get; set; }
        public DateTimeOffset system_timestamp { get; set; }
        public long unix_timestamp { get; set; }
        public long value { get; set; }
        public string pid { get; set; }
    }
    public class ObdDataRecordViewModel
    {
        public string OriginalID { get; set; }
        public DateTime RecordTime { get; set; }
        public long Value { get; set; }
        public string PIDCode { get; set; }
        public DateTimeOffset SystemTimestamp { get; set; }
        public ObdDataRecordViewModel(string originalID, long recordTime, long value, string PID, DateTimeOffset date)
        {
            OriginalID = originalID;
            RecordTime = Helpers.TimestampTransformer.UnixTimeStampToDateTime(recordTime);
            Value = value;
            PIDCode = PID;
            SystemTimestamp = date;

        }
    }
    public class RecordResponse { 
        public List<string> PidCodes { get; set; }
        public List<string> PidNames { get; set; }
        public List<ObdDataRecordViewModel> Pids { get; set; }
        public RecordResponse() {
            PidCodes = new List<string>();
            PidNames = new List<string>();
            Pids = new List<ObdDataRecordViewModel>();
        }
    }
}
