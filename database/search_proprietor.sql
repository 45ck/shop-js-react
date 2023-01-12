/* get id based of name */
SET @id = (
SELECT proprietor_id 
FROM proprietors
WHERE proprietor_name="John Smith Inc"
LIMIT 1
);

/* display results for that name */
SELECT * 
FROM items
WHERE item_owner = @id;