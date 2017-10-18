using DeviceAuth.Data.IRepositories;
using DeviceAuth.Models;
using Dapper;
using System.Linq;
using DeviceAuth.Data.Providers;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace DeviceAuth.Data.Repositories
{
    public class DeviceRepository : IDeviceRepository
    {
        PostgresConnectionProvider _provider;
        public DeviceRepository(IConfiguration configuration) {
            _provider = new PostgresConnectionProvider(configuration);
        }
        public Device GetById(string original_id)
        {
            var result = _provider.Connection.Query<DeviceViewModelParse>("select * from config.device inner join config.device_placement on config.device.id = config.device_placement.device_id where config.device.original_id = @orig_id",
                new { orig_id = original_id }).FirstOrDefault();
            Device key = new Device();
            if (result != null)
            {
                key.ID = result.ID;
                key.OriginalID = result.Original_ID;
                key.SecretKey = result.Secret_Key;
                key.CarID = result.Car_ID;
            }

            return key;
        }
        public IEnumerable<string> GetDeviceOriginalIDList()
        {
            return _provider.Connection.Query<string>("SELECT original_id FROM config.device");
        }
    }
}
