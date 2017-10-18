using System;
using System.Collections.Generic;
using AdminDashboard.CsvExport.Entities;

namespace AdminDashboard.CsvExport.Contracts
{
    public interface ICsvExportService
    {
        /// <summary>
        /// returns csv list without empty fields
        /// </summary>
        /// <param name="id"></param>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns></returns>
        IEnumerable<CsvValues> GetData(long id, DateTime start, DateTime end);

        /// <summary>
        /// push imu, gps and obd to csvValues list
        /// </summary>
        /// <param name="imuData"></param>
        /// <param name="gpsData"></param>
        /// <param name="obdData"></param>
        /// <returns></returns>
        List<CsvValues> PushToCsvList(List<ImuData> imuData, List<GpsData> gpsData, List<ObdData> obdData);
        
        /// <summary>
        /// fill empty spaces in csvValues list
        /// </summary>
        /// <param name="csvValues"></param>
        /// <returns></returns>
        List<CsvValues> FillEmptySpaces(List<CsvValues> csvValues);

        /// <summary>
        /// find empty spaces in double fields of csvValues list
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        double?[] FindEmptiesDouble(double?[] array);

        /// <summary>
        /// find empty spaces in long fields of csvValues list
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        long?[] FindEmptiesLong(long?[] array);

        /// <summary>
        /// write csvValues list to csv file
        /// </summary>
        /// <param name="csvData"></param>
        void WriteToCsvFile(List<CsvValues> csvData);
    }
}
