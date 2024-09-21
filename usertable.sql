-- CREATE TABLE user(id int not null PRIMARY key,user_role varchar(200),user_name varchar(200));

-- CREATE TABLE user (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   user_role VARCHAR(200),
--   user_name VARCHAR(200)
-- );


-- DELETE FROM user WHERE user_role="Student";
-- DELETE FROM user_details WHERE user_name="Student";
-- CREATE TABLE form_details(id INTEGER PRIMARY KEY AUTOINCREMENT,student_name VARCHAR(150),
-- father_name VARCHAR(150),date_of_birth VARCHAR(150), gender VARCHAR(30), age VARCHAR(30),
-- address VARCHAR(250),city VARCHAR(50), state VARCHAR(100), pincode VARCHAR(100),
-- student_email VARCHAR(100), mobile_no VARCHAR(100));


-- DROP TABLE user;
-- DROP TABLE user_details;
-- CREATE TABLE user_details(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(200), user_password VARCHAR(200),
-- user_id INTEGER, FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE);

-- how to store id name task id and name are ok but how to store multiple tasks for student in sqlite3 table

CREATE TABLE student_tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, tasks VARCHAR(100),student_name VARCHAR(250), role VARCHAR(100),
 student_id INTEGER, FOREIGN KEY(student_id) REFERENCES user_details(id)  ON DELETE CASCADE);

-- ALTER TABLE student_tasks ADD role VARCHAR(100);

-- DROP TABLE student_tasks;

-- PRAGMA foreign_keys = ON;

-- INSERT INTO user_details(id, user_name, user_password)
-- VALUES(1,"Sai","$2b$10$1in1zrb9bCaIyWJctVvPq.2AJM3rEjn5c/ROcHgme51ns3xqbadgy"); 
-- 1,Sai,$2b$10$1in1zrb9bCaIyWJctVvPq.2AJM3rEjn5c/ROcHgme51ns3xqbadgy

-- PRAGMA foreign_key_list(user_details);
-- PRAGMA foreign_key_list(user);