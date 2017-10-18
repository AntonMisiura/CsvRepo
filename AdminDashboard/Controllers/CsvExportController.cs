using System;
using System.Collections.Generic;
using System.Linq;
using AdminDashboard.CsvExport.Contracts;
using AdminDashboard.CsvExport.Entities;
using Microsoft.AspNetCore.Mvc;

namespace AdminDashboard.Controllers
{
    [Route("api/[controller]/[action]")]
    public class CsvExportController : Controller
    {
        private ICsvExportService _csvExportService;

        public CsvExportController(ICsvExportService csvExportService)
        {
            _csvExportService = csvExportService;
        }

        [HttpPost("{id}")]
        public IEnumerable<CsvValues> GetAllCoords(long id, DateTime startDate, DateTime endDate)
        {
            return _csvExportService.GetData(id, startDate, endDate).ToList();
        }
    }
}