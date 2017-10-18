using Microsoft.AspNetCore.Mvc;
using System;
using user.office.api.Contracts;

namespace user.office.api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ChartController : Controller
    {
        private IChartService _chartService;

        public ChartController(IChartService chartService)
        {
            _chartService = chartService;
        }

        [HttpGet("{id}")]
       
        public IActionResult GetOBDChartData(long id, DateTime startDate,DateTime endDate)
        {
            if (id!=0 && startDate!=null && endDate!=null)
            {
                return new OkObjectResult(_chartService.GetOBDChartData(id, startDate, endDate));
            }
            return new BadRequestResult();
        }

        [HttpGet("{id}")]

        public IActionResult GetIMUChartData(long id, DateTime startDate, DateTime endDate)
        {
            if (id!=0 && startDate != null && endDate != null)
            {
                return new OkObjectResult(_chartService.GetIMUChartData(id, startDate, endDate));
            }
            return new BadRequestResult();
        }

        [HttpGet("{id}")]
        public IActionResult GetUserDevices(long id)
        {
            if (id != 0)
            {
                return new OkObjectResult(_chartService.GetUserDevices(id));
            }
            return new BadRequestResult();
        }
        [HttpGet("{id}")]
        public IActionResult GetUserCars(long id)
        {
            if (id != 0)
            {
                return new OkObjectResult(_chartService.GetUserCars(id));
            }
            return new BadRequestResult();
        }
        [HttpGet("{id}")]

        public IActionResult GetTracks(long id, DateTime startDate, DateTime endDate)
        {
            if (id!=0 && startDate != null && endDate != null)
            {
                return new OkObjectResult(_chartService.GetTracks(id, startDate, endDate));
            }
            return new BadRequestResult();
        }
    }
}