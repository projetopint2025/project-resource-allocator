
export type TaskType = 'research' | 'development' | 'testing' | 'documentation' | 'management';

export type ProjectStatus = 'completed' | 'in-progress' | 'pending';
export type TaskStatus = 'completed' | 'in-progress' | 'pending';

export interface Material {
  id: number;
  name: string;
  units: number;
  unitPrice: number;
  category?: string;
  total?: number;
}

export interface Resource {
  id: number;
  name: string;
  role: string;
  profile: string;
  joinDate: string;
  allocation: number[];
}

export interface Entregavel {
  id: string;
  nome: string;
  descricao?: string;
  data?: string;
  anexo?: string;
  tipoAnexo?: string;
}

export interface Task {
  id: number;
  name: string;
  type?: TaskType;
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  rationale?: string;
  assignedTo?: string;
  resources: Resource[];
  materials: Material[];
  entregaveis?: Entregavel[];
}

export interface WorkPackage {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress';
  tasks: Task[];
  materials: Material[];
  description?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
  fundingType: string;
  fundingDetails: Record<string, any>;
  workPackages: WorkPackage[];
  progress: number;
}

export interface Budget {
  total: number;
  spent: number;
  remaining: number;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
}
