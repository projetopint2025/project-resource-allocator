
export interface Material {
  id: string;
  name: string;
  units: number;
  unitPrice: number;
}

export interface Resource {
  name: string;
  role: string;
  profile: string;
  allocation: number[];
}

export interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  rationale: string;
  resources: Resource[];
  materials: Material[];
}

export interface WorkPackage {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  totalSpent: number;
  pacotesDeTrabalho: WorkPackage[];
  totalPacotesDeTrabalho: number;
  completedPacotesDeTrabalho: number;
  totalTasks: number;
  completedTasks: number;
}
