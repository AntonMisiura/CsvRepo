using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using user.office.api.Entities;
using user.office.api.Model;

namespace user.office.api.Contracts
{
    public interface IChartService
    {
        /// <summary>
        /// Returns list of obd chart data
        /// </summary>
        /// <param name="ID">car id</param>
        /// <param name="start"> start of period</param>
        /// <param name="end">end of period</param>
        /// <returns>List<ChartItem></returns>
        List<ChartItem> GetOBDChartData(long ID, DateTime start, DateTime end);

        /// <summary>
        /// Returns list of imu chart data
        /// </summary>
        /// <param name="ID">car id</param>
        /// <param name="start"> start of period</param>
        /// <param name="end">end of period</param>
        /// <returns>List<ChartItem></returns>
        List<ChartItem> GetIMUChartData(long ID, DateTime start, DateTime end);

        /// <summary>
        /// Returns list of user devices ids
        /// </summary>
        /// <param name="userID">user id</param>
        /// <returns>List<ChartItem></returns>
        List<string> GetUserDevices(long userID);

        /// <summary>
        /// Returns list of tracks for selected period
        /// </summary>
        /// <param name="start">start of period</param>
        /// <param name="end">end of period</param>
        /// <param name="carID">car id</param>
        /// <returns>List<Track></returns>
        List<Track> GetTracks(long carID, DateTime start, DateTime end);

        /// <summary>
        /// Returns list of user cars
        /// </summary>
        /// <param name="userID">user ID</param>
        /// <returns>List<AccountCarViewModel></returns>
        List<AccountCarViewModel> GetUserCars(long userID);
    }
}
