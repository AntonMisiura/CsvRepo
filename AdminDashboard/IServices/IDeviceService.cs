using DeviceAuth.Models;

namespace AdminDashboard.Services
{
    public interface IDeviceService
    {
        Device GetDevice(string deviceID);

        string GetDeviceSecretKey();

        string GetDeviceOriginalID();
    }
}