using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using user.office.api.Contracts;
using user.office.api.Data;
using user.office.api.Entities;

namespace user.office.api.Repo
{
    public class CarRepository : ICarRepository
    {
        private ApplicationDbContext Context { get; set; }
        IConfiguration _configuration;
        public CarRepository(ApplicationDbContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }
        public IEnumerable<AccountCarViewModel> GetUserCars(long userId)
        {
            try
            {
                var res = Context.account_car.Where(car=>car.account_id == userId).Select(car=>new AccountCarViewModel{ id = car.id, name = car.name } ).ToList();
                return res;
               
            }
            catch (Exception ex)
            {
                return null;
            }

        }
        
    }
    
}
