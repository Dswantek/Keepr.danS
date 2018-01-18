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
    public class VaultKeepsController : Controller
    {
        private readonly VaultKeepRepository db;
        public VaultKeepsController(VaultKeepRepository repo)
        {
            db = repo;
        }

        [HttpGet("{id}")]
        public IEnumerable<Keep> GetKeepsByVault(int id)
        {
            return db.GetAllKeepsByVault(id);
        }

        // GET api/values/5
        // [HttpGet("{id}")]
        // public Keepr Get(int id)
        // {
        //     return db.GetById(id);
        // }

        [Authorize]
        [HttpPost]
        public VaultKeep Post([FromBody]VaultKeep vaultkeep)
        {
            var user = HttpContext.User.Identity.Name;
            int Id;
            int.TryParse( user, out Id);
            vaultkeep.UserId = Id;
            return db.Add(vaultkeep);
        }

          // PUT api/values/5
        // [Authorize]
        // [HttpPut("vaults/{vaultId}/keeps/{id}")]
        // public VaultKeep Put(int id, [FromBody]VaultKeep keep)
        // {
        //     if (ModelState.IsValid)
        //     {
        //         return db.GetOneByIdAndUpdate(id, keep);
        //     }
        //     return null;
        // }

        // DELETE api/values/5
        [Authorize]
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return db.FindByIdAndRemove(id);
        }

        // [Authorize]
        // [HttpGet("{userId}")]
        // public IEnumerable<VaultKeep> GetByUser(int userId)
        // {
        //     return db.GetByUserId(userId);
        // }
    }
}