using DeviceAuth.Models;
using DeviceAuth.Services.Models;

namespace DeviceAuth.Services
{
    public interface IAuthProvider
    {
        bool CheckServerAndDevicePayload(PacketWithId packet, Device device);
        string GetDevicePayloadSignature(string randomPayload, Device device);
        string GetJWTToken(Device device);
    }
}