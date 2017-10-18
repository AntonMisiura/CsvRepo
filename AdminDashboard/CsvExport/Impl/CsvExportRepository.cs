using System;
using System.Collections.Generic;
using System.Linq;
using AdminDashboard.CsvExport.Contracts;
using AdminDashboard.CsvExport.Data;
using AdminDashboard.CsvExport.Entities;
using Microsoft.EntityFrameworkCore;

namespace AdminDashboard.CsvExport.Impl
{
    public class CsvExportRepository : ICsvExportRepository
    {
        public ApplicationDbContextRaw ContextRaw { get; set; }

        public CsvExportRepository(ApplicationDbContextRaw contextRaw)
        {
            ContextRaw = contextRaw;
        }

        public IEnumerable<GpsData> GetGpsData(long carId, DateTime startDate, DateTime endDate)
        {
            return ContextRaw.gps_data
                .AsNoTracking()
                .Where(v => v.car_id == carId &&
                            v.device_timestamp > startDate
                            && v.device_timestamp < endDate)
                .OrderBy(d => d.device_timestamp)
                .ToList();
        }

        public IEnumerable<ImuData> GetImuData(long carId, DateTime startDate, DateTime endDate)
        {
            return ContextRaw.imu_data
                .AsNoTracking()
                .Where(v => v.car_id == carId &&
                            v.device_timestamp > startDate
                            && v.device_timestamp < endDate)
                .OrderBy(d => d.device_timestamp)
                .ToList();
        }

        public IEnumerable<ObdData> GetObdData(long carId, DateTime startDate, DateTime endDate)
        {
            return ContextRaw.obd_data
                .AsNoTracking()
                .Where(v => v.car_id == carId &&
                            v.device_timestamp > startDate
                            && v.device_timestamp < endDate)
                .OrderBy(d => d.device_timestamp)
                .ToList();
        }
    }
}
