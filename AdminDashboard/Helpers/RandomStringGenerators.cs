using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AdminDashboard.Helpers
{
    public class RandomStringGenerators
    {
        public const string hexTemplate = "abcdef1234567890";
        public const string fullTemplate = "abcdefghijklmnopqrstuvwxyz1234567890";
        public static string GetRandomString(int length, string template)
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider(); ;
            
            StringBuilder res = new StringBuilder();

            byte[] uintBuffer = new byte[4];
            while (length-- > 0)
            {
                rng.GetBytes(uintBuffer);
                uint num = BitConverter.ToUInt32(uintBuffer, 0);
                res.Append(template[(int)(num % (uint)template.Length)]);
            }
            return res.ToString();
        }
       
    }
}
