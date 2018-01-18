-- CREATE TABLE hangmans (
--     id int NOT NULL AUTO_INCREMENT,
--     name VARCHAR(255),
--     phrase VARCHAR(255), 
--     price DOUBLE(40,2), 
--     PRIMARY KEY (id)
--     );

-- SELECT * FROM hangmans

-- SELECT * FROM hangmans WHERE id = 1 OR id = 2;

-- UPDATE hangmans SET  
--     description = 'A plain old hangman!'
-- WHERE id = 2;
-- SELECT * FROM hangmans WHERE id = 2;

-- DROP TABLE hangmans


-- OUR CREATIONS
-- CREATE TABLE hangmans (
--     GameId int NOT NULL AUTO_INCREMENT,
--     Guesses int (1),
--     LettersGuessed VARCHAR(255),
--     Categories VARCHAR(255),
--     PRIMARY KEY (GameId)
-- );

-- DELETE FROM users WHERE Id = 7

-- INSERT INTO users (username, email, password)
-- VALUES("Jaime", "jA@j.com", "test"); SELECT LAST_INSERT_ID()

-- DELETE FROM vaults WHERE Id = 1;;

-- SELECT * FROM users;

-- ALTER TABLE keeps ADD COLUMN saves int(11);

-- ORDER BY Id, Name, Description, Url, UserId, Views, Saves;

-- ALTER TABLE vaults ADD COLUMN image VARCHAR(255) AFTER description;

-- ALTER TABLE keeps DROP COLUMN image;

-- SELECT * FROM vaults WHERE userId = 3;