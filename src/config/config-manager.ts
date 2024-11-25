import { ConfigFromAWS } from './aws/aws-config-mgr';
import { configSchema, AppConfiguration, AppConfigurationInterface } from './config-schema';
import { DatabaseConfig } from '../models/ConfigTypes';

export class ConfigManager {
    private static instance: ConfigManager;
    private awsConfig: ConfigFromAWS = new ConfigFromAWS();
    private appConfiguration?: AppConfiguration;

    private constructor() { }

    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    public async initialize(): Promise<void> {
        this.appConfiguration = await this.loadAppConfiguration();
        if (!this.appConfiguration) {
            throw new Error('Failed to load application configuration');
        }
    }

    public getConfig(): AppConfiguration {
        if (!this.appConfiguration) {
            throw new Error('ConfigManager is not initialized');
        }
        return this.appConfiguration;
    }

    private async loadAppConfiguration(): Promise<AppConfiguration> {
        // Use the local environment to set the default configuration values.  
        let appConfiguration: AppConfiguration = {
            ENV: configSchema.shape.ENV.parse(process.env.NODE_ENV || 'development'),
            LOG_LEVEL: configSchema.shape.LOG_LEVEL.parse(process.env.LOG_LEVEL || 'info'),
            APP_PORT: configSchema.shape.APP_PORT.parse(parseInt(process.env.APP_PORT || '3000')),
            DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            DB_HOST: process.env.DB_HOST || 'localhost',
            DB_USER: process.env.DB_USER || 'yourusername',
            DB_PASSWORD: process.env.DB_PASSWORD || 'yourpassword',
            DB_NAME: process.env.DB_NAME || 'employees',
        };

        // If there is a problem loading the AWS configuration, default configuration values will be used.
        try {
            const databaseConfig = await this.loadAwsConfiguration();
            if (databaseConfig !== undefined) {
                appConfiguration.DB_NAME = databaseConfig.dbname || 'employees';
                appConfiguration.DB_HOST = databaseConfig.host || 'localhost';
                appConfiguration.DB_PASSWORD = databaseConfig.password || 'yourpassword';
                appConfiguration.DB_PORT = parseInt(databaseConfig.port);
                appConfiguration.DB_USER = databaseConfig.username || 'yourusername';
            }
        } catch (error) {
            console.error("Error retrieving secret:", error);
            throw new Error('Failed to load AWS configuration');
        }

        return appConfiguration;
    }

    private loadAwsConfiguration(): Promise<DatabaseConfig | undefined> {
        return this.awsConfig.getDatabaseCredentials();
    }
}
