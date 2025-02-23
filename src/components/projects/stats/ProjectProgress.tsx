
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectProgressProps {
  workpackagesCount: number;
  totalWorkpackages: number;
  tasksCount: number;
  totalTasks: number;
}

export function ProjectProgress({ workpackagesCount, totalWorkpackages, tasksCount, totalTasks }: ProjectProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Progresso do Projeto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Workpackages</span>
            <span className="text-muted-foreground">{workpackagesCount}/{totalWorkpackages}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div 
              className="h-full bg-customBlue rounded-full" 
              style={{ width: `${(workpackagesCount/totalWorkpackages) * 100}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tarefas</span>
            <span className="text-muted-foreground">{tasksCount}/{totalTasks}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100">
            <div 
              className="h-full bg-customBlue rounded-full" 
              style={{ width: `${(tasksCount/totalTasks) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
