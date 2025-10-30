
-- JOIN 

-- cross join 
-- SELECT * FROM customers CROSS JOIN orders

-- SELECT * FROM orders


-- innerr join
SELECT * FROM customers as c INNER JOIN orders as o ON c.cust_id = o.cust_id;
SELECT c.cust_name,COUNT(o.ord_id) FROM customers as c INNER JOIN orders as o ON c.cust_id = o.cust_id GROUP BY cust_name


-- LEFT JOIN
-- SELECT * FROM customers AS c RIGHT JOIN orders AS o ON c.cust_id = o.cust_id;
-- SELECT * FROM customers AS c LEFT  JOIN orders AS o ON c.cust_id = o.cust_id;