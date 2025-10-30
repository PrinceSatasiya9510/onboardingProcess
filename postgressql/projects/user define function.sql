
CREATE OR REPLACE FUNCTION dept_max_sal_emp1(dept_name VARCHAR)
RETURNS TABLE(id INT, fname VARCHAR, salary NUMERIC)
AS $$
BEGIN
RETURN QUERY
SELECT
e.id, e.fname, e.salary
FROM
employees e
WHERE
e.dept = dept_name
AND e.salary = (
SELECT MAX(emp.salary)
FROM employees emp
WHERE emp.dept = dept_name
);
END;
$$ LANGUAGE plpgsql;



SELECT * FROM dept_max_sal_emp1('IT');