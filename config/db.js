// import pg from "pg";
// import dotenv from "dotenv";
// dotenv.config();

// const { Pool } = pg;
// const configDatabase = {
//   connectionString: process.env.DATABASE_URL
// };

// if(process.env.MODE === "PROD") {
//   configDatabase.ssl = {
//     rejectUnauthorized: false
//   }
// }

// const db = new Pool(configDatabase);
// export default db;


import pg from 'pg';


const { Pool } = pg;


const user = 'postgres';
const password = 'Luvitas1992';
const host = '127.0.0.1';
const port = 5432;
const database = 'linkr_test';

const db = new Pool({
  user,
  password,
  host,
  port,
  database
});


export default db;