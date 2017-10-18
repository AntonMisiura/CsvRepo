using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceAuth.Services.Models
{
    public class PacketFromClient
    {
        public string randomPayload { get; set; }
        public string serverSignature { get; set; }
        public string deviceSignature { get; set; }

        public override string ToString()
        {
            return "Random payload: "+randomPayload+" Server signature: "+ serverSignature + " Device sinature: "+ deviceSignature;
        }

    }
}
