SET @selectedPage = 1;
SET @rowsPerPage = 4;
SET @searchQuery = '0';

/* find where to start page and where it ends */
SET @startingRow = (@selectedPage * @rowsPerPage) - @rowsPerPage - 1;
SET @endingRow = (@selectedPage * @rowsPerPage);

SELECT * 
FROM	(
SELECT *, ROW_NUMBER()
OVER	(ORDER BY item_id ASC)
AS rowNumber
FROM (
	/* get all rows between starting row and ending row  */
	SELECT	*
	FROM	items
	WHERE 
		/* make sure that we match query */
		item_name LIKE concat('%', @searchQuery, '%')
		OR item_description LIKE concat('%', @searchQuery, '%')
) itemsFilterd
) e
/* make sure we are between max/min rows */
WHERE rowNumber >= @startingRow 
AND rowNumber <= @endingRow

