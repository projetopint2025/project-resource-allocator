
import { type Project } from "@/types/project";

interface MetricsTabProps {
  project: Project;
}

export function MetricsTab({ project }: MetricsTabProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Métricas</h2>
      {/* Implementar conteúdo das métricas */}
    </div>
  );
}
