using System.Collections.Generic;

namespace keepr_c.Models
{
    public class Keepr
    {
        public List<User> Users { get; set; }
        public List<Keep> Keeps { get; set; }
        public List<Vault> Vaults { get; set; }
    }
}