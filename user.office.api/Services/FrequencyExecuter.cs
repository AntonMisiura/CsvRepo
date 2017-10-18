//using System;
//using System.Collections.Generic;
//using System.Linq;

//namespace user.office.api.Services
//{
//    public class T
//    {
//        public long TimeStamp { get; set; }
//        public string SomeShit4 { get; set; }
//        public int SomeShit5 { get; set; }
//    }

//    public class U
//    {
//        public long TimeStamp { get; set; }
//        public double SomeShit6 { get; set; }
//        public double SomeShit7 { get; set; }
//        public long SomeShit8 { get; set; }
//    }

//    public class Y
//    {
//        public long TimeStamp { get; set; }
//        public string SomeShit1 { get; set; }
//        public string SomeShit2 { get; set; }
//        public long SomeShit3 { get; set; }
//    }

//    public class Merged
//    {
//        public long TimeStamp { get; set; }
//        public string SomeShit1 { get; set; }
//        public string SomeShit2 { get; set; }
//        public long SomeShit3 { get; set; }
//        public string SomeShit4 { get; set; }
//        public int SomeShit5 { get; set; }
//        public double SomeShit6 { get; set; }
//        public double SomeShit7 { get; set; }
//        public long SomeShit8 { get; set; }
//    }

//    public class FrequencyExecuter
//    {
//        public int GetFrequency(List<T> imuDataList, List<Y> gpsDataList, List<U> obdDataList)
//        {
//            //var timeStampsByTrack = someDataList.Select(timestamp => timestamp.Id).ToList();

//            //var firstFourValues = timeStampsByTrack.OrderBy(i => i).Take(4);

//            imuDataList = new List<T>()
//            {
//                new T() {TimeStamp = 101001010, SomeShit4 = "someshit4", SomeShit5 = 5},
//                new T() {TimeStamp = 101001010, SomeShit4 = "someshit4", SomeShit5 = 5},
//                new T() {TimeStamp = 101001010, SomeShit4 = "someshit4", SomeShit5 = 5}
//            };

//            gpsDataList = new List<Y>()
//            {
//                new Y() {TimeStamp = 101001010, SomeShit1 = "someshit1", SomeShit2 = "someshit2", SomeShit3 = 3},
//                new Y() {TimeStamp = 101001010, SomeShit1 = "someshit1", SomeShit2 = "someshit2", SomeShit3 = 3},
//                new Y() {TimeStamp = 101001010, SomeShit1 = "someshit1", SomeShit2 = "someshit2", SomeShit3 = 3}
//            };

//            obdDataList = new List<U>()
//            {
//                new U() {TimeStamp = 101001010, SomeShit6 = 6.3, SomeShit7 = 7.3, SomeShit8 = 8},
//                new U() {TimeStamp = 101001010, SomeShit6 = 6.2, SomeShit7 = 7.2, SomeShit8 = 8},
//                new U() {TimeStamp = 101001010, SomeShit6 = 6.1, SomeShit7 = 7.1, SomeShit8 = 8}
//            };

//            var imuAndGps = imuDataList.Join(gpsDataList, arg => arg.TimeStamp, arg => arg.TimeStamp,
//                (first, second) => new { TimeStamp = first.TimeStamp,
//                    SomeShit4 = first.SomeShit4,
//                    SomeShit5 = first.SomeShit5,
//                    SomeShit1 = second.SomeShit1,
//                    SomeShit2 = second.SomeShit2,
//                    SomeShit3 = second.SomeShit3
//                });
            

//            var merged = imuAndGps.Join(obdDataList, arg => arg.TimeStamp, arg => arg.TimeStamp,
//                (first, second) => new {
//                    TimeStamp = first.TimeStamp,
//                    SomeShit1 = first.SomeShit1,
//                    SomeShit2 = first.SomeShit2,
//                    SomeShit3 = first.SomeShit3,
//                    SomeShit4 = first.SomeShit4,
//                    SomeShit5 = first.SomeShit5,
//                    SomeShit6 = second.SomeShit6,
//                    SomeShit7 = second.SomeShit7,
//                    SomeShit8 = second.SomeShit8
//                }).ToList();

//            foreach (var item in merged)
//            {
//                Console.WriteLine("{0}: {1} - {2} - {3} - {4} - {5} - {6} - {7}",
//                    item.TimeStamp, item.SomeShit1, item.SomeShit2, item.SomeShit3,
//                    item.SomeShit4, item.SomeShit5, item.SomeShit6, item.SomeShit7, item.SomeShit8);
//                Console.ReadLine();
//            }

//            const int i = 0;
//            return i;
//        }
//    }


//}
