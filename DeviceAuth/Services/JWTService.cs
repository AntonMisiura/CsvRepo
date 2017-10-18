using Newtonsoft.Json;
using DeviceAuth.Services.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Hosting;

namespace DeviceAuth.Services
{
    public static class JWTService
    {

        public static TokenKeys TokenKeysHolder;
        public static void GetTokensKeyFromFile(IHostingEnvironment hostingEnvironment)
        {
            string jwtFilePath = hostingEnvironment.ContentRootPath;
           
            FileStream fileStream = new FileStream(jwtFilePath + "/api_secret.jwk", FileMode.Open);

            using (StreamReader reader = new StreamReader(fileStream))
            {
                string json = reader.ReadToEnd();
                TokenKeysHolder = JsonConvert.DeserializeObject<TokenKeys>(json);
            }
          
        }
    }
}
