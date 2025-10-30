-- Group by

-- SELECT dept FROM employees GROUP BY dept
-- SELECT dept, SUM(salary) FROM employees GROUP BY dept


-- CONCAT() 

-- SELECT CONCAT(fname,lname) AS FULLNAME FROM employees
-- SELECT id,CONCAT(fname,lname) AS FULLNAME,dept FROM employees
-- SELECT id,CONCAT(fname,' ',lname) AS FULLNAME,dept FROM employees

-- CONCAT_WS()

-- SELECT id,CONCAT_WS(':',fname,lname) AS FULLNAME,dept FROM employees


-- SUBSTRING

-- SELECT SUBSTR('Hello world',1,2)
-- SELECT SUBSTR('Hello world',6,10)


-- REPLACE

-- SELECT REPLACE('Hello world','ll','ii')
-- SELECT REPLACE(dept,'IT','TECH') FROM employees


-- REVERSE 

-- SELECT REVERSE('Hello world')
-- SELECT REVERSE(fname) FROM employees


-- LENGTH 

-- SELECT * from employees WHERE LENGTH(fname) > 5


-- LEFT & RIGHT & TRIM & POSITION

-- SELECT LEFT('Hello',4)
-- SELECT LEFT(fname,4) FROM employees
-- SELECT RIGHT(fname,4) FROM employees
-- SELECT TRIM('      this!      ') 
-- SELECT POSITION('l' in 'hello')






