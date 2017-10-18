using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Repo
{
    public class MapRepository : IMapRepository
    {
        public ApplicationDbContextRaw ContextRaw { get; set; }

        public MapRepository(ApplicationDbContextRaw contextRaw)
        {
            ContextRaw = contextRaw;
        }

        public IEnumerable<GpsData> GetAll()
        {
            return ContextRaw.gps_data.ToList();
        }

        public IEnumerable<GpsData> GetByCarId(long carId, DateTime startDate, DateTime endDate)
        {
            var startTimestamp = DateTimeToUnixTimestamp(startDate) * 1000000;
            var endTimestamp = DateTimeToUnixTimestamp(endDate) * 1000000;

            return ContextRaw.gps_data
                .AsNoTracking()
                .Where(v => v.car_id == carId &&
                    v.unix_timestamp > startTimestamp
                    && v.unix_timestamp < endTimestamp)
                .OrderBy(d => d.unix_timestamp)
                .Take(1000)
                .ToList();
        }

        public IEnumerable<GpsData> GetByCarId(long carId, DateTime date)
        {
            var startDate = date.AddSeconds(-10);
            var endDate = date.AddSeconds(10);

            var startTimestamp = DateTimeToUnixTimestamp(startDate) * 1000000;
            var endTimestamp = DateTimeToUnixTimestamp(endDate) * 1000000;

            return ContextRaw.gps_data
                .AsNoTracking()
                .Where(v => v.car_id == carId &&
                            v.unix_timestamp > startTimestamp
                            && v.unix_timestamp < endTimestamp)
                .OrderBy(d => d.unix_timestamp)
                .Take(1000)
                .ToList();
        }

        public static long DateTimeToUnixTimestamp(DateTime dateTime)
        {
            return (long)(dateTime - new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)).TotalSeconds;
        }
    }
}
