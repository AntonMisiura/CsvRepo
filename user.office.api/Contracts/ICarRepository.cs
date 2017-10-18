using System.Collections.Generic;
using user.office.api.Entities;

namespace user.office.api.Contracts
{
    public interface ICarRepository
    {
        /// <summary>
        /// Returns user's cars by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>IEnumerable<AccountCarViewModel></returns>
        IEnumerable<AccountCarViewModel> GetUserCars(long userId);
    }
}