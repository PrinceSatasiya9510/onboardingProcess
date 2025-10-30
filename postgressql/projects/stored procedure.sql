CREATE OR REPLACE PROCEDURE update_emp_salary(
	p_employee_id INT,
	p_new_salary NUMERIC 
)
LANGUAGE plpgsql
AS $$ 
BEGIN 
	UPDATE employees
	SET salary = p_new_salary
	WHERE id = p_employee_id;
   END;
   $$


-- call the procedure 

-- CALL update_emp_salary(18,51256);

-- SELECT * FROM employees;