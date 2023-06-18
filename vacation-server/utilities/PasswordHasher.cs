using System;
using System.Security.Cryptography;

public static class PasswordHasher
{
    private const int SaltSize = 16; // 16 bytes = 128 bits
    private const int HashSize = 32; // 32 bytes = 256 bits
    private const int Iterations = 10000;

    public static string HashPassword(string password)
    {
        // Generate a random salt
        byte[] salt = new byte[SaltSize];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        // Hash the password with the salt and iteration count
        byte[] hash = HashPassword(password, salt, Iterations);

        // Combine the salt, hash, and iteration count into a single string
        byte[] hashBytes = new byte[SaltSize + HashSize + sizeof(int)];
        Buffer.BlockCopy(salt, 0, hashBytes, 0, SaltSize);
        Buffer.BlockCopy(hash, 0, hashBytes, SaltSize, HashSize);
        Buffer.BlockCopy(BitConverter.GetBytes(Iterations), 0, hashBytes, SaltSize + HashSize, sizeof(int));

        // Convert the combined bytes to a Base64 string for storage
        return Convert.ToBase64String(hashBytes);
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        // Convert the Base64 string back to bytes
        byte[] hashBytes = Convert.FromBase64String(hashedPassword);

        // Extract the salt, hash, and iteration count from the byte array
        byte[] salt = new byte[SaltSize];
        byte[] hash = new byte[HashSize];
        int iterations = 10000;
        Buffer.BlockCopy(hashBytes, 0, salt, 0, SaltSize);
        Buffer.BlockCopy(hashBytes, SaltSize, hash, 0, HashSize);
        Buffer.BlockCopy(hashBytes, SaltSize + HashSize, BitConverter.GetBytes(iterations), 0, sizeof(int));

        // Compute the hash of the provided password using the extracted salt and iteration count
        byte[] computedHash = HashPassword(password, salt, iterations);

        // Compare the computed hash with the stored hash
        return CompareByteArrays(hash, computedHash);
    }

    private static byte[] HashPassword(string password, byte[] salt, int iterations)
    {
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations))
        {
            return pbkdf2.GetBytes(HashSize);
        }
    }

    private static bool CompareByteArrays(byte[] array1, byte[] array2)
    {
        if (array1.Length != array2.Length)
            return false;

        for (int i = 0; i < array1.Length; i++)
        {
            if (array1[i] != array2[i])
                return false;
        }

        return true;
    }
}
