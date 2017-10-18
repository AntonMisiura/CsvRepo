namespace AdminDashboard.Services
{
    public interface IJWTGeneratorService
    {
        string Token(string deviceID);
    }
}