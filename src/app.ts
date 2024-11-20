import express from 'express';
import employeesRouter from './routes/employees';

const app = express();
app.use(express.json());

app.use('/employees', employeesRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
