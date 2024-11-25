import express from 'express';
import { ConfigManager } from './config/config-manager';
import { DbConnection } from './dal/dbconnection';

async function initializeApp() {
    const app = express();
    app.use(express.json());

    const configurationManager = ConfigManager.getInstance();

    try {
        await configurationManager.initialize();
        const appConfig = configurationManager.getConfig();
        console.log('Running with config:', appConfig);

        DbConnection.getInstance().connect(appConfig);

        // Import and use the employeesRouter only after the configuration is loaded
        const employeesRouter = (await import('./routes/employees')).default;
        app.use('/employees', employeesRouter);

        app.listen(appConfig.APP_PORT, () => {
            console.log(`Server running on port ${appConfig.APP_PORT}`);
        });
    } catch (error) {
        console.error('Error loading configuration:', error);
        process.exit(1);
    }
}

initializeApp();