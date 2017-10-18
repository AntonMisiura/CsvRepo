using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceAuth.Services.Models
{
    public class RandomPayloadAndServerSignature
    {
        public string randomPayload { get; }
        public string serverSignature { get; }
        public RandomPayloadAndServerSignature(string rndPayload, string servSignature)
        {
            randomPayload = rndPayload;
            serverSignature = servSignature;
        }
    }
}
