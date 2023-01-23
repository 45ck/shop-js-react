import { IncomingMessage, ServerResponse } from 'http';
import { RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { URLSearchParams } from 'url';
import { connectionStatus, connection } from './database'


export interface RowItemPointer {
    rowNumber: Number,
    item_id: number
}


export default async function (req: IncomingMessage, res: ServerResponse) {

    // check if we are connected

    if (!connectionStatus) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error connecting to the database' }));
    }

    // get search parameters from url

    const urlOnlySearch = new URLSearchParams((req.url as string).split('?')[1])

    // grab id from search params

    const selectedPage = urlOnlySearch.get("page") ? Number(urlOnlySearch.get("page")) : 1;
    let rowsPerPage = 6;

    // find where to start page and where it ends 

    let startingRow = (selectedPage * rowsPerPage) - rowsPerPage;
    let endingRow = (selectedPage * rowsPerPage);

    let query =  urlOnlySearch.get("query")

    console.log(query)

    // get all item ids between starting row and ending row
    // and find all items that match query in columns name and description

    let sqlQuery = `SELECT * FROM(SELECT *,ROW_NUMBER() OVER (ORDER BY item_id) AS rowNumber FROM items) items WHERE rowNumber >= ${startingRow} AND rowNumber <= ${endingRow} AND (item_name LIKE '%${query}%' OR item_description LIKE '%${query}%');`;

    connection.query(sqlQuery,
        (queryError: Query.QueryError | null, result: RowDataPacket) => {

            // error if query didn't work.

            if (queryError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error querying the database' }));
            }

            // error if there is no items on this page 

            if (result.length <= 0) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'No items on this page' }));
            }

            // using item ids (item pointer) get the data of each item

            let sqlItems: any[] = [];

            result.forEach((itemPointer: RowItemPointer) => {
                connection.query(`SELECT * FROM items WHERE item_id = ${itemPointer.item_id};`,
                    (itemQueryError: Query.QueryError | null, itemsResult: RowDataPacket) => {

                        if (itemQueryError) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ error: 'Error querying the database' }));
                        }

                        sqlItems = [...sqlItems, itemsResult[0]];

                        // return item if we have all sql items in array

                        if (sqlItems.length >= result.length) {

                            res.end(JSON.stringify({ sqlItems }));
                        }
                    });
            });
        });
}