import { IncomingMessage, ServerResponse } from 'http';
import { RowDataPacket } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
import { URLSearchParams } from 'url';
import { connectionStatus, connection } from './database'

export default async function (req: IncomingMessage, res: ServerResponse) {

    // check if we are connected

    if (!connectionStatus) {
        res.statusCode = 500; 
        res.end(JSON.stringify({ error: `Unknown database error.` }));
    }

    // get search parameters from url

    const urlOnlySearch = new URLSearchParams((req.url as string).split('?')[1]);  

    // grab type of entity from search params

    enum EntityType {
        Proprietor = "PROPRIETORS",
        Items = "ITEMS",
        Account = "ACCOUNTS",
        Purchase = "PURCHASES",
        Category = "CATEGORIES",
        ItemPicture = "ITEM_PICTURES",
    }

    const typeOfEntity : EntityType = urlOnlySearch.get("type")?.toUpperCase() as EntityType;

    // some tables are private and only accessible through sessions,
    // deny access to anyone trying to access private data. 

    if (typeOfEntity == EntityType.Account || typeOfEntity ==  EntityType.Purchase) {
        res.statusCode = 401; 
        res.end(JSON.stringify({ error: `Unauthorized access to ${typeOfEntity.toLowerCase()} data.` }));
    }

    // grab id from search params

    const id = urlOnlySearch.get("id");

    // check if we can't connect

    enum EntityId {
        proprietor_id,
        item_id,
        account_id,
        purchase_id,
        category_id,
        picture_id
    }

    let sqlEntityId = EntityId[Object.values(EntityType).indexOf(typeOfEntity)];

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