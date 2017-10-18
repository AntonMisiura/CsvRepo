using System.Collections.Generic;

namespace user.office.api.Contracts
{
    public interface IDeviceRepository
    {
        long GetIdByOriginal(string id);

        IEnumerable<string> GetUserDevices(long userId);
    }
}
