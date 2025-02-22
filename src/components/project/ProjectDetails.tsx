import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  TimelineTab,
  KPIsTab,
  MetricsTab,
  ObjectivesTab,
  ProjectTimeline,
  TaskDetailsSidebar,
  ProjectHeader,
  ProjectTabs
} from "@/components";
import { type Project, type Task, type Resource } from "@/types/project";

const mockProject: Project = {
  id: 1,
  name: "INOVC+",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
  status: "in-progress",
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
          status: "in-progress",
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

const calculateTaskPosition = (startDate: string, endDate: string, year: number) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (start.getFullYear() !== year || end.getFullYear() !== year) return null;
  
  const startMonth = start.getMonth();
  const endMonth = end.getMonth();
  const duration = endMonth - startMonth + 1;
  
  return {
    gridColumnStart: startMonth + 1,
    gridColumnEnd: `span ${duration}`,
  };
};

export function ProjectDetails() {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [allocationYear, setAllocationYear] = useState(2026);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('timeline');

  const itemsPerPage = 2;
  const pageCount = Math.ceil(mockProject.workPackages.length / itemsPerPage);

  const paginatedWorkPackages = mockProject.workPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAllocationChange = (resourceIndex: number, monthIndex: number, value: string) => {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      resources: selectedTask.resources.map((resource, index) => {
        if (index === resourceIndex) {
          const newAllocation = [...resource.allocation];
          newAllocation[monthIndex] = parseFloat(value);
          return { ...resource, allocation: newAllocation };
        }
        return resource;
      }),
    };
    setSelectedTask(updatedTask);
  };

  const handleAddMaterial = () => {
    if (!selectedTask) return;

    const newMaterial = {
      id: Math.random().toString(36).substring(2, 9),
      name: '',
      units: 0,
      unitPrice: 0,
    };

    setSelectedTask({
      ...selectedTask,
      materials: [...selectedTask.materials, newMaterial],
    });
  };

  const handleRemoveMaterial = (materialIndex: number) => {
    if (!selectedTask) return;

    const updatedMaterials = [...selectedTask.materials];
    updatedMaterials.splice(materialIndex, 1);

    setSelectedTask({
      ...selectedTask,
      materials: updatedMaterials,
    });
  };

  const handleMaterialChange = (materialIndex: number, field: string, value: string | number) => {
    if (!selectedTask) return;

    const updatedMaterials = [...selectedTask.materials];
    updatedMaterials[materialIndex] = {
      ...updatedMaterials[materialIndex],
      [field]: value,
    };

    setSelectedTask({
      ...selectedTask,
      materials: updatedMaterials,
    });
  };

  const handleAddResource = (resource: Resource) => {
    if (!selectedTask) return;

    setSelectedTask({
      ...selectedTask,
      resources: [...selectedTask.resources, resource],
    });
  };

  const handleRemoveResource = (resourceIndex: number) => {
    if (!selectedTask) return;

    const updatedResources = [...selectedTask.resources];
    updatedResources.splice(resourceIndex, 1);

    setSelectedTask({
      ...selectedTask,
      resources: updatedResources,
    });
  };

  const handleMarkTaskCompleted = (taskId: number) => {
    // Aqui você implementaria a lógica para marcar a tarefa como concluída
    console.log('Tarefa marcada como concluída:', taskId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timeline':
        return (
          <TimelineTab>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Cronograma</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTimelineYear(2025)}
                    className={timelineYear === 2025 ? 'bg-primary text-primary-foreground' : ''}
                  >
                    2025
                  </Button>
                  <Button
                    variant={timelineYear === 2026 ? 'default' : 'outline'}
                    onClick={() => setTimelineYear(2026)}
                  >
                    2026
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTimelineYear(2027)}
                    className={timelineYear === 2027 ? 'bg-primary text-primary-foreground' : ''}
                  >
                    2027
                  </Button>
                </div>
              </div>
              <ProjectTimeline
                workPackages={mockProject.workPackages}
                timelineYear={timelineYear}
                setTimelineYear={setTimelineYear}
                onSelectTask={setSelectedTask}
                currentPage={currentPage}
                pageCount={pageCount}
                onPageChange={setCurrentPage}
              />
            </div>
          </TimelineTab>
        );
      case 'kpis':
        return <KPIsTab project={mockProject} />;
      case 'metrics':
        return <MetricsTab project={mockProject} />;
      case 'objectives':
        return <ObjectivesTab project={mockProject} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
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

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div>
          {renderTabContent()}
        </div>
      </div>

      {selectedTask && (
        <TaskDetailsSidebar
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          allocationYear={allocationYear}
          onAllocationChange={handleAllocationChange}
          onAddMaterial={handleAddMaterial}
          onRemoveMaterial={handleRemoveMaterial}
          onMaterialChange={handleMaterialChange}
          onMarkCompleted={handleMarkTaskCompleted}
          onAddResource={handleAddResource}
          onRemoveResource={handleRemoveResource}
        />
      )}
    </div>
  );
}

export default ProjectDetails;

