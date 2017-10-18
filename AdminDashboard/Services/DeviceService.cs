using AdminDashboard.Helpers;
using DeviceAuth.Data.IRepositories;
using DeviceAuth.Data.Repositories;
using DeviceAuth.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using System.Text;

namespace AdminDashboard.Services
{
    public class DeviceService : IDeviceService
    {
        private IDeviceRepository _deviceRepo;

        public DeviceService(IDeviceRepository deviceRepository)
        {
            _deviceRepo = deviceRepository;
        }

        public Device GetDevice(string deviceID)
        {
            try
            {
                return _deviceRepo.GetById(deviceID);
            }
            catch (Exception ex) { return null; }
        }
        public string GetDeviceSecretKey()
        {
            return RandomStringGenerators.GetRandomString(64, RandomStringGenerators.hexTemplate);
        }
        public string GetDeviceOriginalID()
        {
            return RandomStringGenerators.GetRandomString(14, RandomStringGenerators.fullTemplate).ToUpper();
        }
        
    }
}
