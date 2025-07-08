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

export interface EmployeeM {
  firstName: string,
  lastName: string,
  cpf: string,
  rg: string,
  email: string,
  phone: string,
  department: string,
  position: string,
  hireDate:  string

}

export interface DashboardData {
  totalEmployees: number;
  pendingVacations: number;
  birthdays: number;
}

export interface Position {
  id: number;
  title: string;
  positionDescription: string;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  path: string;
}

export interface LaborRights {
  contract_type: string;
  workload: string;
  is_unionized: boolean;
  has_fgts: boolean;
  has_inss: boolean;
  has_13th: boolean;
  has_vacation: boolean;
  transport: boolean;
  meal_voucher: boolean;
  food_voucher: boolean;
}

export interface Incident {
  id: number;
  type: string;
  description: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
}


export interface Tag {
  id: number;
  content: string;
  color: string;
}

export interface Salary {
  amount: string;
  start_date: string;
  end_date: string | null;
}

export interface Leave {
  type: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface Report {
  title: string;
  content: string;
}

export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  hire_date: string;
  absence: number;
  cpf: string;
  rg?: string;
  phone?: string;
  description?: string;
  city?: string;
  position_id: number;
  employee_status: 'active' | 'on_leave' | 'terminated';
  position?: Position;
  documents?: Document[];
  labor_rights?: LaborRights;
  tags?: Tag[];
  salaries?: Salary[];
  leaves?: Leave[];
  reports?: Report[];
  incidents?: Incident[];
}