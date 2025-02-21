
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "lucide-react";

interface WorkPackage {
  id: string;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  name: string;
  description: string;
  hasDeliverable: boolean;
  deliverableDescription?: string;
  resources: string[];
}

const fundingTemplates = [
  {
    id: "pt2030",
    name: "Portugal 2030",
    icon: EuroIcon,
    description: "Programas de financiamento do quadro Portugal 2030.",
    color: "blue"
  },
  {
    id: "horizon",
    name: "Horizonte Europa",
    icon: EuroIcon,
    description: "Programa-quadro de investigação e inovação da UE.",
    color: "yellow"
  },
  {
    id: "norte2030",
    name: "Norte 2030",
    icon: EuroIcon,
    description: "Programa Operacional Regional do Norte 2030.",
    color: "red"
  }
];

const availableResources = [
  "João Silva",
  "Maria Santos",
  "Pedro Costa",
  "Ana Pereira",
  "Rui Almeida"
];

interface ProjectTemplateWizardProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ProjectTemplateWizard({ onClose, onSubmit }: ProjectTemplateWizardProps) {
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

  const addWorkPackage = () => {
    setWorkPackages([
      ...workPackages,
      {
        id: Date.now().toString(),
        name: "",
        tasks: []
      }
    ]);
  };

  const removeWorkPackage = (wpId: string) => {
    setWorkPackages(workPackages.filter(wp => wp.id !== wpId));
  };

  const updateWorkPackage = (wpId: string, field: string, value: any) => {
    setWorkPackages(workPackages.map(wp => 
      wp.id === wpId ? { ...wp, [field]: value } : wp
    ));
  };

  const addTask = (wpId: string) => {
    setWorkPackages(workPackages.map(wp => 
      wp.id === wpId ? {
        ...wp,
        tasks: [
          ...wp.tasks,
          {
            id: Date.now().toString(),
            name: "",
            description: "",
            hasDeliverable: false,
            resources: []
          }
        ]
      } : wp
    ));
  };

  const removeTask = (wpId: string, taskId: string) => {
    setWorkPackages(workPackages.map(wp => 
      wp.id === wpId ? {
        ...wp,
        tasks: wp.tasks.filter(task => task.id !== taskId)
      } : wp
    ));
  };

  const updateTask = (wpId: string, taskId: string, field: string, value: any) => {
    setWorkPackages(workPackages.map(wp => 
      wp.id === wpId ? {
        ...wp,
        tasks: wp.tasks.map(task => 
          task.id === taskId ? { ...task, [field]: value } : task
        )
      } : wp
    ));
  };

  const handleNext = () => {
    if (step === 1 && !selectedTemplate) return;
    if (step === 4) {
      // Validar se todas as tarefas têm recursos atribuídos
      const allTasksHaveResources = workPackages.every(wp => 
        wp.tasks.every(task => task.resources.length > 0)
      );
      
      if (!allTasksHaveResources) {
        alert("Todas as tarefas devem ter pelo menos um recurso atribuído.");
        return;
      }
      
      onSubmit({
        ...formData,
        template: selectedTemplate,
        workPackages
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onClose();
      return;
    }
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fundingTemplates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105",
                  selectedTemplate === template.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <template.icon className={cn(
                    "w-8 h-8 mb-2",
                    `text-${template.color}-500`
                  )} />
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Projeto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Data de Fim</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Orçamento (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Pacotes de Trabalho</h3>
              <Button onClick={addWorkPackage} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Pacote
              </Button>
            </div>
            <div className="space-y-6">
              {workPackages.map((wp) => (
                <Card key={wp.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                    onClick={() => removeWorkPackage(wp.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                  <CardHeader>
                    <div className="grid gap-2">
                      <Label>Nome do Pacote de Trabalho</Label>
                      <Input
                        value={wp.name}
                        onChange={(e) => updateWorkPackage(wp.id, 'name', e.target.value)}
                        placeholder="Ex: WP1 - Análise de Requisitos"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Tarefas</h4>
                      <Button
                        onClick={() => addTask(wp.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Tarefa
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {wp.tasks.map((task) => (
                        <Card key={task.id}>
                          <CardContent className="pt-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-2 text-red-500 hover:text-red-700"
                              onClick={() => removeTask(wp.id, task.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                            <div className="space-y-4">
                              <div className="grid gap-2">
                                <Label>Nome da Tarefa</Label>
                                <Input
                                  value={task.name}
                                  onChange={(e) => updateTask(wp.id, task.id, 'name', e.target.value)}
                                  placeholder="Ex: Levantamento de requisitos"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Descrição</Label>
                                <Textarea
                                  value={task.description}
                                  onChange={(e) => updateTask(wp.id, task.id, 'description', e.target.value)}
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`deliverable-${task.id}`}
                                  checked={task.hasDeliverable}
                                  onCheckedChange={(checked) => 
                                    updateTask(wp.id, task.id, 'hasDeliverable', checked)
                                  }
                                />
                                <Label htmlFor={`deliverable-${task.id}`}>
                                  Requer entregável
                                </Label>
                              </div>
                              {task.hasDeliverable && (
                                <div className="grid gap-2">
                                  <Label>Descrição do Entregável</Label>
                                  <Textarea
                                    value={task.deliverableDescription}
                                    onChange={(e) => updateTask(wp.id, task.id, 'deliverableDescription', e.target.value)}
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
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Atribuição de Recursos</h3>
            {workPackages.map((wp) => (
              <Card key={wp.id}>
                <CardHeader>
                  <CardTitle>{wp.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {wp.tasks.map((task) => (
                    <div key={task.id} className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <ListTodo className="w-4 h-4" />
                        {task.name}
                      </Label>
                      <Select
                        value={task.resources.join(',')}
                        onValueChange={(value) => updateTask(wp.id, task.id, 'resources', value.split(',').filter(Boolean))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione os recursos..." />
                        </SelectTrigger>
                        <SelectContent>
                          {availableResources.map((resource) => (
                            <SelectItem key={resource} value={resource}>
                              {resource}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {task.resources.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {task.resources.map((resource) => (
                            <div
                              key={resource}
                              className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                            >
                              <Users className="w-3 h-3" />
                              {resource}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {step === 1 && "Tipo de Financiamento"}
          {step === 2 && "Informações Básicas"}
          {step === 3 && "Estrutura do Projeto"}
          {step === 4 && "Atribuição de Recursos"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Selecione o tipo de financiamento do projeto"}
          {step === 2 && "Preencha as informações básicas do projeto"}
          {step === 3 && "Defina os pacotes de trabalho e tarefas"}
          {step === 4 && "Atribua recursos às tarefas"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        <Button onClick={handleNext}>
          {step === 4 ? "Criar Projeto" : "Próximo"}
        </Button>
      </CardFooter>
    </Card>
  );
}
