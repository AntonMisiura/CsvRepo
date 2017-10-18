using System;
using System.Collections.Generic;
using AdminDashboard.CsvExport.Entities;

namespace AdminDashboard.CsvExport.Contracts
{
    public interface ICsvExportRepository
    {
        /// <summary>
        /// get gps data by car id and start/end date
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        IEnumerable<GpsData> GetGpsData(long carId, DateTime startDate, DateTime endDate);

        /// <summary>
        /// get imu data by car id and start/end date
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        IEnumerable<ImuData> GetImuData(long carId, DateTime startDate, DateTime endDate);

        /// <summary>
        /// get obd data by car id and start/end date
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        IEnumerable<ObdData> GetObdData(long carId, DateTime startDate, DateTime endDate);
    }
}
