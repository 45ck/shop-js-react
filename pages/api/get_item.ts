import { IncomingMessage, ServerResponse } from 'http';
import { createConnection, RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { URLSearchParams } from 'url';

export default async function (req: IncomingMessage, res: ServerResponse) {

    // get search parameters from url

    const urlOnlySearch = new URLSearchParams((req.url as string).split('?')[1])  

    // grab id from search params

    const id = urlOnlySearch.get("id");

    // setup connection to MySQL database

    const connection = createConnection({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    })

    // check if we can't connect

    connection.connect((connectionError: Query.QueryError | null) => {
        if (connectionError) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Error connecting to the database', details: connectionError }));
        } else {

            // query database to select the item we want

            connection.query(urlOnlySearch.has("id") ? `SELECT * FROM ITEMS WHERE item_id=${id}` : `SELECT * FROM ITEMS`,
            (queryError: Query.QueryError | null, result: RowDataPacket) => {

                // error if query didn't work.

                if (queryError) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Error querying the database' }));
                }

                // return item if successful

                res.end(JSON.stringify({ result }));
            });
        }
    });
}