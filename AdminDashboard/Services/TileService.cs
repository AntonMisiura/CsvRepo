using AdminDashboard.Contracts;
using AdminDashboard.Models;
using AdminDashboard.Repositories;
using DeviceAuth.Data.IRepositories;
using DeviceAuth.Data.Repositories;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Services
{
    public class TileService : ITileService
    {
        private IObdDataRecordRepository _obdDataRecordRepository;
        private IDeviceRepository _deviceRepository;

        public TileService(IConfiguration configuration, IObdDataRecordRepository obdDataRecordRepository, IDeviceRepository deviceRepository) {
            _obdDataRecordRepository = obdDataRecordRepository;
            _deviceRepository = deviceRepository;
        }

        public IEnumerable<string> GetCarIDList() {
            return _deviceRepository.GetDeviceOriginalIDList();
        }
        
        public RecordResponse GetRecordsByDeviceID(string deviceID, int limit) {
            var data = _obdDataRecordRepository.GetRecordByDeviceOriginalID(deviceID, limit);
            var pidCodes = data.Select(p => p.pid).Distinct().ToList();

            var buf = data.Select(p => {return new ObdDataRecordViewModel(p.original_id, p.unix_timestamp, p.value, p.pid, p.system_timestamp); });
            RecordResponse result = new RecordResponse();
            result.PidCodes = pidCodes;
            result.PidNames = data.Select(p => PidsDictionaryHolder.pids[p.pid]).Distinct().ToList();
            result.Pids = buf.ToList();
            return result;
        }
    }
}
