using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AdminDashboard.CsvExport.Contracts;
using AdminDashboard.CsvExport.Entities;

namespace AdminDashboard.CsvExport.Impl
{
    public class CsvExportService : ICsvExportService
    {

        private bool _ascOrDesc;
        private double? _lastValue;
        private double? _currValue;
        private double? _iterationValueStep;
        private long? _lastValueForLongType;
        private long? _currValueForLongType;
        private long? _iterationValueStepForLongType;
        private ICsvExportRepository _csvExportRepository;
        

        public CsvExportService(ICsvExportRepository csvExportRepository)
        {
            _csvExportRepository = csvExportRepository;
        }

        public IEnumerable<CsvValues> GetData(long id, DateTime start, DateTime end)
        {
            var gpsData = _csvExportRepository.GetGpsData(id, start, end).ToList();
            var imuData = _csvExportRepository.GetImuData(id, start, end).ToList();
            var obdData = _csvExportRepository.GetObdData(id, start, end).ToList();

            var csvData = PushToCsvList(imuData, gpsData, obdData);

            //BL & write to csv
            csvData = FillEmptySpaces(csvData);

            return csvData;
        }

        public List<CsvValues> PushToCsvList(List<ImuData> imuData, List<GpsData> gpsData, List<ObdData> obdData)
        {
            var imuDates =
                imuData.Select(imu => new CsvValues()
                {
                    device_timestamp = imu.device_timestamp
                }).ToList();

            var obdDates =
                obdData.Select(obd => new CsvValues()
                {
                    device_timestamp = obd.device_timestamp
                }).ToList();

            var gpsDates =
                gpsData.Select(gps => new CsvValues()
                {
                    device_timestamp = gps.device_timestamp
                }).ToList();

            imuDates.AddRange(obdDates);
            imuDates.AddRange(gpsDates);
            var csvValues = imuDates.OrderBy(i => i.device_timestamp).ToList();

            foreach (var csv in csvValues)
            {
                foreach (var gps in gpsData)
                {
                    if (DateTime.Compare(csv.device_timestamp, gps.device_timestamp) == 1)
                    {
                        csv.attitude = gps.attitude;
                        csv.longitude = gps.longitude;
                        csv.latitude = gps.latitude;
                        csv.track = gps.track;
                    }
                }

                foreach (var obd in obdData)
                {
                    if (DateTime.Compare(csv.device_timestamp, obd.device_timestamp) == 1)
                    {
                        csv.pidValue = obd.value;
                    }
                }

                foreach (var imu in imuData)
                {
                    if (DateTime.Compare(csv.device_timestamp, imu.device_timestamp) == 1)
                    {
                        csv.acc_x = imu.acc_x;
                        csv.acc_y = imu.acc_y;
                        csv.acc_z = imu.acc_z;
                        csv.mag_x = imu.mag_x;
                        csv.mag_y = imu.mag_y;
                        csv.mag_z = imu.mag_z;
                        csv.gyro_xangle = imu.gyro_xangle;
                        csv.gyro_yangle = imu.gyro_yangle;
                        csv.gyro_zangle = imu.gyro_zangle;
                    }
                }
            }

            return csvValues;
        }

        public List<CsvValues> FillEmptySpaces(List<CsvValues> csvValues)
        {
            //var accXArr = csvValues.Select(csv => csv.acc_x).ToArray();
            //accXArr = FindEmptiesDouble(accXArr);
            //for (var i = accXArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.acc_x = accXArr[j]);
            //}
            
            //var accYArr = FindEmptiesDouble(csvValues.Select(csv => csv.acc_y).ToArray());
            //for (var i = accYArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.acc_y = accYArr[j]);
            //}

            //var accZArr = FindEmptiesDouble(csvValues.Select(csv => csv.acc_z).ToArray());
            //for (var i = accZArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.acc_z = accZArr[j]);
            //}

            //var magXArr = FindEmptiesDouble(csvValues.Select(csv => csv.mag_x).ToArray());
            //for (var i = magXArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.mag_x = magXArr[j]);
            //}

            //var magYArr = FindEmptiesDouble(csvValues.Select(csv => csv.mag_y).ToArray());
            //for (var i = magYArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.mag_y = magYArr[j]);
            //}

            //var magZArr = FindEmptiesDouble(csvValues.Select(csv => csv.mag_z).ToArray());
            //for (var i = magZArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.mag_z= magZArr[j]);
            //}

            //var gyroXArr = FindEmptiesDouble(csvValues.Select(csv => csv.gyro_xangle).ToArray());
            //for (var i = gyroXArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.gyro_xangle = gyroXArr[j]);
            //}

            //var gyroYArr = FindEmptiesDouble(csvValues.Select(csv => csv.gyro_yangle).ToArray());
            //for (var i = gyroYArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.gyro_yangle = gyroYArr[j]);
            //}

            //var gyroZArr = FindEmptiesDouble(csvValues.Select(csv => csv.gyro_zangle).ToArray());
            //for (var i = gyroZArr.Length - 1; i >= 0; i--)
            //{
            //    var j = i;
            //    csvValues.ForEach(c => c.gyro_zangle = gyroZArr[j]);
            //}

            var latitudeArr = csvValues.Select(csv => csv.latitude).ToArray();
            latitudeArr = FindEmptiesDouble(latitudeArr);
            for (var i = latitudeArr.Length - 1; i >= 0; i--)
            {
                var j = i;
                csvValues.ForEach(c => c.latitude = latitudeArr[j]);
            }

            var longtitudeArr = csvValues.Select(csv => csv.longitude).ToArray();
            longtitudeArr = FindEmptiesDouble(longtitudeArr);
            for (var i = longtitudeArr.Length - 1; i >= 0; i--)
            {
                var j = i;
                csvValues.ForEach(c => c.longitude = longtitudeArr[j]);
            }

            var pidValueArr = csvValues.Select(csv => csv.pidValue).ToArray();
            pidValueArr = FindEmptiesDouble(pidValueArr);
            for (var i = pidValueArr.Length - 1; i >= 0; i--)
            {
                var j = i;
                csvValues.ForEach(c => c.pidValue = pidValueArr[j]);
            }
            
            var trackArr = csvValues.Select(csv => csv.track).ToArray();
            trackArr = FindEmptiesLong(trackArr);
            for (var i = trackArr.Length - 1; i >= 0; i--)
            {
                var j = i;
                csvValues.ForEach(c => c.track = trackArr[j]);
            }

            return csvValues;
        }

        public double? [] FindEmptiesDouble(double?[] array)
        {
            var counter = 0;

            for (var i = 0; i < array.Length; i++)
            {
                if (array[i] == null)
                {
                    if (array[i - 1] != null)
                    {
                        _lastValue = array[i - 1];
                    }

                    counter++;
                }

                do
                {
                    if (array[i] != null)
                    {
                        _currValue = array[i];

                        if (_lastValue != null)
                        {
                            if (_lastValue > _currValue)
                            {
                                _ascOrDesc = false;
                                _iterationValueStep = (_lastValue - _currValue) / counter;
                            }
                            else if (_lastValue < _currValue || _lastValue == null)
                            {
                                _ascOrDesc = true;
                                _iterationValueStep = (_currValue - _lastValue) / counter;
                            }
                        }

                        for (var j = i-counter; j < array[i]; j++)
                        {
                            if (!_ascOrDesc)
                            {
                                array[j]= _lastValue - _iterationValueStep;
                            }
                            else
                            {
                                array[j] = _lastValue + _iterationValueStep;
                            }
                        }
                        counter = 0;
                    }

                } while (array[i] != null);
            }

            return array;
        }

        public long?[] FindEmptiesLong(long?[] array)
        {
            var counter = 0;

            for (var i = 0; i < array.Length; i++)
            {
                if (array[i] == null)
                {
                    if (array[i - 1] != null)
                    {
                        _lastValueForLongType = array[i - 1];
                    }

                    counter++;
                }

                do
                {
                    if (array[i] != null)
                    {
                        _currValueForLongType = array[i];

                        if (_lastValueForLongType != null)
                        {
                            if (_lastValueForLongType > _currValue)
                            {
                                _ascOrDesc = false;
                                _iterationValueStepForLongType = (_lastValueForLongType - _currValueForLongType) / counter;
                            }
                            else if (_lastValueForLongType < _currValueForLongType || _lastValueForLongType == null)
                            {
                                _ascOrDesc = true;
                                _iterationValueStepForLongType = (_currValueForLongType - _lastValueForLongType) / counter;
                            }
                        }

                        for (var j = i - counter; j < array[i]; j++)
                        {
                            if (!_ascOrDesc)
                            {
                                array[j] = _lastValueForLongType - _iterationValueStepForLongType;
                            }
                            else
                            {
                                array[j] = _lastValueForLongType + _iterationValueStepForLongType;
                            }
                        }
                        counter = 0;
                    }

                } while (array[i] != null);
            }

            return array;
        }

        public void WriteToCsvFile(List<CsvValues> csvData)
        {
            var pathDesktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
            var filePath = pathDesktop + "\\mycsvfile.csv";

            if (!File.Exists(filePath))
            {
                File.Create(filePath).Close();
            }

            var delimter = ",";
            var output = new List<string[]> {new string[] {"TEST1", "TEST2"}, new string[] {"TEST3", "TEST4"}};

            //flexible part ... add as many object as you want based on your app logic

            var length = output.Count;

            using (TextWriter writer = File.CreateText(filePath))
            {
                for (var index = 0; index < length; index++)
                {
                    writer.WriteLine(string.Join(delimter, output[index]));
                }
            }
        }
    }
}
