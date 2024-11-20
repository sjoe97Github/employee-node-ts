import express from 'express';
import { EmployeeController } from '../controllers/employeeController';

const employeesRouter = express.Router();
const employeeController = new EmployeeController();

employeesRouter.get('/', employeeController.getEmployees);
employeesRouter.get('/:id', employeeController.getEmployeeById);
employeesRouter.get('/firstname/:firstName', employeeController.getEmployeeByFirstName);
employeesRouter.put('/', employeeController.updateEmployee);
employeesRouter.post('/', employeeController.addEmployee);
employeesRouter.delete('/:id', employeeController.deleteEmployee);

export default employeesRouter;