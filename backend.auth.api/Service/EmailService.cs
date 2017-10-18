using System;
using MailKit.Net.Smtp;
using MimeKit;

namespace backend.auth.api.Service
{
    public class EmailService
    {
        private const int SmtpPort = 587;
        private const string Recourse = "Dear user";
        private const string Smtp = "smtp.gmail.com";
        private const string AllegroTeam = "Allegro team";
        private const string PasswordCredentials = "alwayswannafly123";
        private const string LoginCredentials = "misiura.anton@gmail.com";

        public void SendEmail(string email, string subject, string message)
        {
            try
            {
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress(AllegroTeam, LoginCredentials));
                emailMessage.To.Add(new MailboxAddress(Recourse, email));
                emailMessage.Subject = subject;
                emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = message
                };

                using (var client = new SmtpClient())
                {
                    client.Connect(Smtp, SmtpPort, false);
                    client.Authenticate(LoginCredentials, PasswordCredentials);
                    client.Send(emailMessage);
                    client.Disconnect(true);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
