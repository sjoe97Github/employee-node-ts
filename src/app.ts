import express from 'express';
import employeesRouter from './routes/employees';
import { ConfigManager } from './config/config-manager';

const app = express();
app.use(express.json());

const config = ConfigManager.getInstance();

app.use('/employees', employeesRouter);

app.listen(config.getAppPort(), () => {
    console.log('Server running on port 3000');
});
