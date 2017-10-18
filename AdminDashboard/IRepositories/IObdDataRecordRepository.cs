using AdminDashboard.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Contracts
{
    public interface IObdDataRecordRepository
    {
        IEnumerable<ObdDataRecord> GetRecordByDeviceOriginalID(string deviceOriginalID, int limit);
    }
}
