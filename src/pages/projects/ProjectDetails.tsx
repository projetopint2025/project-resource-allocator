import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { TimelineTab } from "./tabs/TimelineTab";
import { KPIsTab } from "./tabs/KPIsTab";
import { MetricsTab } from "./tabs/MetricsTab";
import { ObjectivesTab } from "./tabs/ObjectivesTab";
import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { type Project, type Task } from "@/types/project";
import { TaskSidebar } from "./TaskSidebar";
import { ProjectProgress } from "@/components/projects/stats/ProjectProgress";
import { ProjectBudget } from "@/components/projects/stats/ProjectBudget";
import { ProjectResources } from "@/components/projects/stats/ProjectResources";

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
              allocation: [0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "Maria Santos",
              role: "Product Owner",
              profile: "Senior",
              allocation: [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          materials: []
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
              allocation: [0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          materials: []
        }
      ]
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
              allocation: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          materials: []
        }
      ]
    }
  ]
};

export function ProjectDetails() {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('timeline');

  const handleUpdateTask = (updatedTask: Task) => {
    console.log('Task updated:', updatedTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <ProjectHeader
          name={mockProject.name}
          description={mockProject.description}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
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

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div>
          {activeTab === 'timeline' && (
            <TimelineTab
              project={mockProject}
              timelineYear={timelineYear}
              setTimelineYear={setTimelineYear}
              onSelectTask={setSelectedTask}
              currentPage={currentPage}
              pageCount={Math.ceil(mockProject.workPackages.length / 2)}
              onPageChange={setCurrentPage}
            />
          )}
          {activeTab === 'kpis' && <KPIsTab project={mockProject} />}
          {activeTab === 'metrics' && <MetricsTab project={mockProject} />}
          {activeTab === 'objectives' && <ObjectivesTab project={mockProject} />}
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
