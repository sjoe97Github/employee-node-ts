import mysql from 'mysql2/promise';

console.log('Running with NODE_ENV:', process.env.NODE_ENV);
console.log('Running with DB_HOST:', process.env.DB_HOST);
console.log('Running with DB_USER:', process.env.DB_USER);
console.log('Running with DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('Running with DB_NAME:', process.env.DB_NAME);

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'yourusername',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_NAME || 'employees',
});