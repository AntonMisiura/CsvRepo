using DeviceAuth.IServices;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeviceAuth.Services
{
    public class ConfigurationService: IConfigurationService
    {
        private IConfiguration _configuration;
        public ConfigurationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GetValue(string key) {
            if (!String.IsNullOrEmpty(key)) return _configuration.GetValue<string>(key);
            else return null;
        }
    }
}
