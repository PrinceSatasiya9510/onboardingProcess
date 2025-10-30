-- clauses 

-- WHERE 

-- SELECT * FROM employees WHERE id = 11;
-- SELECT * FROM employees WHERE salary > 50000;
-- SELECT * FROM employees WHERE dept = 'IT' or dept='Finance';
-- SELECT * FROM employees WHERE salary >= 50000 AND salary <= 50000;
-- SELECT * FROM employees WHERE salary != 30000;
-- SELECT * FROM employees WHERE dept In ('IT','HR');
-- SELECT * FROM employees WHERE dept NOT In ('IT','HR');
-- SELECT * FROM employees WHERE salary BETWEEN 50000 AND 650000


-- DISTINCT => for specefic column only 

-- SELECT DISTINCT dept FROM employees;
-- SELECT DISTINCT salary FROM employees;
-- SELECT DISTINCT fname FROM employees;


-- Order By => sorting a data like alfabetic sorting

-- SELECT * FROM employees Order By fname
-- SELECT * FROM employees Order By fname desc


-- Limit  => how many data you want.

-- SELECT * FROM employees LIMIT 3;
-- SELECT * FROM employees LIMIT 5;


-- Like  => find pattern in table.

-- SELECT * FROM employees	WHERE fname LIKE 'A%' 
-- SELECT * FROM employees	WHERE fname LIKE '%i%' 
-- SELECT * FROM employees	WHERE dept LIKE '__'

