export type TaskType = 'research' | 'development' | 'testing' | 'documentation' | 'management';

export type ProjectStatus = 'completed' | 'in-progress' | 'pending';
export type TaskStatus = 'completed' | 'in-progress' | 'pending';

export interface Material {
  id: number;
  name: string;
  units: number;
  unitPrice: number;
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
  type?: TaskType; // Tornando o tipo opcional
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  rationale?: string; // Tornando a razão opcional
  assignedTo?: string; // Tornando a atribuição opcional
  resources: Resource[];
  materials: Material[]; // Mantido para compatibilidade, mas não deve ser usado
  entregaveis?: Entregavel[]; // Entregáveis serão definidos posteriormente
}

export interface WorkPackage {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress';
  tasks: Task[];
  materials?: Material[]; // Adicionando materiais ao WorkPackage
  description?: string;   // Adicionando descrição ao WorkPackage
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
