import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { KPIsTab } from "./tabs/KPIsTab";
import { MetricsTab } from "./tabs/MetricsTab";
import { ObjectivesTab } from "./tabs/ObjectivesTab";
import { type Project, type Task } from "@/types/project";
import { TaskSidebar } from "@/components/projects/tasks/TaskSidebar";
import { Timeline } from "@/components/projects/Timeline";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"; // Usando os componentes de Tabs do Shadcn
import { Progress } from "@/components/ui/progress";

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

  // Sugestão: Adicionar uma seção de progresso geral do projeto no topo da Timeline para um resumo visual
  const projectProgress = mockProject.progress;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-8xl mx-auto space-y-12">
        {/* Header com Breadcrumbs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-gray-100 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{mockProject.name}</h1>
              <p className="text-lg text-gray-500 line-clamp-2">{mockProject.description}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="rounded-full border-gray-200 text-gray-600 hover:bg-gray-100 shadow-sm"
            >
              Ações
            </Button>
            <Button
              variant="default"
              className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white shadow-md px-6"
            >
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Tabs para Navegação com Progresso Geral */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="border-b border-gray-100"
        >
          <div className="bg-white rounded-t-2xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <TabsList className="inline-flex space-x-4">
                <TabsTrigger
                  value="timeline"
                  className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue hover:text-gray-900 transition-colors"
                >
                  Linha do Tempo
                </TabsTrigger>
                <TabsTrigger
                  value="kpis"
                  className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue hover:text-gray-900 transition-colors"
                >
                  KPIs
                </TabsTrigger>
                <TabsTrigger
                  value="metrics"
                  className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue hover:text-gray-900 transition-colors"
                >
                  Métricas
                </TabsTrigger>
                <TabsTrigger
                  value="objectives"
                  className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-customBlue data-[state=active]:border-b-2 data-[state=active]:border-customBlue hover:text-gray-900 transition-colors"
                >
                  Objetivos
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Progresso Geral:</span>
                <div className="w-24">
                  <Progress value={projectProgress} className="h-2 bg-gray-200 rounded-full" />
                </div>
                <span className="text-sm font-medium text-gray-600">{projectProgress}%</span>
              </div>
            </div>

            {/* Conteúdo das Tabs */}
            <TabsContent value="timeline" className="p-6 bg-white rounded-b-2xl shadow-md">
              <Timeline
                workPackages={mockProject.workPackages}
                timelineYear={timelineYear}
                onSelectTask={setSelectedTask}
              />
            </TabsContent>
            <TabsContent value="kpis" className="p-6 bg-white rounded-b-2xl shadow-md">
              <KPIsTab project={mockProject} />
            </TabsContent>
            <TabsContent value="metrics" className="p-6 bg-white rounded-b-2xl shadow-md">
              <MetricsTab project={mockProject} />
            </TabsContent>
            <TabsContent value="objectives" className="p-6 bg-white rounded-b-2xl shadow-md">
              <ObjectivesTab project={mockProject} />
            </TabsContent>
          </div>
        </Tabs>
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