using DeviceAuth.Models;
using System.Collections.Generic;

namespace DeviceAuth.Data.IRepositories
{
    public interface IDeviceRepository
    {
        Device GetById(string original_id);
        IEnumerable<string> GetDeviceOriginalIDList();
    }
}
