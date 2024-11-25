import { GetResourcePolicyCommandInput } from './../../node_modules/@aws-sdk/client-secrets-manager/dist-types/commands/GetResourcePolicyCommand.d';
import mysql from 'mysql2/promise';
import { AppConfiguration } from '../config/config-schema';

export class DbConnection {
    private static instance: DbConnection;
    private pool: mysql.Pool | undefined = undefined;   // Is this actually necessary, to explicitly set this to undefined?

    private constructor() { }

    public static getInstance(): DbConnection {
        if (!DbConnection.instance) {
            DbConnection.instance = new DbConnection();
        }
        return DbConnection.instance;
    }

    public connect(appConfig: AppConfiguration): mysql.Pool {
        console.log('Running with DB_HOST:', appConfig.DB_HOST);
        console.log('Running with DB_USER:', appConfig.DB_USER);
        console.log('Running with DB_PASSWORD:', appConfig.DB_PASSWORD);
        console.log('Running with DB_NAME:', appConfig.DB_NAME);

        if (this.pool === undefined) {
            this.pool = mysql.createPool({
                host: appConfig.DB_HOST,
                user: appConfig.DB_USER,
                password: appConfig.DB_PASSWORD,
                database: appConfig.DB_NAME,
                port: appConfig.DB_PORT,
            });
        }
        return this.pool;
    }

    public GetDbPool(): mysql.Pool {
        let appConfig: AppConfiguration;
        if (this.pool === undefined) {
            throw new Error('Database connection not established');
        }
        return this.pool;
    }
}
