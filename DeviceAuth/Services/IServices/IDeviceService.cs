using DeviceAuth.Models;

namespace DeviceAuth.Services
{
    public interface IDeviceService
    {
        Device GetDevice(string deviceID);
    }
}