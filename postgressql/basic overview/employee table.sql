-- CREATE TABLE person(
-- id INT,
-- name VARCHAR(100),
-- city VARCHAR(100)
-- );

-- CREATE TABLE employees(
--     id SERIAL PRIMARY KEY,
-- 	fname VARCHAR(50) NOT NULL,
-- 	lname VARCHAR(50) NOT NULL,
-- 	email VARCHAR(50) NOT NULL UNIQUE,
-- 	dept VARCHAR(50),
-- 	salary DECIMAL(10,2) DEFAULT 30000.00,
-- 	hire_date DATE NOT NULL DEFAULT CURRENT_DATE
-- )

-- INSERT INTO employees(
-- 	fname,lname,email,dept,salary,hire_date
-- ) VALUES ('Arjun', 'Verma', 'arjun@gmail.com', 'IT', 50000.00, '2020-01-15'),
-- ('Sneha', 'Sharma', 'sneha@gmail.com', 'HR', 30000.00,'2019-03-20'),
-- ('Rohit', 'Kumar', 'rohit@gmail.com', 'Finance', 55000.00, '2021-07-10'),
-- ('Priya', 'Singh', 'priya@gmail.com', 'IT', 60000.00, '2018-11-05'),
-- ('Ankit', 'Gupta', 'ankit@gmail.com', 'Marketing', 45000.00, '2022-02-28'),
-- ('Neha', 'Patel', 'neha@gmail.com', 'Finance', 30000.00,'2021-09-17'),
-- ('Vikram', 'Mehta', 'vikram@gmail.com', 'IT', 52000.00, '2019-06-22'),
-- ('Tanya', 'Rao', 'tanya@gmail.com', 'HR', 42000.00, '2020-12-01'),
-- ('Karan', 'Joshi', 'karan@gmail.com', 'Marketing', 47000.00, '2022-04-18'),
-- ('Simran', 'Kaur', 'simran@gmail.com', 'Finance', 30000.00,'2018-08-30');

-- DELETE FROM employees;

SELECT * FROM employees;

