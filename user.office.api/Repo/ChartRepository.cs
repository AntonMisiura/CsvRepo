using System;
using System.Collections.Generic;
using System.Linq;
using user.office.api.Data;
using user.office.api.Model;
using user.office.api.Helpers;
using user.office.api.Contracts;
using Microsoft.EntityFrameworkCore;
using user.office.api.Providers;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Text;
using user.office.api.Entities;

namespace user.office.api.Repo
{

    public class ChartRepository : IChartRepository
    {
        private ApplicationDbContextRO Context { get; set; }
        IConfiguration _configuration;


        public ChartRepository(ApplicationDbContextRO context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }
        
        public IEnumerable<ChartItem> GetOBDByID(long ID, DateTime startDate, DateTime endDate) {
        
            var startDateTimestamp = TimeConverter.Convert(startDate)*1000000;
            var endDateTimestamp = TimeConverter.Convert(endDate)*1000000;
            
            try {
                var rawResult = Context.obd_data
                .Where(s => s.unix_timestamp > startDateTimestamp && s.unix_timestamp < endDateTimestamp && s.car_id==ID).Select(obd=> new OBDChart
                  {
                      Pid = obd.pid,
                      Value = obd.value,
                      Date = obd.unix_timestamp
                  })
                  .GroupBy(a => a.Pid)
                  .Select(e => new { Key = e.Key, Values = e.OrderBy(a => a.Date).ToList() })
                  .ToList();
                var chartData = rawResult.Select(e => new ChartItem { Label = PidsDictionaryHolder.pids[e.Key], Data = e.Values.Select(s => new DataItem { Date = s.Date, Value = s.Value }).ToList() });
                return chartData;
            }
            catch (Exception ex) {
                return null;
            }          
        }
        public IEnumerable<IMURecordViewModel> GetIMUByID(long ID, DateTime startDate, DateTime endDate)
        {

            var startDateTimestamp = TimeConverter.Convert(startDate) * 1000000;
            var endDateTimestamp = TimeConverter.Convert(endDate) * 1000000;
            try
            {
                var rawResult = Context.imu_data
                .Where(s => s.unix_timestamp > startDateTimestamp && s.unix_timestamp < endDateTimestamp && s.car_id==ID).Select(imu=> new IMURecordViewModel {
                       Date = imu.unix_timestamp,
                        acc_x  = imu.acc_x,
                        acc_y = imu.acc_y,
                        acc_z = imu.acc_z,
                        mag_x = imu.mag_x,
                        mag_y = imu.mag_y, 
                        mag_z = imu.mag_z,
                        gyro_xangle = imu.gyro_xangle,
                        gyro_yangle = imu.gyro_yangle,
                        gyro_zangle = imu.gyro_zangle
                  });
                var sombre= rawResult.ToList();
                return rawResult;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        
        public IEnumerable<Track> GetTracksList(long carID, DateTime start, DateTime end)
        {
            var startDateTimestamp = TimeConverter.Convert(start) * 1000000;
            var endDateTimestamp = TimeConverter.Convert(end) * 1000000;

            using (PostgresConnectionProvider _provider = new PostgresConnectionProvider(_configuration.GetConnectionString("DataAccessPostgreSqlProviderRO")))
            {
                var res =  _provider.Connection.Query<Track>(@"
                    with temp_gaps as (select (unix_timestamp/1000000) as start,
                   (lead(unix_timestamp) over(order by unix_timestamp))/1000000 as stop,
                   (lead(unix_timestamp) over(order by unix_timestamp)/1000000) - (unix_timestamp/1000000) as diff,
                   (min(obd.unix_timestamp) over())/1000000 as interval_start
                   from raw_data.obd_data obd 
                   where obd.car_id = @CarID
                     and obd.unix_timestamp >= @start_period
                     and obd.unix_timestamp < @end_period
                   order by obd.unix_timestamp
), track as (select coalesce(lag(stop) over (order by stop), temp_gaps.interval_start) as start,
                    temp_gaps.start as end
                    from temp_gaps
             where diff >= @StopLength
             order by 1)
select 
       track.start,
       track.end
from track
",
        new { start_period = startDateTimestamp, end_period = endDateTimestamp, CarID = carID, StopLength = _configuration.GetValue<int>("StopLength") });
                return res;
            }


        }

    }
}
