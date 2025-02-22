
export type TaskType = 'research' | 'development' | 'testing' | 'documentation' | 'management';

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
  type: TaskType;
  status: 'pending' | 'completed';
  startDate: string;
  endDate: string;
  description: string;
  assignedTo: string;
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
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  workPackages: WorkPackage[];
}
