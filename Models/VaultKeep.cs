using System.Collections.Generic;

namespace keepr_c.Models
{
    public class VaultKeep
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int KeepId { get; set; }
        public int VaultId { get; set; }
    }
}