//using System;
//using System.Collections.Generic;
//using System.Linq;
//using user.office.api.Entities;

//namespace user.office.api.Services
//{
//    public class EmptySpacesExecuter
//    {
//        public bool AscOrDesc;
//        private double? _lastValue;
//        private double? _currValue;
//        private long _lastTimestamp;
//        private long _currTimestamp;
//        private double? _iterationValueStep;

//        public List<CsvValues> GetCsvValues(List<IMURecord> imuData, List<GpsData> gpsData, List<OBDRecord> obdData)
//        {
//            var csvValues =
//                imuData.Select(imu => new CsvValues()
//                {
//                    timestamp = imu.unix_timestamp,
//                    acc_x = imu.acc_x,
//                    acc_y = imu.acc_y,
//                    acc_z = imu.acc_z,
//                    mag_x = imu.mag_x,
//                    mag_y = imu.mag_y,
//                    mag_z = imu.mag_z,
//                    gyro_xangle = imu.gyro_xangle,
//                    gyro_yangle = imu.gyro_yangle,
//                    gyro_zangle = imu.gyro_zangle
//                }).ToList();

//            foreach (var csvObj in csvValues)
//            {
//                var nearestObdRecord = obdData
//                    .OrderBy(obd => Math.Abs(obd.unix_timestamp - csvObj.timestamp))
//                    .First();

//                csvObj.obd_event_id = nearestObdRecord.event_id;
//                csvObj.pid = nearestObdRecord.pid;
//                csvObj.pidValue = nearestObdRecord.value;

//                var nearestGpsRecord = gpsData
//                    .OrderBy(gps => Math.Abs(gps.unix_timestamp - csvObj.timestamp))
//                    .First();

//                csvObj.gps_event_id = nearestGpsRecord.event_id;
//                csvObj.latitude = nearestGpsRecord.latitude;
//                csvObj.longitude = nearestGpsRecord.longitude;
//                csvObj.track = nearestGpsRecord.track;
//            }

//            return csvValues;
//        }

//        public List<CsvValues> PushToEmptySpaces(List<CsvValues> csvValues)
//        {
//            var accXArr = csvValues
//                .Where(csv => csv.acc_x == null)
//                .Select(csv => csv.acc_x)
//                .ToArray();
//            var accYArr = csvValues.Select(csv => csv.acc_y).ToArray();
//            var accZArr = csvValues.Select(csv => csv.acc_z).ToArray();
//            var magXArr = csvValues.Select(csv => csv.mag_x).ToArray();
//            var magYArr = csvValues.Select(csv => csv.mag_y).ToArray();
//            var magZArr = csvValues.Select(csv => csv.mag_z).ToArray();
//            var gyroXArr = csvValues.Select(csv => csv.gyro_xangle).ToArray();
//            var gyroYArr = csvValues.Select(csv => csv.gyro_yangle).ToArray();
//            var gyroZArr = csvValues.Select(csv => csv.gyro_zangle).ToArray();
//            var obdEventIdArr = csvValues.Select(csv => csv.obd_event_id).ToArray();
//            var pidArr = csvValues.Select(csv => csv.pid).ToArray();
//            var pidValueArr = csvValues.Select(csv => csv.pidValue).ToArray();
//            var gpsEventIdArr = csvValues.Select(csv => csv.gps_event_id).ToArray();
//            var latitudeArr = csvValues.Select(csv => csv.latitude).ToArray();
//            var longtitudeArr = csvValues.Select(csv => csv.longitude).ToArray();
//            var trackArr = csvValues.Select(csv => csv.track).ToArray();


//            var accXEmpty = ExecuteEmptyCsvValues(accXArr);
//            var accYEmpty = ExecuteEmptyCsvValues(accYArr);
//            var accZEmpty = ExecuteEmptyCsvValues(accZArr);
//        }

//        public List<Empty> FindAndExecuteEmtEmpties(double?[] array)
//        {
//            var counter = 0;
//            var emptyObjectCounter = new List<Empty>();

//            foreach (var value in array)
//            {
//                if (counter == 0)
//                {
//                    _lastValue = value;
//                }

//                if (value == null)
//                {
//                    counter++;
//                }

//                do
//                {
//                    if (value != null)
//                    {
//                        _currValue = value;

//                        if (_lastValue != null)
//                        {
//                            if (_lastValue > _currValue)
//                            {
//                                AscOrDesc = false;
//                                _iterationValueStep = (_lastValue - _currValue) / counter;
//                            }
//                            else if (_lastValue < _currValue || _lastValue == null)
//                            {
//                                AscOrDesc = true;
//                                _iterationValueStep = (_currValue - _lastValue) / counter;
//                            }
//                        }

//                        if (!AscOrDesc)
//                        {
//                            _currValue = _lastValue - _iterationValueStep;
//                        }
//                        else
//                        {
//                            _currValue = _lastValue + _iterationValueStep;
//                        }

//                        _currValue = value; //must be value = _currValue; but it's impossible

//                        counter = 0;
//                    }

//                } while (value != null);
//            }

//            return emptyObjectCounter;
//        }

//        public List<Empty> ExecuteEmptyCsvValues(double? [] array)
//        {
//            var counter = 0;
//            var emptyObjectCounter = new List<Empty>();

//            foreach (var value in array)
//            {
//                var arrayNum = 0;
//                arrayNum++;

//                if (counter == 0)
//                {
//                    _lastValue = value;
//                }

//                if (value == null)
//                {
//                    counter++;
//                }
//                else if (counter != 0)
//                {
//                    _currValue = value;

//                    emptyObjectCounter.Add(new Empty()
//                    {
//                        TimeStampForEmpty = arrayNum - 1,
//                        Step = counter
//                    });

//                    if (_lastValue > _currValue)
//                    {
//                        AscOrDesc = false;

//                        _iterationValueStep = (_lastValue - _currValue) / counter;
//                    }
//                    else if (_lastValue < _currValue || _lastValue == null)
//                    {
//                        AscOrDesc = true;

//                        _iterationValueStep = (_currValue - _lastValue) / counter;
//                    }

//                    counter = 0;
//                }
//            }

//            return emptyObjectCounter;
//        }

















//        public List<ValuePerTimeStampImu> PushImuValuesToEmptySpaces(List<IMURecord> imu)
//        {
//            var imuValuesAccX =
//                imu.Select(i => new ValuePerTimeStampImu()
//                {
//                    TimeStamp = i.unix_timestamp,
//                    Value = i.acc_x
//                }).ToList();

//            var counter = 0;
//            var emptyObjectCounter = new List<Empty>();
            

//            foreach (var value in imuValuesAccX)
//            {
//                if (value.Value == null)
//                {
//                    _lastValue = value.Value;
//                    _lastTimestamp = value.TimeStamp;

//                    counter++;
//                }
//                else if (counter != 0)
//                {
//                    _currValue = value.Value;
//                    _currTimestamp = value.TimeStamp;

//                    emptyObjectCounter.Add(new Empty()
//                    {
//                        TimeStampForEmpty = (int)value.TimeStamp,
//                        Step = counter
//                    });

//                    if (_lastValue > _currValue)
//                    {
//                        AscOrDesc = false;

//                        _iterationValueStep = (_lastValue - _currValue) / counter;
//                    }
//                    else if (_lastValue < _currValue)
//                    {
//                        AscOrDesc = true;

//                        _iterationValueStep = (_currValue - _lastValue) / counter;
//                    }

//                    counter = 0;
//                }
//            }
//            //TODO: Get current and last value, step and make up empty spacec, by ASC or by DESC, check if current > or < then last value
//        }
//    }

//    public class Empty
//    {
//        public int TimeStampForEmpty { get; set; }
//        public int Step { get; set; }
//    }

//    public class ValuePerTimeStampImu
//    {
//        public long TimeStamp { get; set; }
//        public double? Value { get; set; }
//    }

//    public class ImuValues
//    {
//        public long timestamp { get; set; }
//        public double acc_x { get; set; }
//        public double acc_y { get; set; }
//        public double acc_z { get; set; }

//        public double mag_x { get; set; }
//        public double mag_y { get; set; }
//        public double mag_z { get; set; }

//        public double gyro_xangle { get; set; }
//        public double gyro_yangle { get; set; }
//        public double gyro_zangle { get; set; }
//    }

//    public class ValuePerTimeStampGps
//    {
//        public long TimeStamp { get; set; }
//        public long? Value { get; set; }
//    }

//    public class GpsValues
//    {
//        public long timestamp { get; set; }
//        public double latitude { get; set; }
//        public double longitude { get; set; }
//        public long attitude { get; set; }
//        public long track { get; set; }
//    }

//    public class ValuePerTimeStampObd
//    {
//        public long TimeStamp { get; set; }
//        public double? Value { get; set; }
//    }

//    public class ValuePerTimeStampObdPid
//    {
//        public long TimeStamp { get; set; }
//        public string Value { get; set; }
//    }

//    public class ObdValues
//    {
//        public long timestamp { get; set; }
//        public string pid { get; set; }
//        public double value { get; set; }
//    }


//    public class CsvValues
//    {
//        public long timestamp { get; set; }

//        public double? acc_x { get; set; }
//        public double? acc_y { get; set; }
//        public double? acc_z { get; set; }
//        public double? mag_x { get; set; }
//        public double? mag_y { get; set; }
//        public double? mag_z { get; set; }
//        public double? gyro_xangle { get; set; }
//        public double? gyro_yangle { get; set; }
//        public double? gyro_zangle { get; set; }
        
//        public int? obd_event_id { get; set; }
//        public string pid { get; set; }
//        public double? pidValue { get; set; }

//        public long? gps_event_id { get; set; }
//        public double? latitude { get; set; }
//        public double? longitude { get; set; }
//        public long? attitude { get; set; }
//        public long? track { get; set; }
//    }
//}
//}
