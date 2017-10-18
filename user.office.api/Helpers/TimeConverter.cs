using System;

namespace user.office.api.Helpers
{
    public static class TimeConverter
    {
        public static DateTime Convert(double unixTimeStamp)
        {
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToUniversalTime();
            return dtDateTime;
        }
        //public static long Convert(DateTime dateTime)
        //{
        //    return (long)(TimeZoneInfo.ConvertTimeToUtc(dateTime) -
        //           new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc)).TotalSeconds;
        //}
        public static long Convert(DateTime dateTime)
        {
            var buf = TimeZoneInfo.ConvertTimeToUtc(dateTime);
            return (long)(dateTime -
                   new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc)).TotalSeconds;
        }
    }
}
