using System;
using System.Collections.Generic;
using System.Linq;
using user.office.api.Contracts;
using user.office.api.Entities;
using user.office.api.Helpers;
using user.office.api.Model;

namespace user.office.api.Services
{
    public class ChartService : IChartService
    {
        private readonly IChartRepository _chartRepository;
        private readonly IDeviceRepository _deviceRepository;
        private readonly ICarRepository _carRepository;
        private readonly IGetDirectionService  _getDirectionService;


        public ChartService(IChartRepository chartRepository, IDeviceRepository deviceRepository, ICarRepository carRepository, IGetDirectionService getDirectionService)
        {
            _chartRepository = chartRepository;
            _deviceRepository = deviceRepository;
            _carRepository = carRepository;
            _getDirectionService = getDirectionService;
        }
        public List<ChartItem> GetOBDChartData(long ID, DateTime start, DateTime end)
        {
            var chartData = _chartRepository.GetOBDByID(ID, start, end).ToList();
            var GPSTimestamps = _getDirectionService.GetGpsDataTime(ID, start, end);
            chartData.Add(new ChartItem { Label = "GPS", Data = GPSTimestamps.Select(t => new DataItem { Date = t, Value = 1 }).ToList() });
            return chartData;
        }
        public List<ChartItem> GetIMUChartData(long ID, DateTime start, DateTime end)
        {
          var res = _chartRepository.GetIMUByID(ID, start, end);
            if (res.ToList().Count != 0)
            {
                var charts = new IMUChart();
                foreach (var line in res)
                {
                    charts.acc_x.Add(new DataItem { Date = line.Date, Value = line.acc_x });
                    charts.acc_y.Add(new DataItem { Date = line.Date, Value = line.acc_x });
                    charts.acc_z.Add(new DataItem { Date = line.Date, Value = line.acc_x });

                    charts.mag_x.Add(new DataItem { Date = line.Date, Value = line.mag_x });
                    charts.mag_y.Add(new DataItem { Date = line.Date, Value = line.mag_y });
                    charts.mag_z.Add(new DataItem { Date = line.Date, Value = line.mag_z });

                    charts.gyro_xangle.Add(new DataItem { Date = line.Date, Value = line.gyro_xangle });
                    charts.gyro_yangle.Add(new DataItem { Date = line.Date, Value = line.gyro_yangle });
                    charts.gyro_zangle.Add(new DataItem { Date = line.Date, Value = line.gyro_zangle });

                }
                List<ChartItem> chitem = new List<ChartItem>();
                chitem.Add(new ChartItem { Label = IMULabels.acc_x, Data = charts.acc_x });
                chitem.Add(new ChartItem { Label = IMULabels.acc_y, Data = charts.acc_y });
                chitem.Add(new ChartItem { Label = IMULabels.acc_z, Data = charts.acc_z });
                chitem.Add(new ChartItem { Label = IMULabels.mag_x, Data = charts.mag_x });
                chitem.Add(new ChartItem { Label = IMULabels.mag_y, Data = charts.mag_y });
                chitem.Add(new ChartItem { Label = IMULabels.mag_z, Data = charts.mag_z });
                chitem.Add(new ChartItem { Label = IMULabels.gyro_xangle, Data = charts.gyro_xangle });
                chitem.Add(new ChartItem { Label = IMULabels.gyro_yangle, Data = charts.gyro_yangle });
                chitem.Add(new ChartItem { Label = IMULabels.gyro_zangle, Data = charts.gyro_zangle });
                return chitem;
            }
            else {
                return null;
            }
        }
        public List<Track> GetTracks(long carID, DateTime start, DateTime end)
        {
           
            var res = _chartRepository.GetTracksList(carID, start, end).ToList();
            return res;
        }
        public List<string> GetUserDevices(long userId)
        {
            try
            {
                return _deviceRepository.GetUserDevices(userId).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
        public List<AccountCarViewModel> GetUserCars(long userId)
        {
            try
            {
                return _carRepository.GetUserCars(userId).ToList();
            }
            catch (Exception ex)
            {
                return null;
            }
           
        }
    }
}
