using DeviceAuth.Models;
using DeviceAuth.Data.Repositories;
using DeviceAuth.Data.IRepositories;
using System;
using Microsoft.Extensions.Configuration;


namespace DeviceAuth.Services
{
    public class DeviceService : IDeviceService
    {
        private IDeviceRepository _deviceRepo;
        
        public DeviceService(IDeviceRepository deviceRepo)
        {
            _deviceRepo = deviceRepo;
        }
        
        public Device GetDevice(string deviceID)
        {
            try
            {
                return _deviceRepo.GetById(deviceID);
            }
            catch (Exception ex) { return null; }
        }
    }
}
