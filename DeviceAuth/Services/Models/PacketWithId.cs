using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceAuth.Services.Models
{
    public class PacketWithId : PacketFromClient
    {
        public string deviceID { get; set; }
        public PacketWithId(string randomPayload, string serverSignature, string deviceSignature, string deviceId) {
            this.randomPayload = randomPayload;
            this.serverSignature = serverSignature;
            this.deviceSignature = deviceSignature;
            deviceID = deviceId;
        }
    }
}
