using System;
using System.Collections.Generic;
using user.office.api.Entities;

namespace user.office.api.Contracts
{
    public interface IMapRepository
    {

        /// <summary>
        /// get all data
        /// </summary>
        /// <returns></returns>
        IEnumerable<GpsData> GetAll();


        /// <summary>
        /// get data by car id
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        IEnumerable<GpsData> GetByCarId(long carId, DateTime startDate, DateTime endDate);

        /// <summary>
        /// get data by car id
        /// </summary>
        /// <param name="carId"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        IEnumerable<GpsData> GetByCarId(long carId, DateTime date);
    }
}
