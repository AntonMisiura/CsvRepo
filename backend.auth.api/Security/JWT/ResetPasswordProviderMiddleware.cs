using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using backend.auth.api.Contracts;
using backend.auth.api.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace backend.auth.api.Security.JWT
{
    public class ResetPasswordProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly EmailService _emailService;
        private readonly ResetPasswordService _resetPasswordService;
        private readonly string _resetPasswordLink = "http://localhost:8080/dist/restorePassword.html";

        public ResetPasswordProviderMiddleware(RequestDelegate next,
            IAuthInternalRepository internalRepository,
            ResetPasswordService resetPasswordService)
        {
            _next = next;
            _resetPasswordService = resetPasswordService;

            _emailService = new EmailService();
            _resetPasswordService = new ResetPasswordService(internalRepository);
        }

        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals("/sendEmail", StringComparison.Ordinal)
                && !context.Request.Path.Equals("/resetPassword", StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (!context.Request.Method.Equals("POST")
                || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            if (context.Request.Path.Equals("/sendEmail", StringComparison.Ordinal))
            {
                return SendEmail(context);
            }

            if (context.Request.Path.Equals("/resetPassword", StringComparison.Ordinal))
            {
                return ResetPassword(context);
            }

            return null;
        }

        private async Task SendEmail(HttpContext context)
        {
            var resetPasswordEmailAdress = context.Request.Form["email"];

            if (resetPasswordEmailAdress == StringValues.Empty)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
                return;
            }

            try
            {
                var dbAccount = _resetPasswordService.CheckAccountEmail(resetPasswordEmailAdress);

                if (!dbAccount)
                {
                    context.Response.StatusCode = 400;
                    await context.Response.WriteAsync("Bad request.");
                    return;
                }

                _emailService.SendEmail(resetPasswordEmailAdress, "Password Reset",
                    "Try this link to reset your password : " + _resetPasswordLink);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message + ex.StackTrace);
            }
        }

        private async Task ResetPassword(HttpContext context)
        {
            var email = context.Request.Form["email"];
            var password = context.Request.Form["password"];

            if (email == StringValues.Empty || password == StringValues.Empty || password.Count < 20)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
            }

            var isValid = new EmailAddressAttribute().IsValid(email);

            if (!isValid)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("Bad request.");
            }

            try
            {
                _resetPasswordService.ChangePassword(email, password);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(ex.Message + ex.StackTrace);
            }
        }
    }
}
