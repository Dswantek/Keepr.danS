using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using keepr_c.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace keepr_c.Repositories
{
    public class VaultKeepRepository
    {
        private readonly IDbConnection _db;

        public VaultKeepRepository(IDbConnection db)
        {
            _db = db;
        }

        // Find One Find Many add update delete
        public IEnumerable<Keep> GetAllKeepsByVault(int id)
        {
            return _db.Query<Keep>($@"SELECT * FROM vaultkeeps vk
                                                   INNER JOIN keeps k ON k.id = vk.keepId
                                                   WHERE (vaultId = {id})", id);
        }

        // public VaultKeep GetById(int id)
        // {
        //     return _db.QueryFirstOrDefault<VaultKeep>($"SELECT * FROM vaultkeeps WHERE id = @id", id);
        // }

        public VaultKeep Add(VaultKeep vaultkeep)
        {
            int id = _db.ExecuteScalar<int>("INSERT INTO vaultkeeps (VaultId, KeepId, UserId)"
                        + " VALUES(@VaultId, @KeepId, @UserId); SELECT LAST_INSERT_ID()", new
                        {
                            vaultkeep.VaultId,
                            vaultkeep.KeepId,
                            vaultkeep.UserId
                        });
            vaultkeep.Id = id;
            return vaultkeep;
        }

        // public Vault GetOneByIdAndUpdate(int id, Vault vault)
        // {
        //     return _db.QueryFirstOrDefault<Vault>($@"
        //         UPDATE vaultkkeeps SET  
        //             KeepId = @KeepId,
        //             VaultId = @VaultId,
        //             UserId = @UserId
        //         WHERE Id = {id};
        //         SELECT * FROM vaultkeeps WHERE id = {id};", vaultkeep);
        // }

        public string FindByIdAndRemove(int keepId)
        {
            var success = _db.Execute($@"
                DELETE FROM vaultkeeps WHERE KeepId = {keepId}
            ", keepId);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}