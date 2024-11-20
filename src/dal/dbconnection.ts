import mysql from 'mysql2/promise';

console.log('Running with NODE_ENV:', process.env.NODE_ENV);

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '***REMOVED***',
    database: 'employees',
});