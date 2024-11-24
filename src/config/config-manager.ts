import e from 'express';
import { ConfigFromAWS } from './aws/aws-config-mgr';
import { configSchema, Config } from './config-schema';
import { DatabaseConfig } from '../models/ConfigTypes';

export class ConfigManager {
    private static instance: ConfigManager;
    private config: Config;
    private awsConfig: ConfigFromAWS = new ConfigFromAWS();
    private databaseConfig?: DatabaseConfig;

    private constructor() {
        this.config = this.loadConfig();
    }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    //
    //  This method needs a lot of refactoring:  
    //      It isn't totatly clear what is going on, the flow is "janky", and
    //      the error handling needs a lot of work.
    // 
    private loadConfig(): Config {
        let loadedConfig: Config;

        // TODO - refactor this to use an interface not any.  
        //        require a change to the config-schema.ts file
        //        to export the interface.
        let envConfig: any = {};

        (async () => {
            try {
                this.databaseConfig = await this.awsConfig.getDatabaseCredentials();

                if (this.databaseConfig !== undefined) {
                    envConfig = {
                        ENV: process.env.NODE_ENV,
                        LOG_LEVEL: process.env.LOG_LEVEL,
                        APP_PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
                        DB_PORT: this.databaseConfig.port ? parseInt(this.databaseConfig.port) :
                            (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306),
                        DB_HOST: this.databaseConfig.host || process.env.DB_HOST || 'localhost',
                        DB_USER: this.databaseConfig.username || process.env.DB_USER || 'yourusername',
                        DB_PASSWORD: this.databaseConfig.password || process.env.DB_PASSWORD || 'yourpassword',
                        DB_NAME: this.databaseConfig.dbname || process.env.DB_NAME || 'employees',
                    };
                } else {
                    envConfig = {
                        ENV: process.env.NODE_ENV,
                        LOG_LEVEL: process.env.LOG_LEVEL,
                        DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
                        DB_HOST: process.env.DB_HOST || 'localhost',
                        DB_USER: process.env.DB_USER || 'yourusername',
                        DB_PASSWORD: process.env.DB_PASSWORD || 'yourpassword',
                        DB_NAME: process.env.DB_NAME || 'employees',
                    };
                }

            } catch (error) {
                console.error("Error retrieving secret:", error);
                envConfig = {
                    ENV: process.env.NODE_ENV,
                    LOG_LEVEL: process.env.LOG_LEVEL,
                    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
                    DB_HOST: process.env.DB_HOST || 'localhost',
                    DB_USER: process.env.DB_USER || 'yourusername',
                    DB_PASSWORD: process.env.DB_PASSWORD || 'yourpassword',
                    DB_NAME: process.env.DB_NAME || 'employees',
                };
            }
        })();

        const result = configSchema.safeParse(envConfig);
        console.log('Config, envConfig:', envConfig);
        console.log('Config, result.data:', result.data);

        if (!result.success) {
            console.error('Invalid configuration:', result.error.format());
            loadedConfig = {} as Config;
            // throw new Error('Invalid configuration');
        } else {
            console.log('Configuration loaded successfully');
            loadedConfig = result.data;
        }

        return loadedConfig;
    }

    public get<K extends keyof Config>(key: K): Config[K] {
        return this.config[key];
    }

    public getAll(): Readonly<Config> {
        return Object.freeze({ ...this.config });
    }

    public getAppPort(): number {
        return this.config.APP_PORT;
    }

    public getDbPort(): number {
        return this.config.DB_PORT;
    }

    public geDbHost(): string {
        return this.config.DB_HOST;
    }

    public getDbUser(): string {
        return this.config.DB_USER;
    }

    public getDbPassword(): string {
        return this.config.DB_PASSWORD;
    }

    public getStockQuotePath(): string {
        return this.config.DB_NAME;
    }

    public getDbName(): string {
        return this.config.DB_NAME;
    }
}
