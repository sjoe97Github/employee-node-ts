import { db } from '../dal/dbconnection';
import { Employee } from '../models/EntityTypes';
import { RowDataPacket, FieldPacket } from 'mysql2';

export class EmployeeService {
    async getEmployees(): Promise<Employee[]> {
        try {
            const [rows] = await db.query('SELECT * FROM employees limit 10');
            return rows as Employee[];
        } catch (error) {
            throw new Error('Error retrieving employees');
        }
    }

    async getEmployeeById(id: number): Promise<Employee> {
        try {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM employees WHERE emp_no = ?', [id]);
            if (rows.length === 0) {
                throw new Error('Employee not found');
            }
            return rows[0] as Employee;
        } catch (error) {
            throw new Error('Error retrieving employee');
        }
    }

    async getEmployeeByFirstName(firstName: string): Promise<Employee> {
        try {
            const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM employees WHERE first_name = ?', [firstName]);
            if (rows.length === 0) {
                throw new Error('Employee not found');
            }
            return rows[0] as Employee;
        } catch (error) {
            throw new Error('Error retrieving employee');
        }
    }

    // Create an addEmployee method that is modeled after the updateEmployee method which protects agains sql injection attacks.
    // The addEmployee method should take an Employee object and return a Promise of Employee object.
    async addEmployee(employee: Employee): Promise<Employee> {
        const query = `
          INSERT INTO employees (first_name, last_name, birth_date, hire_date, gender, emp_no)
            VALUES (?, ?, DATE(?), DATE(?), ?, ?)
        `;
        const values = [
            employee.first_name,
            employee.last_name,
            employee.birth_date,
            employee.hire_date,
            employee.gender,
            employee.emp_no
        ];

        try {
            console.log('Adding employee:', employee);
            const [result]: [RowDataPacket[], any] = await db.query(query, values);
            console.log('Employee added:', result);
            return result[0] as Employee;
            // const insertedEmployee: Employee = {
            //     emp_no: result.insertId,
            //     ...employee
            // };
            // return insertedEmployee;
        } catch (error) {
            console.error('Error adding employee:', error);
            console.error('Error adding employee:', error);
            throw error;
        }
    }

    async updateEmployee(employee: Employee): Promise<Employee> {
        // The STR_TO_DATE function is used to presere the time portion of the date string; however, in this case,
        // the time portion is not being preserved because the DDL for the employees table specifies 
        // the birth_date and hire_date columns as DATE types.  Nevertheless, the STR_TO_DATE function is used 
        // to demonstrate how to convert a date string to a datetime object.
        const query = `
          UPDATE employees
          SET first_name = ?, last_name = ?, birth_date = STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), hire_date = STR_TO_DATE(?, '%Y-%m-%dT%H:%i:%s.%fZ'), gender = ?
          WHERE emp_no = ?
        `;
        const values = [
            employee.first_name,
            employee.last_name,
            employee.birth_date,
            employee.hire_date,
            employee.gender,
            employee.emp_no // emp_no of the employee we want to update, it's used in the WHERE clause 
        ];

        try {
            const [result]: [RowDataPacket[], any] = await db.query(query, values);
            return result[0] as Employee;
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    }

    async deleteEmployee(id: number): Promise<void> {
        try {
            console.log('Deleting employee with id:', id);
            const [result]: [any, FieldPacket[]] = await db.query('DELETE FROM employees WHERE emp_no = ?', [id]);
            if (result.affectedRows === 0) {
                console.log('Employee not found');
                throw new Error('Employee not found');
            } else {
                console.log('Employee deleted');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw new Error('Error deleting employee');
        }
    }

    // async addEmployee(firstName: string, lastName: string, age: string): Promise<Employee> {
    //     try {
    //         const [result]: any = await db.query(
    //             'INSERT INTO employees (first_name, last_name, birth_date) VALUES (?, ?, ?)',
    //             [firstName, lastName, age]
    //         );
    //         return { emp_no: result.insertId, first_name: firstName, last_name: lastName, birth_date: new Date(age).toISOString(), hire_date: new Date().toISOString(), gender: 'M' } as Employee;
    //     } catch (error) {
    //         throw new Error('Error adding employee');
    //     }
    // }

    // Create an updateEmployee function that takes an Employee object and returns a Promise of an Employee object.
    // The function should update the employee with the given id and return the updated employee.   
    // async updateEmployee(employee: Employee): Promise<Employee> {
    //     try {
    //         const [result]: any = await db.query(
    //             `
    //             UPDATE employees SET first_name = ?, last_name = ?, birth_date = ?, hire_date = ?, gender = ? WHERE emp_no = ?
    //             [employee.first_name, employee.last_name, employee.birth_date, employee.hire_date, employee.gender]
    //             `
    //         );
    //         if (result.affectedRows === 0) {
    //             throw new Error('Employee not found');
    //         }
    //         return employee;
    //     } catch (error) {
    //         throw new Error('Error updating employee');
    //     }
    // }

    // async updateEmployee(id: number, firstName: string, lastName: string, age: string): Promise<Employee> {
    //     try {
    //         const [result]: any = await db.query(
    //             'UPDATE employees SET firstName = ?, lastName = ?, age = ? WHERE id = ?',
    //             [firstName, lastName, age, id]
    //         );
    //         if (result.affectedRows === 0) {
    //             throw new Error('Employee not found');
    //         }
    //         return { emp_no: id, first_name: firstName, last_name: lastName, birth_date: Date.parse(age).toLocaleString(), hire_date: Date.now().toLocaleString(), gender: 'M' } as Employee;
    //     } catch (error) {
    //         throw new Error('Error updating employee');
    //     }
    // }
}
