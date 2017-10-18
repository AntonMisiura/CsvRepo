using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using user.office.api.Entities;
using user.office.api.Model;

namespace user.office.api.Contracts
{
    public interface IChartRepository
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        IEnumerable<ChartItem> GetOBDByID(long carID, DateTime startDate, DateTime endDate);

        /// <summary>
        /// Returns IMU data
        /// </summary>
        /// <param name="ID">car id</param>
        /// <param name="startDate">start of period</param>
        /// <param name="endDate">end of period</param>
        /// <returns>IEnumerable<IMURecordViewModel> </returns>
        IEnumerable<IMURecordViewModel> GetIMUByID(long ID, DateTime startDate, DateTime endDate);

        /// <summary>
        /// Returns list of tracks for selected period
        /// </summary>
        /// <param name="start">start of period</param>
        /// <param name="end">end of period</param>
        /// <param name="carID">car id</param>
        /// <returns></returns>
        IEnumerable<Track> GetTracksList(long carID, DateTime start, DateTime end);
    }
}

