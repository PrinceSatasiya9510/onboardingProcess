-- case expressions

-- SELECT fname ,salary, 
-- CASE 
--     WHEN salary > 55000 THEN 'HIGH'
-- 	WHEN salary BETWEEN 45000 AND 55000
-- 		THEN 'MID'
-- 	ELSE 'LOW'
-- END AS sal_cat FROM employees




-- SELECT fname ,salary, 
-- CASE 
--     WHEN salary > 0 THEN Round(salary*0.1)
-- END AS bonus FROM employees



SELECT 
CASE 
    WHEN salary < 45000 THEN 'LOW'
	WHEN salary BETWEEN 45000 AND 50000 THEN 'MID'
	ELSE 'HIGH'
END as salary_cat,COUNT(id) FROM employees GROUP BY salary_cat





