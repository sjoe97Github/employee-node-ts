type Department = {
    dept_no: string
    dept_name: string
};

type EmployeeRequestParams = {
    id: number              // alias for emp_no
    // birth_date: string
    firstname: string        // alias for first_name
    // last_name: string
}

type Employee = {
    emp_no: number
    birth_date: string
    first_name: string
    last_name: string
    gender: 'M' | 'F'
    hire_date: string
};

type DeptEmp = {
    emp_no: number
    dept_no: string
    from_date: string
    to_date: string
};

type DeptManager = {
    emp_no: number
    dept_no: string
    from_date: string
    to_date: string
};

type Salary = {
    emp_no: number
    salary: number
    from_date: string
    to_date: string
};

type Title = {
    emp_no: number
    title: string
    from_date: string
    to_date: string | null
};

export { Department, EmployeeRequestParams, Employee, DeptEmp, DeptManager, Salary, Title };