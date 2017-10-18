using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Helpers
{
    public class TimestampTransformer
    {
        public static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
        {
            var buf = unixTimeStamp / 1000;
            DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(buf).ToUniversalTime();
            return dtDateTime;
            //return DateTimeOffset.FromUnixTimeMilliseconds(unixTimeStamp/1000).UtcDateTime;
        }
    }
}
