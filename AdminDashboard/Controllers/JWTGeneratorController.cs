using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using AdminDashboard.Services;

namespace AdminDashboard.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class JWTGeneratorController : Controller
    {
        IJWTGeneratorService _jwtGenerator;
        public JWTGeneratorController(IJWTGeneratorService jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
        }
        [HttpGet("[action]")]
        public string GetToken(string deviceID)
        {
            if (!String.IsNullOrEmpty(deviceID)) {
                return _jwtGenerator.Token(deviceID);
            }
            return "";
            
        }

    }
}