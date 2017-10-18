using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AdminDashboard.Services;

namespace AdminDashboard.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DeviceController : Controller
    {
        IDeviceService _deviceService;
        public DeviceController(IDeviceService deviceService)
        {
            _deviceService = deviceService;
        }
        [HttpGet("[action]")]
        public string GetDeviceSecretKey()
        {
            return _deviceService.GetDeviceSecretKey();
        }
        [HttpGet("[action]")]
        public string GetDeviceOriginalID()
        {
            return _deviceService.GetDeviceOriginalID();
        }
    }
}