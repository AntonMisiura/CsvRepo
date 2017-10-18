using System;
using System.Text;
using System.Security.Cryptography;
namespace DeviceAuth.Helpers
{
    public static class CryptoHelpers
    {
        public static string GetSHA(string rnd)
        {
            byte[] data = Encoding.Default.GetBytes(rnd);
            return GetSHA(data);
        }
        public static string GetSHA(byte[] data)
        {
            if (data == null) return null;
            var result = new SHA256Managed().ComputeHash(data);
            return BitConverter.ToString(result).Replace("-", "").ToLower();
        }
        static int ParseNybble(char c)
        {
            switch (c)
            {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    return c - '0';
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                    return c - 'A' + 10;
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                    return c - 'a' + 10;
            }
            throw new ArgumentException("Invalid hex digit: " + c);
        }
        public static byte[] ParseHex(string hex)
        {
            int offset = hex.StartsWith("0x") ? 2 : 0;
            if ((hex.Length % 2) != 0)
            {
                throw new ArgumentException("Invalid length: " + hex.Length);
            }
            byte[] ret = new byte[(hex.Length - offset) / 2];

            for (int i = 0; i < ret.Length; i++)
            {
                ret[i] = (byte)((ParseNybble(hex[offset]) << 4)
                                 | ParseNybble(hex[offset + 1]));
                offset += 2;
            }
            return ret;
        }

        public static byte[] GetXOR(string a, string b)
        {
            if (a.Length != b.Length) return null;
            byte[] toBytes1 = ParseHex(a);
            byte[] toBytes2 = ParseHex(b);
            byte[] result = new byte[toBytes1.Length];
            for (int i = 0; i < toBytes1.Length; i++)
            {
                result[i] = Convert.ToByte(toBytes1[i] ^ toBytes2[i]);
            }
            return result;
        }
        public static string GetRandomSalt(int length)
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider(); ;
            const string valid = "abcdefghijklmnopqrstuvwxyz1234567890";
            StringBuilder res = new StringBuilder();

            byte[] uintBuffer = new byte[4];
            while (length-- > 0)
            {
                rng.GetBytes(uintBuffer);
                uint num = BitConverter.ToUInt32(uintBuffer, 0);
                res.Append(valid[(int)(num % (uint)valid.Length)]);
            }
            return res.ToString();
        }
    }
}
