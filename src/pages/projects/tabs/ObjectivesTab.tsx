
import { Project } from "@/types/project";

interface ObjectivesTabProps {
  project: Project;
}

export function ObjectivesTab({ project }: ObjectivesTabProps) {
  return (
    <div className="p-6">
      <h2>Objetivos - Em desenvolvimento</h2>
    </div>
  );
}
