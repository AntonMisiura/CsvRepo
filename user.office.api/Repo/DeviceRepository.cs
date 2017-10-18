using System;
using System.Collections.Generic;
using System.Linq;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Repo
{
    public class DeviceRepository : IDeviceRepository
    {
        public ApplicationDbContext Context { get; set; }

        public DeviceRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public long GetIdByOriginal(string id)
        {
            return Context.Set<Device>().FirstOrDefault(e => e.original_id == id).id;
        }
        public IEnumerable<string> GetUserDevices(long userId) {
            try
            {
                var res = (from accountCar in Context.account_car
                           join devicePlacement in Context.device_placement on accountCar.id equals devicePlacement.car_id
                           where accountCar.account_id == userId
                           join device in Context.device on devicePlacement.device_id equals device.id
                           select device.original_id);
                return res;
            }
            catch (Exception ex) {
                return null;
            }
           
        }
        
    }
}
