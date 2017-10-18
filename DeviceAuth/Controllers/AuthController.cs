using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DeviceAuth.Services;
using DeviceAuth.Services.Models;
using DeviceAuth.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using DeviceAuth.IServices;

namespace DeviceAuth.Controllers
{
    [Produces("application/json")]
    [Route("/auth")]
    public class AuthController : Controller
    {
        
        AuthProvider _authProvider;
        IDeviceService _deviceService;
        
        public AuthController(IConfigurationService configurationService, IDeviceService deviceService)
        {
            _authProvider = new AuthProvider(configurationService);
            _deviceService = deviceService;
        }
        [HttpGet]
        [Route("{Device_ID}")]
        public IActionResult Get(string Device_ID)
        {
            if (!string.IsNullOrEmpty(Device_ID))
            {
                var device = _deviceService.GetDevice(Device_ID);
                if (device == null) return new BadRequestResult();
                if (device.ID != 0)
                {
                
                    DevicePersistanceStorage.DeviceHolder.AddOrUpdate(Device_ID, device, (k, v) => device);
                    var randomPayload = _authProvider.GetRandomPayload();
                    var deviceSignature = _authProvider.GetDevicePayloadSignature(randomPayload, device);
                    return Ok(new RandomPayloadAndServerSignature(randomPayload, _authProvider.GetServerPayloadSignature(randomPayload)));
                   

                }
                else return NotFound();
            }
            return BadRequest();
        }
        [HttpPost]
        [Route("{Device_ID}")]
        public IActionResult Post(string Device_ID, [FromBody]PacketFromClient packet)
        {

            if (packet != null)
            {
                //var device = _deviceStorage.ObjectValue;
                Device device;
                DevicePersistanceStorage.DeviceHolder.TryRemove(Device_ID, out device);
                if (device == null) return BadRequest("Wrong device ID");

                if (Device_ID == device.OriginalID.ToString())
                {

                    PacketWithId pack = new PacketWithId(packet.randomPayload, packet.serverSignature, packet.deviceSignature, Device_ID);

                    if (_authProvider.CheckServerAndDevicePayload(pack, device))
                    {
                        var token = _authProvider.GetJWTToken(device);

                        if (token != null)
                        {
                            return new ContentResult() {Content = token};
                        }
                        return new BadRequestResult();
                    }
                }
                else return NotFound();


            }
            return BadRequest();
        }


    }
}