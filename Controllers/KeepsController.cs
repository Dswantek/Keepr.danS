using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using keepr_c.Models;
using keepr_c.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr_c.Controllers
{
    [Route("api/[controller]")]
    public class KeepsController : Controller
    {
        private readonly KeepRepository db;
        public KeepsController(KeepRepository repo)
        {
            db = repo;
        }

        [HttpGet]
        public IEnumerable<Keep> Get()
        {
            return db.GetAll();
        }

        // GET api/values/5
        // [HttpGet("{id}")]
        // public Keep Get(int id)
        // {
        //     return db.GetById(id);
        // }

        [Authorize]
        [HttpPost]
        public Keep Post([FromBody]Keep keep)
        {
            var user = HttpContext.User.Identity.Name;
            int Id;
            int.TryParse( user, out Id);
            keep.UserId = Id;
            return db.Add(keep);
        }

          // PUT api/values/5
        [Authorize]
        [HttpPut("{id}")]
        public Keep Put(int id, [FromBody]Keep keep)
        {
            if (ModelState.IsValid)
            {
                return db.GetOneByIdAndUpdate(id, keep);
            }
            return null;
        }

        // DELETE api/values/5
        [Authorize]
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return db.FindByIdAndRemove(id);
        }

        [Authorize]
        [HttpGet("{userId}")]
        public IEnumerable<Keep> GetByUser(int userId)
        {
            return db.GetByUserId(userId);
        }
    }
}