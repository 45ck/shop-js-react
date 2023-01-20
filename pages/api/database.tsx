import { createConnection } from 'mysql2';
import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

const connection = createConnection({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

var connectionStatus = true;

connection.connect((connectionError: Query.QueryError | null) => {
    if (connectionError) connectionStatus = false;
});
  
export { connectionStatus, connection };