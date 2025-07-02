export interface Department {
    id: number;
    department: string;
    description?: string;
}

export interface Position {
    id: number;
    title: string;
    description?: string;
    department?: Department;
}

export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    hire_date: string; 
    phone: string;
    employment_status: string;
    position?: Position;
  }