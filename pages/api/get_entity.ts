import { Squada_One } from '@next/font/google';
import { IncomingMessage, ServerResponse } from 'http';
import { createConnection, RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { URLSearchParams } from 'url';

export default async function (req: IncomingMessage, res: ServerResponse) {

    // get search parameters from url

    const urlOnlySearch = new URLSearchParams((req.url as string).split('?')[1]);  

    // grab type of entity from search params

    enum EntityType {
        Proprietor = "proprietors",
        Items = "items",
        Account = "accounts",
        Purchase = "purchases",
        Category = "categories",
        ItemPicture = "item_pictures",
    }

    const typeOfEntity : EntityType = urlOnlySearch.get("type") as EntityType;

    // some tables are private and only accessible through sessions,
    // deny access to anyone trying to access private data. 

    if (typeOfEntity == (EntityType.Account || EntityType.Purchase)) {
        res.statusCode = 401; 
        res.end(JSON.stringify({ error: `Unauthorized access to ${typeOfEntity} data.` }));
    }

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

            enum EntityId {
                proprietor_id,
                item_id,
                account_id,
                purchase_id,
                category_id,
                picture_id
            }

            let sqlEntityId = EntityId[Object.values(EntityType).indexOf(typeOfEntity)];

            console.log(sqlEntityId, typeOfEntity, `SELECT * FROM ${typeOfEntity.toUpperCase} WHERE ${sqlEntityId}=${id}`);

            // query database to select the item we want

            let sqlQuery = urlOnlySearch.has("id") ? `SELECT * FROM ${typeOfEntity.toUpperCase()} WHERE ${sqlEntityId}=${id}` : `SELECT * FROM ${typeOfEntity.toUpperCase()}`;

            connection.query(sqlQuery,
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
    })
}