-- VIEW QUERY 

-- CREATE VIEW billing_info AS 
-- SELECT p.p_name,oi.quantity,o.ord_date,c.cust_name,p.price,(oi.quantity * p.price) AS total FROM order_items oi
-- 	JOIN products p ON oi.p_id = p.p_id
-- 	JOIN orders o ON o.ord_id = oi.ord_id
-- 	JOIN customers c ON o.cust_id = c.cust_id 

SELECT * FROM billing_info



-- normal query 

-- SELECT p.p_name,oi.quantity,o.ord_date,c.cust_name,p.price,(oi.quantity * p.price) AS total FROM order_items oi
-- 	JOIN products p ON oi.p_id = p.p_id
-- 	JOIN orders o ON o.ord_id = oi.ord_id
-- 	JOIN customers c ON o.cust_id = c.cust_id 