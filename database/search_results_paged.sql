SET @selectedPage = 3;
SET @rowsPerPage = 4;
SET @searchQuery = '8';

/* find where to start page and where it ends */
SET @startingRow = (@selectedPage * @rowsPerPage) - @rowsPerPage - 1;
SET @endingRow = (@selectedPage * @rowsPerPage);

/* get all rows between starting row and ending row  */
SELECT	* 
FROM	(
			SELECT	*, ROW_NUMBER()
            OVER 	(ORDER BY item_id) 
            AS		rowNumber
            FROM	items
		) items
WHERE 
	/* make sure we are between max/min rows */
	rowNumber >= @startingRow 
    AND rowNumber <= @endingRow
    /* make sure that we match query */
    AND (
		item_name LIKE concat('%', @searchQuery, '%')
		OR item_description LIKE concat('%', @searchQuery, '%')
	);
