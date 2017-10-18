//using System;
//using System.Collections.Generic;
//using System.Linq;
//using user.office.api.Entities;

//namespace user.office.api.Services
//{
//    public class FrequencyFreighter
//    {
//        private TimeSpan _freqPerSecond;
//        private long [] _timeStampValues = new long [43];
//        private TimeSpan[] _timeStampDifference = new TimeSpan[43];
//        private DateTime _firstValue;
//        private DateTime _secondValue;


//        public TimeSpan[] FrequencyPerSecondFreighter(List<GpsData> data)
//        {
//            var i = 0;
//            foreach (var p in data)
//            {
                
//                _timeStampValues[i] = p.unix_timestamp;
//                i++;
//            }

//            Console.Write(_timeStampValues);

//            for (i = 0; i < _timeStampValues.Length-1; i++)
//            {
//                _firstValue = Convert(_timeStampValues[i]);
//                _secondValue = Convert(_timeStampValues[i+1]);

//                _freqPerSecond = _secondValue - _firstValue;

//                _timeStampDifference[i] = _freqPerSecond;
//            }

//            Console.Write(_timeStampDifference);

//            return _timeStampDifference;
//        }


//        public static DateTime Convert(long unixTimeStamp)
//        {
//            // Unix timestamp is seconds past epoch
//            var dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
//            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp).ToLocalTime();
//            return dtDateTime;
//        }

//    }
//}
