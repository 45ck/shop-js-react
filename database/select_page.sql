SET @selectedPage = 1;
SET @rowsPerPage = 4;

/* find where to start page and where it ends */
SET @startingRow = (@selectedPage * @rowsPerPage) - @rowsPerPage;
SET @endingRow = (@selectedPage * @rowsPerPage) - 1;

/* get all rows between starting row and ending row  */
SELECT	* 
FROM	(SELECT ROW_NUMBER() OVER (ORDER BY picture_id) AS rowNumber, picture_id FROM item_pictures) item_pictures
WHERE rowNumber >= @startingRow AND rowNumber <= @endingRow;