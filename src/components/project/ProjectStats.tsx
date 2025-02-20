
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Users } from "lucide-react";

interface ProjectStatsProps {
  workPackagesProgress: number;
  tasksProgress: number;
  completedWorkPackages: number;
  totalWorkPackages: number;
  completedTasks: number;
  totalTasks: number;
  budget: number;
  totalSpent: number;
}

export const ProjectStats = ({
  workPackagesProgress,
  tasksProgress,
  completedWorkPackages,
  totalWorkPackages,
  completedTasks,
  totalTasks,
  budget,
  totalSpent,
}: ProjectStatsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Progresso do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Workpackages</p>
                <p className="text-sm font-medium">{completedWorkPackages} / {totalWorkPackages}</p>
              </div>
              <Progress value={workPackagesProgress} className="h-2 bg-gray-100" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Tarefas</p>
                <p className="text-sm font-medium">{completedTasks} / {totalTasks}</p>
              </div>
              <Progress value={tasksProgress} className="h-2 bg-gray-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-customBlue" /> 
            Orçamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(budget)}
              </span>
            </div>
            <Progress 
              value={(totalSpent / budget) * 100} 
              className="h-2 bg-gray-100" 
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Gasto</span>
              <span className="text-green-600 font-medium">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(totalSpent)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
            <Users className="h-4 w-4 mr-2 text-customBlue" /> 
            Recursos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Alocados</span>
              <span className="font-medium">5</span>
            </div>
            <Progress value={60} className="h-2 bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Disponíveis</span>
              <span className="text-green-600 font-medium">2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
