using AdminDashboard.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Npgsql;
using Dapper;

using DeviceAuth.Data.Providers;
using AdminDashboard.Contracts;

namespace AdminDashboard.Repositories
{
    public class ObdDataRecordRepository : IObdDataRecordRepository
    {
        PostgresConnectionProvider _provider;
        public ObdDataRecordRepository(IConfiguration configuration)
        {
            _provider = new PostgresConnectionProvider(configuration);
        }
        public IEnumerable<ObdDataRecord> GetRecordByDeviceOriginalID(string deviceOriginalID, int limit)
        {
                return _provider.Connection.Query<ObdDataRecord>(
                    "select original_id, system_timestamp,unix_timestamp, pid, value from config.device inner join raw_data.obd_data on config.device.id = raw_data.obd_data.device_id where config.device.original_id = @OriginalID order by unix_timestamp desc limit @Limit"
                    , new { OriginalID = deviceOriginalID, Limit = limit });
        }
    }
}
