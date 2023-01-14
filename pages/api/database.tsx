import { createPool } from 'mysql2';

const createSqlConnection = () => {
    try {
  
      const pool = createPool({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0
      });
  
      const promisePool = pool.promise();
  
      return promisePool;

    } catch (error) {
      return console.log(`Could not connect - ${error}`);
    }
  }
  
  const pool = createSqlConnection();
  
  module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params: any) => pool.execute(...params)
  };