-- SELECT p_name,SUM(total) FROM billing_info 
-- 	GROUP BY p_name
-- 	HAVING SUM(total) > 1500


-- rollup 

SELECT COALESCE(p_name,'totalSUM'),SUM(total) FROM billing_info 
	GROUP BY 
	ROLLUP(p_name)
	ORDER BY sum(total)