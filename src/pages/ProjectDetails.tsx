import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { X, ArrowLeft, Plus, Trash, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Project, Task } from "@/types/project";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectStats } from "@/components/project/ProjectStats";
import { ProjectTimeline } from "@/components/project/ProjectTimeline";
import { TaskDetailsSidebar } from "@/components/project/TaskDetailsSidebar";

const mockProject: Project = {
  id: 1,
  name: "INOVC+",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
  budget: 50000, // Added budget
  totalSpent: 25000, // Added total spent
  pacotesDeTrabalho: [
    {
      id: 1,
      name: "WP1 - Análise de Requisitos",
      tasks: [
        {
          id: 1,
          name: "Levantamento de requisitos",
          startDate: "2026-01-01",
          endDate: "2026-01-15",
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
          startDate: "2026-01-16",
          endDate: "2026-01-31",
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
          startDate: "2026-02-01",
          endDate: "2026-03-15",
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
        },
        {
          id: 4,
          name: "Desenvolvimento da UI",
          startDate: "2026-02-15",
          endDate: "2026-04-01",
          rationale: "Implementar a interface do usuário seguindo o design system",
          resources: [
            {
              name: "Ana Oliveira",
              role: "Desenvolvedora Frontend",
              profile: "Pleno",
              allocation: [0, 0, 0.8, 1, 1, 0, 0, 0, 0, 0, 0, 0]
            }
          ],
          materials: []
        }
      ]
    },
    {
      id: 3,
      name: "WP3 - Testes",
      tasks: [
        {
          id: 5,
          name: "Testes unitários",
          startDate: "2026-03-15",
          endDate: "2026-03-31",
          rationale: "Garantir a qualidade do código",
          resources: [],
          materials: []
        },
        {
          id: 6,
          name: "Testes de integração",
          startDate: "2026-04-01",
          endDate: "2026-04-15",
          rationale: "Garantir a integração dos módulos",
          resources: [],
          materials: []
        },
        {
          id: 7,
          name: "Testes de sistema",
          startDate: "2026-04-16",
          endDate: "2026-04-30",
          rationale: "Garantir o funcionamento do sistema",
          resources: [],
          materials: []
        },
        {
          id: 8,
          name: "Testes de aceitação",
          startDate: "2026-05-01",
          endDate: "2026-05-15",
          rationale: "Obter a aprovação do cliente",
          resources: [],
          materials: []
        }
      ]
    }
  ],
  totalPacotesDeTrabalho: 3, // Added total work packages
  completedPacotesDeTrabalho: 1, // Added completed work packages
  totalTasks: 8, // Added total tasks
  completedTasks: 2, // Added completed tasks
};

const itemsPerPage = 2;

const ProjectDetails = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [allocationYear, setAllocationYear] = useState(2026);
  const [timelineYear, setTimelineYear] = useState(2026);
  const [currentPage, setCurrentPage] = useState(1);
  const [timelineCurrentPage, setTimelineCurrentPage] = useState(1);

  const pageCount = Math.ceil(mockProject.pacotesDeTrabalho.length / itemsPerPage);
  const timelinePageCount = Math.ceil(mockProject.pacotesDeTrabalho.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTimelinePageChange = (page: number) => {
    setTimelineCurrentPage(page);
  };

  const paginatedWorkPackages = mockProject.pacotesDeTrabalho.slice(
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

  const workPackagesProgress = (mockProject.completedPacotesDeTrabalho / mockProject.totalPacotesDeTrabalho) * 100;
  const tasksProgress = (mockProject.completedTasks / mockProject.totalTasks) * 100;

  const primaryColor = "#2C5697";
  const backgroundColor = "#F9FAFB";
  const textColorPrimary = "#374151";
  const textColorSecondary = "#6B7280";
  const cardBackgroundColor = "#FFFFFF";
  const cardShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";

  return (
    <div className="min-h-screen bg-gray-50/50 animate-fade-in">
      <ProjectHeader
        name={mockProject.name}
        description={mockProject.description}
      />

      <div className="px-8 py-6">
        <ProjectStats
          workPackagesProgress={workPackagesProgress}
          tasksProgress={tasksProgress}
          completedWorkPackages={mockProject.completedPacotesDeTrabalho}
          totalWorkPackages={mockProject.totalPacotesDeTrabalho}
          completedTasks={mockProject.completedTasks}
          totalTasks={mockProject.totalTasks}
          budget={mockProject.budget}
          totalSpent={mockProject.totalSpent}
        />

        <ProjectTimeline
          workPackages={paginatedWorkPackages}
          timelineYear={timelineYear}
          setTimelineYear={setTimelineYear}
          onSelectTask={setSelectedTask}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
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
        />
      )}
    </div>
  );
};

export default ProjectDetails;
