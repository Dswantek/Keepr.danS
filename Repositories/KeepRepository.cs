using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using keepr_c.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace keepr_c.Repositories
{
    public class KeepRepository
    {
        private readonly IDbConnection _db;

        public KeepRepository(IDbConnection db)
        {
            _db = db;
        }

        // Find One Find Many add update delete
        public IEnumerable<Keep> GetAll()
        {
            return _db.Query<Keep>("SELECT * FROM keeps");
        }

        public IEnumerable<Keep> GetByUserId(int userId)
        {
            return _db.Query<Keep>($"SELECT * FROM keeps WHERE UserId = {userId}");
        }

        // public Keep GetById(int id)
        // {
        //     return _db.QueryFirstOrDefault<Keep>($"SELECT * FROM keeps WHERE id = @id", id);
        // }


        public Keep Add(Keep keep)
        {
            int id = _db.ExecuteScalar<int>("INSERT INTO keeps (Name, Url, Description, UserId, Views, Saves)"
                        + " VALUES(@Name, @Url, @Description, @UserId, @Views, @Saves); SELECT LAST_INSERT_ID()", new
                        {
                            keep.Name,
                            keep.Description,
                            keep.Url,
                            keep.UserId,
                            keep.Views,
                            keep.Saves
                        });
            keep.Id = id;
            return keep;
        }

        public Keep GetOneByIdAndUpdate(int id, Keep keep)
        {
            return _db.QueryFirstOrDefault<Keep>($@"
                UPDATE keeps SET  
                    Name = @Name,
                    Description = @Description,
                    Views = @Views,
                    Saves = @Saves,
                    UserId = @UserId
                WHERE Id = {id};
                SELECT * FROM keeps WHERE id = {id};", keep);
        }

        public string FindByIdAndRemove(int id)
        {
            var success = _db.Execute($@"
                DELETE FROM keeps WHERE Id = {id}
            ", id);
            return success > 0 ? "success" : "umm that didnt work";
        }
    }
}