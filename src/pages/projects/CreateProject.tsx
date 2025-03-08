
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  EuroIcon,
  Plus,
  Trash,
  ListTodo,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, parseISO, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WorkPackage {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  hasDeliverable: boolean;
  deliverableDescription?: string;
  startDate?: string;
  endDate?: string;
  resources: string[];
  allocations?: {
    [resourceName: string]: {
      [monthIndex: number]: number;
    };
  };
}

const fundingTemplates = [
  {
    id: "pt2030",
    name: "Portugal 2030",
    icon: EuroIcon,
    description: "Programas de financiamento do quadro Portugal 2030.",
    color: "customBlue",
  },
  {
    id: "horizon",
    name: "Horizonte Europa",
    icon: EuroIcon,
    description: "Programa-quadro de investigação e inovação da UE.",
    color: "green-500",
  },
  {
    id: "norte2030",
    name: "Norte 2030",
    icon: EuroIcon,
    description: "Programa Operacional Regional do Norte 2030.",
    color: "red-500",
  },
];

const availableResources = [
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Ana Pereira",
  "Rui Almeida",
];

function TimelinePreview({ workPackages, startDate, endDate }: { 
  workPackages: WorkPackage[], 
  startDate?: string,
  endDate?: string
}) {
  if (!startDate || !endDate || workPackages.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded-xl bg-gray-50">
        <p className="text-gray-500 text-sm">
          Adicione pacotes de trabalho e defina as datas do projeto para visualizar o cronograma
        </p>
      </div>
    );
  }

  // Generate all months between project start and end dates
  const months: Date[] = [];
  let currentMonth = parseISO(startDate);
  const projectEndDate = parseISO(endDate);
  
  while (currentMonth <= projectEndDate) {
    months.push(new Date(currentMonth));
    currentMonth = addMonths(currentMonth, 1);
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">Cronograma do Projeto</h3>
        <p className="text-sm text-gray-500">Visualização dos pacotes de trabalho e tarefas</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="grid grid-cols-[200px_1fr]">
            {/* Header - months */}
            <div className="col-start-1 bg-gray-100 px-4 py-3 font-medium text-gray-900">
              Pacotes de Trabalho
            </div>
            <div className="col-start-2 border-l border-gray-200 flex">
              {months.map((month, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-20 px-2 py-3 text-center border-r border-gray-200 bg-gray-100 font-medium text-xs text-gray-900"
                >
                  {format(month, "MMM yyyy", { locale: ptBR })}
                </div>
              ))}
            </div>
            
            {/* Timeline rows */}
            {workPackages.map((wp) => (
              <React.Fragment key={wp.id}>
                <div className="col-start-1 px-4 py-3 font-medium text-gray-900 border-t border-gray-200">
                  {wp.name}
                </div>
                <div className="col-start-2 border-l border-t border-gray-200 flex relative h-10">
                  {wp.startDate && wp.endDate && (
                    <div
                      className="absolute top-0 h-full bg-customBlue/20 border border-customBlue rounded-md"
                      style={{
                        left: `${calculateOffset(parseISO(wp.startDate), parseISO(startDate), months.length)}%`,
                        width: `${calculateWidth(parseISO(wp.startDate), parseISO(wp.endDate), parseISO(startDate), projectEndDate, months.length)}%`
                      }}
                    ></div>
                  )}
                  {months.map((_, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-20 border-r border-gray-200"
                    ></div>
                  ))}
                </div>
                
                {/* Tasks */}
                {wp.tasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <div className="col-start-1 px-4 py-3 text-sm text-gray-700 border-t border-gray-200 pl-8">
                      {task.name}
                    </div>
                    <div className="col-start-2 border-l border-t border-gray-200 flex relative h-10">
                      {task.startDate && task.endDate && (
                        <div
                          className="absolute top-0 h-full bg-customBlue/10 border border-customBlue/40 rounded-md"
                          style={{
                            left: `${calculateOffset(parseISO(task.startDate), parseISO(startDate), months.length)}%`,
                            width: `${calculateWidth(parseISO(task.startDate), parseISO(task.endDate), parseISO(startDate), projectEndDate, months.length)}%`
                          }}
                        ></div>
                      )}
                      {months.map((_, index) => (
                        <div 
                          key={index} 
                          className="flex-shrink-0 w-20 border-r border-gray-200"
                        ></div>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions for timeline
function calculateOffset(itemStart: Date, projectStart: Date, totalMonths: number): number {
  const diffTime = Math.abs(itemStart.getTime() - projectStart.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const projectTotalDays = totalMonths * 30; // Approximation
  return (diffDays / projectTotalDays) * 100;
}

function calculateWidth(itemStart: Date, itemEnd: Date, projectStart: Date, projectEnd: Date, totalMonths: number): number {
  const itemDuration = Math.abs(itemEnd.getTime() - itemStart.getTime());
  const itemDays = Math.ceil(itemDuration / (1000 * 60 * 60 * 24));
  const projectTotalDays = totalMonths * 30; // Approximation
  return (itemDays / projectTotalDays) * 100;
}

const CreateProject = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });
  const [workPackages, setWorkPackages] = useState<WorkPackage[]>([]);
  const [selectedResource, setSelectedResource] = useState("");
  
  // Creating years and months for allocation view
  const allocationYears = [2024, 2025, 2026, 2027];
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const addWorkPackage = () => {
    setWorkPackages([
      ...workPackages,
      {
        id: Date.now().toString(),
        name: "",
        startDate: formData.startDate,
        endDate: formData.endDate,
        tasks: [],
      },
    ]);
  };

  const removeWorkPackage = (wpId: string) => {
    setWorkPackages(workPackages.filter((wp) => wp.id !== wpId));
  };

  const updateWorkPackage = (wpId: string, field: string, value: any) => {
    setWorkPackages(
      workPackages.map((wp) =>
        wp.id === wpId ? { ...wp, [field]: value } : wp
      )
    );
  };

  const addTask = (wpId: string) => {
    const wp = workPackages.find(w => w.id === wpId);
    
    setWorkPackages(
      workPackages.map((wp) =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: [
                ...wp.tasks,
                {
                  id: Date.now().toString(),
                  name: "",
                  description: "",
                  hasDeliverable: false,
                  startDate: wp.startDate,
                  endDate: wp.endDate,
                  resources: [],
                },
              ],
            }
          : wp
      )
    );
  };

  const removeTask = (wpId: string, taskId: string) => {
    setWorkPackages(
      workPackages.map((wp) =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: wp.tasks.filter((task) => task.id !== taskId),
            }
          : wp
      )
    );
  };

  const updateTask = (
    wpId: string,
    taskId: string,
    field: string,
    value: any
  ) => {
    setWorkPackages(
      workPackages.map((wp) =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: wp.tasks.map((task) =>
                task.id === taskId ? { ...task, [field]: value } : task
              ),
            }
          : wp
      )
    );
  };

  const addResourceToTask = (wpId: string, taskId: string) => {
    if (!selectedResource) return;
    
    const resource = availableResources.find(r => r === selectedResource);
    if (!resource) return;

    setWorkPackages(prev =>
      prev.map(wp =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: wp.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      resources: [...task.resources, resource],
                      allocations: {
                        ...(task.allocations || {}),
                        [resource]: {}
                      }
                    }
                  : task
              )
            }
          : wp
      )
    );
    setSelectedResource("");
  };

  const removeResourceFromTask = (wpId: string, taskId: string, resourceName: string) => {
    setWorkPackages(prev =>
      prev.map(wp =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: wp.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      resources: task.resources.filter(r => r !== resourceName),
                      allocations: (() => {
                        const newAllocations = { ...task.allocations };
                        if (newAllocations && newAllocations[resourceName]) {
                          delete newAllocations[resourceName];
                        }
                        return newAllocations;
                      })()
                    }
                  : task
              )
            }
          : wp
      )
    );
  };

  const handleAllocationChange = (wpId: string, taskId: string, resourceName: string, year: number, monthIndex: number, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 1) return;
    
    // Create a unique key for each month using year and month index
    const monthKey = `${year}-${monthIndex}`;
    
    setWorkPackages(prev =>
      prev.map(wp =>
        wp.id === wpId
          ? {
              ...wp,
              tasks: wp.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      allocations: {
                        ...(task.allocations || {}),
                        [resourceName]: {
                          ...(task.allocations?.[resourceName] || {}),
                          [monthKey]: numValue
                        }
                      }
                    }
                  : task
              )
            }
          : wp
      )
    );
  };

  const handleSubmit = () => {
    // Process and submit data
    const projectData = {
      ...formData,
      template: selectedTemplate,
      workPackages,
    };
    
    console.log("Submitting project:", projectData);
    // Here you would typically call an API to save the project
    
    // Navigate back to projects page
    navigate("/projects");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundingTemplates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border border-gray-200",
                  selectedTemplate === template.id &&
                    "ring-2 ring-customBlue shadow-md"
                )}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <template.icon className={cn("w-8 h-8", `text-${template.color}`)} />
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nome do Projeto
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                  placeholder="Ex: INOVC+"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[120px] border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                  placeholder="Descreva o objetivo do projeto..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-4">
                  <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Data de Início
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    Data de Fim
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                  Orçamento (€)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                  placeholder="Ex: 50000"
                />
              </div>
            </div>
            
            {/* Timeline preview for this step */}
            <TimelinePreview 
              workPackages={workPackages}
              startDate={formData.startDate}
              endDate={formData.endDate}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Workpackages</h3>
              <Button
                onClick={addWorkPackage}
                variant="outline"
                size="sm"
                className="rounded-md border-gray-200 text-customBlue hover:bg-customBlue/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Workpackage
              </Button>
            </div>
            <div className="space-y-6">
              {workPackages.map((wp) => (
                <Card
                  key={wp.id}
                  className="relative border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 text-red-500 hover:text-red-700"
                    onClick={() => removeWorkPackage(wp.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4">
                      <Label className="text-sm font-medium text-gray-700">
                        Nome do Pacote de Trabalho
                      </Label>
                      <Input
                        value={wp.name}
                        onChange={(e) =>
                          updateWorkPackage(wp.id, "name", e.target.value)
                        }
                        placeholder="Ex: WP1 - Análise de Requisitos"
                        className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-4">
                        <Label className="text-sm font-medium text-gray-700">
                          Data de Início
                        </Label>
                        <Input
                          type="date"
                          value={wp.startDate}
                          onChange={(e) =>
                            updateWorkPackage(wp.id, "startDate", e.target.value)
                          }
                          className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                        />
                      </div>
                      <div className="grid gap-4">
                        <Label className="text-sm font-medium text-gray-700">
                          Data de Fim
                        </Label>
                        <Input
                          type="date"
                          value={wp.endDate}
                          onChange={(e) =>
                            updateWorkPackage(wp.id, "endDate", e.target.value)
                          }
                          className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900">Tarefas</h4>
                      <Button
                        onClick={() => addTask(wp.id)}
                        variant="outline"
                        size="sm"
                        className="rounded-md border-gray-200 text-customBlue hover:bg-customBlue/10"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Tarefa
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {wp.tasks.map((task) => (
                        <Card
                          key={task.id}
                          className="border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-6 relative">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-4 top-4 text-red-500 hover:text-red-700"
                              onClick={() => removeTask(wp.id, task.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                            <div className="space-y-6">
                              <div className="grid gap-4">
                                <Label className="text-sm font-medium text-gray-700">
                                  Nome da Tarefa
                                </Label>
                                <Input
                                  value={task.name}
                                  onChange={(e) =>
                                    updateTask(wp.id, task.id, "name", e.target.value)
                                  }
                                  placeholder="Ex: Levantamento de requisitos"
                                  className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-4">
                                  <Label className="text-sm font-medium text-gray-700">
                                    Data de Início
                                  </Label>
                                  <Input
                                    type="date"
                                    value={task.startDate}
                                    onChange={(e) =>
                                      updateTask(wp.id, task.id, "startDate", e.target.value)
                                    }
                                    className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                                  />
                                </div>
                                <div className="grid gap-4">
                                  <Label className="text-sm font-medium text-gray-700">
                                    Data de Fim
                                  </Label>
                                  <Input
                                    type="date"
                                    value={task.endDate}
                                    onChange={(e) =>
                                      updateTask(wp.id, task.id, "endDate", e.target.value)
                                    }
                                    className="border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                                  />
                                </div>
                              </div>
                              <div className="grid gap-4">
                                <Label className="text-sm font-medium text-gray-700">
                                  Descrição
                                </Label>
                                <Textarea
                                  value={task.description}
                                  onChange={(e) =>
                                    updateTask(wp.id, task.id, "description", e.target.value)
                                  }
                                  className="min-h-[120px] border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                                  placeholder="Descreva a tarefa..."
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`deliverable-${task.id}`}
                                  checked={task.hasDeliverable}
                                  onCheckedChange={(checked) =>
                                    updateTask(wp.id, task.id, "hasDeliverable", checked)
                                  }
                                  className="border-gray-300"
                                />
                                <Label
                                  htmlFor={`deliverable-${task.id}`}
                                  className="text-sm text-gray-700"
                                >
                                  Requer entregável
                                </Label>
                              </div>
                              {task.hasDeliverable && (
                                <div className="grid gap-4">
                                  <Label className="text-sm font-medium text-gray-700">
                                    Descrição do Entregável
                                  </Label>
                                  <Textarea
                                    value={task.deliverableDescription}
                                    onChange={(e) =>
                                      updateTask(
                                        wp.id,
                                        task.id,
                                        "deliverableDescription",
                                        e.target.value
                                      )
                                    }
                                    className="min-h-[120px] border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
                                    placeholder="Descreva o entregável..."
                                  />
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Timeline preview for this step */}
            <TimelinePreview 
              workPackages={workPackages}
              startDate={formData.startDate}
              endDate={formData.endDate}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Recursos e Alocação</h3>
            {workPackages.map((wp) => (
              <Card key={wp.id} className="border border-gray-200 shadow-md rounded-xl">
                <div className="p-6 space-y-6">
                  <h4 className="font-semibold text-gray-900">{wp.name}</h4>
                  
                  {wp.tasks.map((task) => (
                    <div key={task.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-gray-700">{task.name}</h5>
                        <div className="flex items-center gap-2">
                          <Select
                            value={selectedResource}
                            onValueChange={setSelectedResource}
                          >
                            <SelectTrigger className="w-[280px]">
                              <SelectValue placeholder="Selecionar recurso" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableResources
                                .filter(r => !task.resources.includes(r))
                                .map((resource) => (
                                  <SelectItem key={resource} value={resource}>
                                    {resource}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addResourceToTask(wp.id, task.id)}
                            className="gap-2"
                          >
                            <Plus className="h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>
                      </div>

                      {/* Resources List */}
                      {task.resources.length > 0 && (
                        <Card className="border-gray-100">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {task.resources.map((resource) => (
                                <TableRow key={resource}>
                                  <TableCell>{resource}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeResourceFromTask(wp.id, task.id, resource)}
                                      className="text-red-500 hover:text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Card>
                      )}

                      {/* Resource Allocation - Horizontal Scrolling */}
                      {task.resources.length > 0 && (
                        <div className="space-y-6 pt-4">
                          <h6 className="text-sm font-medium text-gray-700">Alocação Mensal</h6>
                          
                          {task.resources.map((resource) => (
                            <div key={resource} className="bg-gray-50/50 p-4 rounded-lg space-y-4">
                              <p className="text-sm font-medium text-gray-700">{resource}</p>
                              
                              <div className="relative">
                                <div className="flex justify-between mb-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 rounded-full"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 rounded-full"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>

                                <ScrollArea className="w-full">
                                  <div className="flex space-x-4 pb-4 px-1">
                                    {allocationYears.map((year) => (
                                      <div key={year} className="space-y-2">
                                        <Badge variant="outline" className="bg-white font-semibold">
                                          {year}
                                        </Badge>
                                        <div className="flex space-x-4">
                                          {months.map((month, monthIndex) => (
                                            <div key={`${year}-${monthIndex}`} className="flex flex-col items-center space-y-1 min-w-16">
                                              <Label className="text-xs text-gray-500">
                                                {month}/{year.toString().substring(2)}
                                              </Label>
                                              <Input
                                                type="number"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                className="text-center h-9 w-14 text-sm"
                                                onChange={(e) => handleAllocationChange(
                                                  wp.id, 
                                                  task.id, 
                                                  resource, 
                                                  year, 
                                                  monthIndex, 
                                                  e.target.value
                                                )}
                                                value={
                                                  task.allocations?.[resource]?.[`${year}-${monthIndex}`] !== undefined
                                                    ? task.allocations[resource][`${year}-${monthIndex}`]
                                                    : ""
                                                }
                                              />
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            
            {/* Timeline preview for this step */}
            <TimelinePreview 
              workPackages={workPackages}
              startDate={formData.startDate}
              endDate={formData.endDate}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 p-0 hover:bg-transparent text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/projects")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar para projetos
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Projeto</h1>
        <p className="text-gray-600">Preencha os dados abaixo para criar um novo projeto</p>
      </div>

      <div className="flex items-center mb-8">
        <div className="flex items-center w-full max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div 
                className={`flex-1 relative rounded-full h-2 ${
                  stepNum <= step ? "bg-customBlue" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute -top-4 -left-4 h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNum <= step
                      ? "bg-customBlue text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
              </div>
              {stepNum < 4 && (
                <div
                  className={`h-[2px] w-8 ${
                    stepNum < step ? "bg-customBlue" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mb-8">{renderStep()}</div>

      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="px-6 py-3 bg-white border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        {step < 4 ? (
          <Button
            onClick={() => setStep(Math.min(4, step + 1))}
            className="px-6 py-3 bg-customBlue text-white rounded-xl hover:bg-customBlue/90"
          >
            Próximo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="px-6 py-3 bg-customBlue text-white rounded-xl hover:bg-customBlue/90"
          >
            Concluir
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
