
import { type Project } from "@/types/project";

interface KPIsTabProps {
  project: Project;
}

export function KPIsTab({ project }: KPIsTabProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">KPIs</h2>
      {/* Implementar conteúdo dos KPIs */}
    </div>
  );
}
