using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using AdminDashboard.Services;
using AdminDashboard.Models;

namespace AdminDashboard.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TailController : Controller

    {
        private ITileService _tileService;
        public TailController(ITileService tileService)
        {
            _tileService = tileService;
        }
        [HttpGet("[action]")]
        public IEnumerable<string> GetDeviceIDList()
        {
            return _tileService.GetCarIDList();
        }
        [HttpGet("[action]")]
        public RecordResponse GetRecords(string deviceID, int limit)
        {
            return _tileService.GetRecordsByDeviceID(deviceID, limit);
        }
    }
}