using System;
using System.Linq;
using System.Security.Cryptography;

namespace user.office.api.Security
{
    public class PasswordHashProvider
    {
        private const int SaltByteSize = 128;
        private const int SaltBase64Size = 172;

        private static byte[] GetBytes(string str)
        {
            var bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        private static string CreateSalt(int size)
        {
            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                var buf = new byte[size];
                randomNumberGenerator.GetBytes(buf);
                return Convert.ToBase64String(buf);
            }
        }

        public static string CreateHash(string password)
        {
            var salt = CreateSalt(SaltByteSize);
            using (var algorithm = SHA256.Create())
            {
                var hash = algorithm.ComputeHash(GetBytes(password + salt));
                return salt + Convert.ToBase64String(hash);
            }
        }

        public static bool ValidatePassword(string password, string hash)
        {
            var salt = hash.Substring(0, SaltBase64Size);
            using (var algorithm = SHA256.Create())
            {
                var newHash = algorithm.ComputeHash(GetBytes(password + salt));
                var oldHash = Convert.FromBase64String(hash.Substring(SaltBase64Size));
                return oldHash.SequenceEqual(newHash);
            }
        }
    }
}
