using DeviceJWTGenerator.Models;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DeviceJWTGenerator
{
    public static class JWTService
    {

        public static TokenKeys TokenKeysHolder = new TokenKeys();
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
