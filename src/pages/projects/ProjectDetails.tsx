import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { KPIsTab } from "./tabs/KPIsTab";
import { MetricsTab } from "./tabs/MetricsTab";
import { ObjectivesTab } from "./tabs/ObjectivesTab";
import { type Project, type Task } from "@/types/project";
import { TaskSidebar } from "@/components/projects/tasks/TaskSidebar";
import { Timeline } from "@/components/projects/Timeline";
import { ProjectProgress } from "@/components/projects/stats/ProjectProgress";
import { ProjectBudget } from "@/components/projects/stats/ProjectBudget";
import { ProjectResources } from "@/components/projects/stats/ProjectResources";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const mockProject: Project = {
  id: 1,
  name: "INOVC+",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
  status: "pending",
  progress: 45,
  startDate: "2026-01-01",
  endDate: "2026-12-31",
  workPackages: [
    {
      id: 1,
      name: "WP1 - Análise de Requisitos",
      tasks: [
        {
          id: 1,
          name: "Levantamento de requisitos",
          type: "research",
          status: "completed",
          startDate: "2026-01-01",
          endDate: "2026-01-15",
          description: "Identificar as necessidades dos stakeholders",
          assignedTo: "João Silva",
          rationale: "Identificar as necessidades dos stakeholders e definir os aspetos fundamentais do projeto",
          resources: [
            {
              name: "João Silva",
              role: "Investigador Científico",
              profile: "Senior",
              allocation: [0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              name: "Maria Santos",
              role: "Product Owner",
              profile: "Senior",
              allocation: [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
        {
          id: 2,
          name: "Validação com stakeholders",
          type: "management",
          status: "pending",
          startDate: "2026-01-16",
          endDate: "2026-01-31",
          description: "Validar requisitos com stakeholders",
          assignedTo: "Maria Santos",
          rationale: "Garantir que os requisitos levantados atendem às necessidades do negócio",
          resources: [
            {
              name: "João Silva",
              role: "Investigador Científico",
              profile: "Senior",
              allocation: [0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
      ],
    },
    {
      id: 2,
      name: "WP2 - Desenvolvimento",
      tasks: [
        {
          id: 3,
          name: "Implementação do backend",
          type: "development",
          status: "pending",
          startDate: "2026-02-01",
          endDate: "2026-03-15",
          description: "Desenvolver a API e serviços necessários",
          assignedTo: "Pedro Costa",
          rationale: "Desenvolver a API e serviços necessários",
          resources: [
            {
              name: "Pedro Costa",
              role: "Desenvolvedor Backend",
              profile: "Senior",
              allocation: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
      ],
    },
  ],
};

export function ProjectDetails() {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [activeTab, setActiveTab] = useState("timeline");

  const handleUpdateTask = (updatedTask: Task) => {
    console.log("Task updated:", updatedTask);
  };

  return (
    <div className="min-h-screen bg-gray-50/40 p-8 space-y-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-white/80 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">{mockProject.name}</h1>
              <p className="text-lg text-gray-500 line-clamp-2">{mockProject.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2 rounded-lg border-gray-200 text-gray-600 hover:bg-white shadow-sm"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button
              className="rounded-lg bg-customBlue hover:bg-customBlue/90 shadow-md px-6"
            >
              Ações
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <ProjectProgress 
            workpackagesCount={2} 
            totalWorkpackages={3}
            tasksCount={2}
            totalTasks={8}
          />
          <ProjectBudget 
            total={50000}
            spent={25000}
            remaining={25000}
          />
          <ProjectResources 
            allocated={5}
            available={2}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-100">
              <TabsList className="p-0 h-12">
                <TabsTrigger 
                  value="timeline"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue rounded-none h-12 px-6"
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger 
                  value="kpis"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue rounded-none h-12 px-6"
                >
                  KPIs
                </TabsTrigger>
                <TabsTrigger 
                  value="metrics"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue rounded-none h-12 px-6"
                >
                  Métricas
                </TabsTrigger>
                <TabsTrigger 
                  value="objectives"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue rounded-none h-12 px-6"
                >
                  Objetivos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="timeline" className="m-0">
              <Timeline
                workPackages={mockProject.workPackages}
                timelineYear={timelineYear}
                onSelectTask={setSelectedTask}
              />
            </TabsContent>
            <TabsContent value="kpis">
              <KPIsTab project={mockProject} />
            </TabsContent>
            <TabsContent value="metrics">
              <MetricsTab project={mockProject} />
            </TabsContent>
            <TabsContent value="objectives">
              <ObjectivesTab project={mockProject} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedTask && (
        <TaskSidebar
          task={selectedTask}
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}
    </div>
  );
}
