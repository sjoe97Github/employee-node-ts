import { Request, Response } from 'express';
import { EmployeeService } from '../services/employeeService';
import { Employee } from '../models/EntityTypes';

const employeeService = new EmployeeService();

export class EmployeeController {
    async getEmployees(req: Request, res: Response): Promise<void> {
        try {
            const employees = await employeeService.getEmployees();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving employees', error });
        }
    }

    async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const employee = await employeeService.getEmployeeById(Number(req.params.id));
            res.json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving employee', error });
        }
    }

    async getEmployeeByFirstName(req: Request, res: Response): Promise<void> {
        try {
            const employee = await employeeService.getEmployeeByFirstName(req.params.firstName);
            res.json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving employee', error });
        }
    }

    async addEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employee: Employee = req.body;
            const newEmployee = await employeeService.addEmployee(employee);
            res.json(newEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error adding employee', error });
        }
    }

    async updateEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employee: Employee = req.body;
            const updatedEmployee = await employeeService.updateEmployee(employee);
            res.json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error updating employee', error });
        }
    }

    async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id, 10);
            await employeeService.deleteEmployee(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting employee', error });
        }
    }

    // // Create an updateEmployee function that takes the body of a request, creates an Employee object, and calls the updateEmployee function from the EmployeeService.
    // async updateEmployee(req: Request, res: Response): Promise<void> {
    //     try {
    //         const employee: Employee = req.body;
    //         const updatedEmployee = await employeeService.updateEmployee(employee);
    //         res.json(updatedEmployee);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error updating employee', error });
    //     }
    // }
}