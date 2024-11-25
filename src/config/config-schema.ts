import zod from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const configSchema = zod.object({
    ENV: zod.enum(['development', 'test', 'production']).default('development'),
    LOG_LEVEL: zod.enum(['error', 'warn', 'info', 'debug']).default('info'),
    APP_PORT: zod.number().default(3000),
    DB_PORT: zod.number().default(3306),
    DB_HOST: zod.string(),
    DB_USER: zod.string(),
    DB_PASSWORD: zod.string(),
    DB_NAME: zod.string(),
});

type AppConfiguration = zod.infer<typeof configSchema>;
interface AppConfigurationInterface extends AppConfiguration { }

export { AppConfiguration, AppConfigurationInterface }; 
