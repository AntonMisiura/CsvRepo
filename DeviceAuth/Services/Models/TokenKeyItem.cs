using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DeviceAuth.Services.Models
{
    public class TokenKeyItem
    {
        public string k;
        public string kty;
        public string kid;
    }
    public class TokenKeys
    {
        public List<TokenKeyItem> keys;
    } 
   
}
