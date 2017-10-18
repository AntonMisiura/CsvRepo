using System.Collections.Generic;
using AdminDashboard.Models;

namespace AdminDashboard.Services
{
    public interface ITileService
    {
        IEnumerable<string> GetCarIDList();
        RecordResponse GetRecordsByDeviceID(string deviceID, int limit);
    }
}