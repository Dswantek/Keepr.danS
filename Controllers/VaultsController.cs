using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using keepr_c.Models;
using keepr_c.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr_c.Controllers
{
    [Route("api/[controller]")]
    public class VaultsController : Controller
    {
        private readonly VaultRepository db;
        public VaultsController(VaultRepository repo)
        {
            db = repo;
        }

        // GET api/vaults
        [Authorize]
        [HttpGet("{userId}")]
        public IEnumerable<Vault> GetByUser(int userId)
        {
            return db.GetAllByUser(userId);
        }

        // GET api/vaults/5
        // [HttpGet("{id}")]
        // public Vault Get(int id)
        // {
        //     return db.GetById(id);
        // }

        // POST api/vaults
        [Authorize]
        [HttpPost]
        public Vault Post([FromBody]Vault vault)
        {
            var user = HttpContext.User.Identity.Name;
            int Id;
            int.TryParse( user, out Id);
            vault.UserId = Id;
            return db.Add(vault);
        }

        // PUT api/vaults/5
        [HttpPut("{id}")]
        public Vault Put(int id, [FromBody]Vault vault)
        {
            if (ModelState.IsValid)
            {
                return db.GetOneByIdAndUpdate(id, vault);
            }
            return null;
        }

        // DELETE api/vaults/5
        [Authorize]
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return db.FindByIdAndRemove(id);
        }
    }
}