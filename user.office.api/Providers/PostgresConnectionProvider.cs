using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace user.office.api.Providers
{
    public class PostgresConnectionProvider:IDisposable
    {
        private string _connectionString;
        public IDbConnection Connection { get; private set; }


        public PostgresConnectionProvider(string connectionString)
        {
         
            _connectionString = connectionString;
            Connection = new NpgsqlConnection(_connectionString);
        }


        public void Dispose()
        {
            Connection.Close();
        }
    }
}
