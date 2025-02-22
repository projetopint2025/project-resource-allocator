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

export interface WorkPackage {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
  assignedTo: string;
  rationale?: string;
  resources?: string[];
  materials?: string[];
}

export interface Resource {
  name: string;
  role: string;
  profile: string;
  allocation: number[];
}

export interface Material {
  id: string;
  name: string;
  units: number;
  unitPrice: number;
}
