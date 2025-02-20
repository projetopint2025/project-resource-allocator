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

// Define types for materials and tasks
interface Material {
  id: string;
  name: string;
  units: number;
  unitPrice: number;
}

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  rationale: string;
  resources: any[];
  materials: Material[];
}

const mockProject = {
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
  const { id } = useParams();
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

    const paginatedTimelineWorkPackages = mockProject.pacotesDeTrabalho.slice(
        (timelineCurrentPage - 1) * itemsPerPage,
        timelineCurrentPage * itemsPerPage
    );

  const handleAllocationChange = (resourceIndex: number, monthIndex: number, value: string) => {
    if (!selectedTask) return;

    const updatedTask = {
      ...selectedTask,
      resources: selectedTask.resources.map((resource: any, index: number) => {
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

  const getMonthName = (monthIndex: number, year: number) => {
    return new Date(year, monthIndex).toLocaleDateString('pt-BR', { month: 'short' });
  };

  const getTimelineMonths = () => {
    return Array.from({ length: 12 }).map((_, index) => getMonthName(index, timelineYear));
  };

  const getAllocationMonths = () => {
    return Array.from({ length: 12 }).map((_, index) => getMonthName(index, allocationYear));
  };

    const handleAddMaterial = () => {
        if (!selectedTask) return;

        const newMaterial = {
            id: Math.random().toString(36).substring(2, 9), // Generate a random ID
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

    const calculateTotal = (units: number, unitPrice: number) => {
        return units * unitPrice;
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
      {/* Project Header */}
      <div className="bg-white border-b">
        <div className="max-w-full mx-auto py-6 px-8">
          <div className="flex items-center space-x-4">
            <Link to="/projects">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{mockProject.name}</h1>
              <p className="text-gray-500 mt-1">{mockProject.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Project Overview Stats */}
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
                    <p className="text-sm font-medium">{mockProject.completedPacotesDeTrabalho} / {mockProject.totalPacotesDeTrabalho}</p>
                  </div>
                  <Progress value={workPackagesProgress} className="h-2 bg-gray-100" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Tarefas</p>
                    <p className="text-sm font-medium">{mockProject.completedTasks} / {mockProject.totalTasks}</p>
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
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(mockProject.budget)}
                  </span>
                </div>
                <Progress 
                  value={(mockProject.totalSpent / mockProject.budget) * 100} 
                  className="h-2 bg-gray-100" 
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Gasto</span>
                  <span className="text-green-600 font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(mockProject.totalSpent)}
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

        {/* Timeline */}
        <Card className="bg-white shadow-sm border-gray-200 mb-8">
          <CardHeader className="border-b bg-customBlue-subtle">
            <div className="flex items-center justify-between">
              <CardTitle className="text-customBlue">Cronograma</CardTitle>
              <Select value={timelineYear.toString()} onValueChange={(value) => setTimelineYear(parseInt(value))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] w-full">
                <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 border-b" style={{ borderColor: "#D1D5DB" }}>
                  <div className="p-2 text-sm font-medium" style={{ color: textColorSecondary }}>Tarefa</div>
                  {getTimelineMonths().map((month, index) => (
                    <div
                      key={index}
                      className="p-2 text-sm text-center border-r"
                      style={{ color: textColorSecondary, borderColor: "#D1D5DB" }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
                {paginatedTimelineWorkPackages.map((wp) => (
                  <div key={wp.id} className="mb-4">
                    <h3 className="font-medium mt-4 mb-2" style={{ color: textColorPrimary }}>{wp.name}</h3>
                    {wp.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 items-center"
                      >
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="p-2 text-sm text-left hover:text-blue-500 transition-colors"
                          style={{ color: textColorPrimary }}
                        >
                          {task.name}
                        </button>
                        <div className="col-span-12 relative h-8">
                          <div
                            className="absolute h-6 rounded-md cursor-pointer hover:bg-blue-200 transition-colors"
                            style={{
                              left: `${(new Date(task.startDate).getMonth()) * (100 / 12)}%`,
                              width: `${((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.5)) * (100 / 12)}%`,
                              top: '1px',
                              backgroundColor: primaryColor,
                              opacity: 0.7,
                            }}
                            onClick={() => setSelectedTask(task)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Timeline Pagination */}
            {timelinePageCount > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={timelineCurrentPage === 1}
                  onClick={() => handleTimelinePageChange(timelineCurrentPage - 1)}
                  style={{ borderColor: "#D1D5DB", color: textColorPrimary }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: timelinePageCount }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={timelineCurrentPage === page ? "default" : "outline"}
                    onClick={() => handleTimelinePageChange(page)}
                    style={{
                      backgroundColor: timelineCurrentPage === page ? primaryColor : cardBackgroundColor,
                      color: timelineCurrentPage === page ? "#FFFFFF" : textColorPrimary,
                      borderColor: "#D1D5DB",
                    }}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={timelineCurrentPage === timelinePageCount}
                  onClick={() => handleTimelinePageChange(timelineCurrentPage + 1)}
                  style={{ borderColor: "#D1D5DB", color: textColorPrimary }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Task Details Sidebar */}
      {selectedTask && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[600px] bg-white shadow-xl border-l border-gray-200 overflow-y-auto animate-slide-in-right">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{selectedTask.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedTask(null)}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: textColorSecondary }}>Fundamentação</h3>
              <p className="text-sm" style={{ color: textColorPrimary }}>{selectedTask.rationale}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: textColorSecondary }}>Recursos Humanos</h3>
              <div className="border rounded-lg" style={{ borderColor: "#D1D5DB" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600">Nome</TableHead>
                      <TableHead className="text-gray-600">Função</TableHead>
                      <TableHead className="text-gray-600">Perfil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.resources.map((resource: any) => (
                      <TableRow key={resource.name}>
                        <TableCell className="text-gray-700">{resource.name}</TableCell>
                        <TableCell className="text-gray-700">{resource.role}</TableCell>
                        <TableCell className="text-gray-700">{resource.profile}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium" style={{ color: textColorSecondary }}>Alocação Mensal</h3>
                <Select value={allocationYear.toString()} onValueChange={(value) => setAllocationYear(parseInt(value))}>
                  <SelectTrigger className="w-[180px]" style={{ backgroundColor: cardBackgroundColor, borderColor: "#D1D5DB", color: textColorPrimary }}>
                    <SelectValue placeholder="Selecionar Ano" className="text-sm" style={{ color: textColorPrimary }} />
                  </SelectTrigger>
                  <SelectContent className="shadow-md rounded-md" style={{ backgroundColor: cardBackgroundColor }}>
                    <SelectItem value="2026" style={{ color: textColorPrimary }}>2026</SelectItem>
                    <SelectItem value="2027" style={{ color: textColorPrimary }}>2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {selectedTask.resources.map((resource: any, resourceIndex: number) => (
                <div key={resource.name} className="mb-4">
                  <p className="text-sm font-medium mb-2" style={{ color: textColorPrimary }}>{resource.name}</p>
                  <div className="grid grid-cols-6 gap-2">
                    {resource.allocation.map((value: number, monthIndex: number) => (
                      <div key={monthIndex} className="text-center">
                        <p className="text-xs mb-1" style={{ color: textColorSecondary }}>
                          {getMonthName(monthIndex, allocationYear)}
                        </p>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={value}
                          onChange={(e) => handleAllocationChange(resourceIndex, monthIndex, e.target.value)}
                          className="w-full p-2 text-sm border rounded-md"
                          style={{ borderColor: "#D1D5DB", color: textColorPrimary, backgroundColor: cardBackgroundColor }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Materials Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium" style={{ color: textColorSecondary }}>Materiais</h3>
                <Button variant="outline" size="sm" onClick={handleAddMaterial} style={{ borderColor: "#D1D5DB", color: textColorPrimary }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </div>
              <div className="border rounded-lg" style={{ borderColor: "#D1D5DB" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600">Nome</TableHead>
                      <TableHead className="text-gray-600">Unidades</TableHead>
                      <TableHead className="text-gray-600">Preço Unitário</TableHead>
                      <TableHead className="text-gray-600">Total</TableHead>
                      <TableHead className="text-gray-600">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.materials && selectedTask.materials.map((material: Material, index: number) => (
                      <TableRow key={material.id}>
                        <TableCell className="text-gray-700">
                          <Input
                            type="text"
                            value={material.name}
                            onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                            className="w-full p-2 text-sm border rounded-md"
                            style={{ borderColor: "#D1D5DB", color: textColorPrimary, backgroundColor: cardBackgroundColor }}
                          />
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <Input
                            type="number"
                            value={material.units}
                            onChange={(e) => handleMaterialChange(index, 'units', parseFloat(e.target.value))}
                            className="w-full p-2 text-sm border rounded-md"
                            style={{ borderColor: "#D1D5DB", color: textColorPrimary, backgroundColor: cardBackgroundColor }}
                          />
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <Input
                            type="number"
                            value={material.unitPrice}
                            onChange={(e) => handleMaterialChange(index, 'unitPrice', parseFloat(e.target.value))}
                            className="w-full p-2 text-sm border rounded-md"
                            style={{ borderColor: "#D1D5DB", color: textColorPrimary, backgroundColor: cardBackgroundColor }}
                          />
                        </TableCell>
                        <TableCell className="text-gray-700">
                          € {calculateTotal(material.units, material.unitPrice)}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveMaterial(index)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-gray-700">
                        € {selectedTask.materials && selectedTask.materials.reduce((acc, material) => acc + calculateTotal(material.units, material.unitPrice), 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
