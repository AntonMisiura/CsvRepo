using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using user.auth.api.Entities;

namespace user.auth.api.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Account account)
        {
        }

        //public async Task<IActionResult> SendMessage()
        //{
        //    var emailService = new EmailService();
        //    await emailService.SendEmail("currUser.email", "Password reset mode", "Hello username, this link is for your password recovery");
        //    return RedirectToAction("");
        //}
    }
}
