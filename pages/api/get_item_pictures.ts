import { IncomingMessage, ServerResponse } from 'http';
import { RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { URLSearchParams } from 'url';
import { connectionStatus, connection } from './database'

export default async function (req: IncomingMessage, res: ServerResponse) {

    // check if we are connected

    if (!connectionStatus) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Error connecting to the database' }));
    }

    // get search parameters from url

    const urlOnlySearch = new URLSearchParams((req.url as string).split('?')[1])

    // grab id from search params

    const id = urlOnlySearch.get("id");

    connection.query(`
        SELECT	* 
        FROM	item_pictures
        WHERE	picture_item = ${id};
    `,
        (queryError: Query.QueryError | null, result: RowDataPacket) => {

            // error if query didn't work.

            if (queryError) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Error querying the database' }));
            }

            // return pictures if successful

            res.end(JSON.stringify({ result }));
        });
}