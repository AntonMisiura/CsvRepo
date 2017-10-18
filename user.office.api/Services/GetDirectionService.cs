using System;
using System.Collections.Generic;
using System.Linq;
using user.office.api.Contracts;
using user.office.api.Entities;

namespace user.office.api.Services
{
    public class GetDirectionService : IGetDirectionService
    {
        private readonly IMapRepository _mapRepository;
        
        public GetDirectionService(IMapRepository mapRepository)
        {
            _mapRepository = mapRepository;
        }

        public List<Coords> GetDirectionData(long id, DateTime start, DateTime end)
        {
            var gpsData = _mapRepository.GetByCarId(id, start, end);

            var coords = ExecuteCoords(gpsData).ToList();

            return coords;
        }

        public List<Coords> GetSectionData(long id, DateTime date)
        {
            var gpsData = _mapRepository.GetByCarId(id, date);

            return gpsData?.Select(v => new Coords()
                {
                    Lat = v.latitude,
                    Lng = v.longitude
                })
                .ToList();
        }

        
        public List<Coords> GetAllCoords(long id, DateTime start, DateTime end)
        {
            var gpsData = _mapRepository.GetByCarId(id, start, end);

            return gpsData?.Select(v => new Coords()
                {
                    Lat = v.latitude,
                    Lng = v.longitude
                })
                .ToList();
        }

        public IEnumerable<long> GetGpsDataTime(long id, DateTime start, DateTime end)
        {
            var gpsData = _mapRepository.GetByCarId(id, start, end).Select(t=>t.unix_timestamp);

            //var i = 0;
            //var unixTimestamp = new long [i];

            //foreach (var gps in gpsData)
            //{
            //    unixTimestamp[i] = gps.unix_timestamp;
            //    i++;
            //}

            return gpsData;
        }

        public IEnumerable<IEnumerable<Coords>> ConvertCoords(List<Coords> source, int size)
        {
            var partition = new List<Coords>(size);
            var counter = 0;

            using (var enumerator = source.GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    partition.Add(enumerator.Current);
                    counter++;

                    if (size != 0)
                    {
                        if (counter % size == 0)
                        {
                            yield return partition.ToList();
                            partition.Clear();
                            counter = 0;
                        }
                    }
                }
                
                if (counter != 0)
                    yield return partition;
            }
        }

        public IEnumerable<Coords> ExecuteCoords(IEnumerable<GpsData> data)
        {
            var coords = data.Select(v => new Coords()
                {
                    Lat = v.latitude,
                    Lng = v.longitude
                })
                .ToList();

            double size = coords.Count / 21.0;
            size = Math.Round(size, 0, MidpointRounding.ToEven);
            var sizeToInt = Convert.ToInt32(size);

            var convertedCoords = ConvertCoords(coords, sizeToInt)
                .Select(x => x.ToList())
                .ToList();

            //selecting the middle value of list c, which is iterated throught convertedCoords list
            return (from c in convertedCoords let count = c.Count() let middle = count / 2 select c[middle]);
        }
    }
}
