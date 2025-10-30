-- Exercise 1 


-- 12:Sneha Sharma:HR
-- SELECT CONCAT_WS(':',id,CONCAT(fname,' ',lname),dept) FROM employees where id = 12

-- Task 1 : 12:Sneha Sharma:hr => dept are in small letters
-- SELECT CONCAT_WS(':',id,CONCAT(fname,' ',lname),LOWER(dept)) FROM employees where id = 12
-- select * from employees


-- Task 2 : 
-- I11 Arjun 
-- H12 Sneha

-- SELECT CONCAT(SUBSTR(dept,1,1),id) from employees where id = 11;
-- SELECT CONCAT(SUBSTR(dept,1,1),id) from employees where id = 12;


-- Task 3  : Find different type of departments in database 
-- SELECT DISTINCT(dept) FROM employees

-- Task 4 : Display record with high-low salary
-- SELECT MIN(salary) FROM employees
-- SELECT MAX(salary) FROM employees

-- Task 5 : how to see only top 3 reacord in table 
-- SELECT * FROM employees LIMIT(3)

-- Taks 6 : show records where first name start with letter 'A'
-- SELECT * FROM employees WHERE fname LIKE 'A%'

-- Task 7 : show records where length of the lname is 4 character
-- SELECT LEFT(fname,4) FROM employees