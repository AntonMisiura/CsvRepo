using AdminDashboard.Services;
using DeviceJWTGenerator;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminDashboard.Services
{
    public class JWTGeneratorService : IJWTGeneratorService
    {
        IDeviceService _deviceService;
        JWTGenerator _jwt;
        public JWTGeneratorService(IDeviceService deviceService)
        {
            _deviceService = deviceService;
            _jwt = new JWTGenerator();
        }
        public string Token(string deviceID) {

            var device = _deviceService.GetDevice(deviceID);
            var token = _jwt.GetJWTToken(device);
            return token;

        }
        
    }
}
