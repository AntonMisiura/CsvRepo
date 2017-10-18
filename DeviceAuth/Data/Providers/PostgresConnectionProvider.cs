using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DeviceAuth.Data.Providers
{
    public class PostgresConnectionProvider:IDisposable
    {
        private string connectionString;
        public IDbConnection Connection { get; private set; }


        public PostgresConnectionProvider(IConfiguration configuration)
        {
            connectionString = configuration.GetValue<string>("ConnectionString:DataAccessPostgreSqlProvider");
            Connection = new NpgsqlConnection(connectionString);
        }


        public void Dispose()
        {
            Connection.Close();
        }
    }
}
