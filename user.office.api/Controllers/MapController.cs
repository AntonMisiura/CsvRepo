using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using user.office.api.Contracts;
using user.office.api.Entities;

namespace user.office.api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class MapController : Controller
    {
        private IGetDirectionService _mapService;

        public MapController(IGetDirectionService mapService)
        {
            _mapService = mapService;
        }

        [HttpGet("{id}")]
        public List<Coords> GetAllCoords(long id, DateTime startDate, DateTime endDate)
        {
            return _mapService.GetAllCoords(id, startDate, endDate).ToList();
        }

        [HttpGet("{id}")]
        public List<Coords> GetDirectionCoords(long id, DateTime startDate, DateTime endDate)
        {
            return _mapService.GetDirectionData(id, startDate, endDate).ToList();
        }

        [HttpGet("{id}")]
        public List<Coords> GetSectionCoords(long id, DateTime date)
        {
            return _mapService.GetSectionData(id, date).ToList();
        }
    }
}
