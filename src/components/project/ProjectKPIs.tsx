import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Target, Clock, DollarSign, Users } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

const kpiData = {
  budget: {
    total: 100000,
    spent: 65000,
    remaining: 35000,
  },
  tasks: {
    total: 150,
    completed: 89,
    inProgress: 41,
    pending: 20,
  },
  team: {
    total: 12,
    active: 10,
  },
  time: {
    plannedDays: 120,
    elapsed: 45,
    remaining: 75,
  },
};

const taskChartData = {
  labels: ['Concluídas', 'Em Progresso', 'Pendentes'],
  datasets: [
    {
      data: [
        kpiData.tasks.completed,
        kpiData.tasks.inProgress,
        kpiData.tasks.pending,
      ],
      backgroundColor: ['#22c55e', '#f59e0b', '#64748b'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    },
  ],
};

export const ProjectKPIs = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold">Estado das Tarefas</h3>
        </div>
        <div className="h-64">
          <Doughnut 
            data={taskChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: '70%',
            }}
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Orçamento</h3>
            </div>
            <Progress value={(kpiData.budget.spent / kpiData.budget.total) * 100} />
            <div className="mt-2 text-sm text-gray-600">
              {((kpiData.budget.spent / kpiData.budget.total) * 100).toFixed(1)}% utilizado
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Tempo</h3>
            </div>
            <Progress value={(kpiData.time.elapsed / kpiData.time.plannedDays) * 100} />
            <div className="mt-2 text-sm text-gray-600">
              {kpiData.time.elapsed} dias decorridos de {kpiData.time.plannedDays}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-gray-500" />
              <h3 className="text-lg font-semibold">Equipa</h3>
            </div>
            <Progress value={(kpiData.team.active / kpiData.team.total) * 100} />
            <div className="mt-2 text-sm text-gray-600">
              {kpiData.team.active} membros ativos de {kpiData.team.total}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
