using DeviceAuth.Data.Models;

namespace DeviceAuth.Data.IRepositories
{
    public interface IDeviceRepository
    {
        Device GetById(string original_id);
    }
}
