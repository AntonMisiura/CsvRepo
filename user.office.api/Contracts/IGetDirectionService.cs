using System;
using System.Collections.Generic;
using user.office.api.Entities;

namespace user.office.api.Contracts
{
    public interface IGetDirectionService
    {
        /// <summary>
        /// get data by one click, section of route of current vehicle
        /// </summary>
        /// <param name="id"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        List<Coords> GetSectionData(long id, DateTime date);

        /// <summary>
        /// execute from all list of coords, and deal them to 23 points
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        IEnumerable<Coords> ExecuteCoords(IEnumerable<GpsData> data);
        
        /// <summary>
        /// get data by device id and a section of time
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        List<Coords> GetDirectionData(long id, DateTime start, DateTime end);

        /// <summary>
        /// convert coordinates from all list of gps data to coords list
        /// </summary>
        /// <param name="source"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        IEnumerable<IEnumerable<Coords>> ConvertCoords(List<Coords> source, int size);

        /// <summary>
        /// get all coordinates
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        List<Coords> GetAllCoords(long id, DateTime start, DateTime end);

        /// <summary>
        /// Get array of unix_timestamp from gps_data
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        IEnumerable<long> GetGpsDataTime(long id, DateTime start, DateTime end);
    }
}
