import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarClock, Users, LineChart, DollarSign, ArrowLeft, Download, FileText, Calendar, Clock, ChevronRight, Search } from "lucide-react";
import { type Project, type Task, TaskStatus, TaskType } from "@/types/project";
import { TaskSidebar } from "@/components/projects/tasks/TaskSidebar";
import { Timeline } from "@/components/projects/Timeline";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";

const mockProject: Project = {
  id: 1,
  name: "INOVC+",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
  status: "pending",
  progress: 45,
  startDate: "2026-01-01",
  endDate: "2026-12-31",
  fundingType: "Horizonte Europa",
  fundingDetails: {},
  workPackages: [
    {
      id: 1,
      name: "WP1 - Análise de Requisitos",
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      status: "in-progress",
      tasks: [
        {
          id: 1,
          name: "Levantamento de requisitos",
          type: "research" as TaskType,
          status: "completed",
          startDate: "2026-01-01",
          endDate: "2026-01-15",
          description: "Identificar as necessidades dos stakeholders",
          assignedTo: "João Silva",
          rationale: "Identificar as necessidades dos stakeholders e definir os aspetos fundamentais do projeto",
          resources: [
            {
              id: 1,
              name: "Ana Silva",
              role: "Designer",
              profile: "Senior",
              joinDate: "2021-03-15",
              allocation: [0.5, 0.7, 0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              id: 9,
              name: "Maria Santos",
              role: "Product Owner",
              profile: "Senior",
              joinDate: "2020-02-10",
              allocation: [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
        {
          id: 2,
          name: "Validação com stakeholders",
          type: "management" as TaskType,
          status: "pending",
          startDate: "2026-01-16",
          endDate: "2026-01-31",
          description: "Validar requisitos com stakeholders",
          assignedTo: "Maria Santos",
          rationale: "Garantir que os requisitos levantados atendem às necessidades do negócio",
          resources: [
            {
              id: 2,
              name: "João Santos",
              role: "Desenvolvedor",
              profile: "Pleno",
              joinDate: "2020-06-01",
              allocation: [0, 0.4, 0.6, 0.2, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
      ],
    },
    {
      id: 2,
      name: "WP2 - Desenvolvimento",
      startDate: "2026-02-01",
      endDate: "2026-03-15",
      status: "in-progress",
      tasks: [
        {
          id: 3,
          name: "Implementação do backend",
          type: "development" as TaskType,
          status: "pending",
          startDate: "2026-02-01",
          endDate: "2026-03-15",
          description: "Desenvolver a API e serviços necessários",
          assignedTo: "Pedro Costa",
          rationale: "Desenvolver a API e serviços necessários",
          resources: [
            {
              id: 3,
              name: "Maria Costa",
              role: "Product Owner",
              profile: "Senior",
              joinDate: "2019-01-10",
              allocation: [0, 0, 0.6, 0.8, 0.7, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
      ],
    },
    {
      id: 3,
      name: "WP3 - Testes e Qualidade",
      startDate: "2026-03-16",
      endDate: "2026-05-15",
      status: "in-progress",
      tasks: [
        {
          id: 4,
          name: "Testes unitários",
          type: "testing" as TaskType,
          status: "pending",
          startDate: "2026-03-16",
          endDate: "2026-04-15",
          description: "Implementar testes unitários para todos os componentes",
          assignedTo: "Ana Oliveira",
          rationale: "Garantir a qualidade e robustez do código",
          resources: [
            {
              id: 4,
              name: "Pedro Oliveira",
              role: "Desenvolvedor Backend",
              profile: "Junior",
              joinDate: "2022-02-15",
              allocation: [0, 0, 0, 0, 0, 0.5, 0.7, 0.6, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
        {
          id: 5,
          name: "Testes de integração",
          type: "testing" as TaskType,
          status: "pending",
          startDate: "2026-04-16",
          endDate: "2026-05-15",
          description: "Realizar testes de integração entre componentes",
          assignedTo: "Ana Oliveira",
          rationale: "Verificar o funcionamento correto da integração entre componentes",
          resources: [
            {
              id: 5,
              name: "Sofia Martins",
              role: "Analista de Dados",
              profile: "Pleno",
              joinDate: "2021-11-05",
              allocation: [0, 0, 0, 0, 0, 0, 0.4, 0.6, 0.3, 0, 0, 0],
            },
          ],
          materials: [],
        },
      ],
    },
    {
      id: 4,
      name: "WP4 - Documentação e Treinamento",
      startDate: "2026-05-16",
      endDate: "2026-07-15",
      status: "in-progress",
      tasks: [
        {
          id: 6,
          name: "Documentação técnica",
          type: "documentation" as TaskType,
          status: "pending",
          startDate: "2026-05-16",
          endDate: "2026-06-15",
          description: "Criar documentação técnica do sistema",
          assignedTo: "Carlos Mendes",
          rationale: "Facilitar a manutenção e evolução do sistema",
          resources: [
            {
              id: 6,
              name: "Carlos Mendes",
              role: "Arquiteto de Software",
              profile: "Senior",
              joinDate: "2018-05-20",
              allocation: [0.3, 0.5, 0.7, 0.4, 0.2, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
          materials: [],
        },
        {
          id: 7,
          name: "Treinamento da equipa",
          type: "documentation" as TaskType,
          status: "pending",
          startDate: "2026-06-16",
          endDate: "2026-07-15",
          description: "Realizar treinamento da equipa no novo sistema",
          assignedTo: "Carlos Mendes",
          rationale: "Capacitar a equipa para utilizar o sistema de forma eficiente",
          resources: [
            {
              id: 7,
              name: "Luísa Ferreira",
              role: "Tester",
              profile: "Pleno",
              joinDate: "2020-09-10",
              allocation: [0, 0, 0, 0, 0, 0, 0, 0.5, 0.7, 0.8, 0, 0],
            },
            {
              id: 8,
              name: "Carlos Mendes",
              role: "Technical Writer",
              profile: "Mid",
              joinDate: "2019-04-15",
              allocation: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
  const [activeTab, setActiveTab] = useState("timeline");

  const handleUpdateTask = (updatedTask: Task) => {
    console.log("Task updated:", updatedTask);
  };
  
  // Calcular estatísticas do projeto
  const totalTasks = mockProject.workPackages.reduce(
    (acc, wp) => acc + wp.tasks.length, 0
  );
  
  const completedTasks = mockProject.workPackages.reduce(
    (acc, wp) => acc + wp.tasks.filter(task => task.status === "completed").length, 0
  );
  
  const pendingTasks = totalTasks - completedTasks;
  
  const resources = mockProject.workPackages.flatMap(wp => 
    wp.tasks.flatMap(task => task.resources)
  );
  
  const uniqueResourceIds = new Set(resources.map(r => r.id));
  const teamSize = uniqueResourceIds.size;
  
  // Calcular duração em meses
  const startDate = new Date(mockProject.startDate);
  const endDate = new Date(mockProject.endDate);
  const durationInMonths = 
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
    (endDate.getMonth() - startDate.getMonth());

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Header com info básica */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {/* Lado esquerdo - Informações principais */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full glass-bg hover:bg-white/70 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 hover:text-customBlue transition-colors duration-300 ease-in-out" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">{mockProject.name}</h1>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      mockProject.status === "completed" 
                        ? "bg-emerald-50/70 text-emerald-600 border-emerald-200 backdrop-blur-sm shadow-sm"
                        : mockProject.status === "pending"
                        ? "bg-amber-50/70 text-amber-600 border-amber-200 backdrop-blur-sm shadow-sm"
                        : "bg-blue-50/70 text-customBlue border-blue-200 backdrop-blur-sm shadow-sm"
                    )}
                  >
                    {mockProject.status === "completed" 
                      ? "Concluído" 
                      : mockProject.status === "pending" 
                      ? "Pendente"
                      : "Em Progresso"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1 max-w-2xl">{mockProject.description}</p>
              </div>
            </div>
          </div>

          {/* Lado direito - Pesquisa e botões */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 justify-end">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pesquisar tarefas..."
                  className="w-64 pl-10 pr-4 py-2 rounded-full border-gray-200 bg-white/70 shadow-md focus:ring-2 focus:ring-customBlue/20 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                />
              </div>
              <NotificationsPopover />
              <Button className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Estatísticas do Projeto */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Work Packages */}
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-100/80">
                <FileText className="h-5 w-5 text-customBlue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Work Packages</p>
                <p className="text-2xl font-semibold">{mockProject.workPackages.length}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Card Tarefas */}
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-100/80">
                <CalendarClock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tarefas</p>
                <p className="text-2xl font-semibold">{totalTasks}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                    {completedTasks} Concluídas
                  </span>
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>
                    {pendingTasks} Pendentes
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Card Período */}
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-100/80">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Período</p>
                <p className="text-base font-semibold">
                  {new Date(mockProject.startDate).toLocaleDateString('pt')} - {new Date(mockProject.endDate).toLocaleDateString('pt')}
                </p>
                <p className="text-xs text-gray-500">{durationInMonths} meses</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Card Progresso */}
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px] rounded-2xl">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-emerald-100/80">
                <LineChart className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500">Progresso</p>
                  <p className="font-semibold">{mockProject.progress}%</p>
                </div>
                <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-customBlue to-emerald-500 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${mockProject.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
                    {completedTasks} Concluídas
                  </span>
                  <span className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>
                    {pendingTasks} Pendentes
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="glass-bg p-1 h-auto border border-white/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
              <TabsTrigger 
                value="timeline" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white/70 data-[state=active]:backdrop-blur-md transition-all duration-300 ease-in-out",
                  activeTab === "timeline" ? "text-customBlue shadow-sm" : "text-gray-600 hover:text-customBlue hover:bg-white/40"
                )}
              >
                <CalendarClock className="h-4 w-4" />
                <span>Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="overview" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white/70 data-[state=active]:backdrop-blur-md transition-all duration-300 ease-in-out",
                  activeTab === "overview" ? "text-customBlue shadow-sm" : "text-gray-600 hover:text-customBlue hover:bg-white/40"
                )}
              >
                <FileText className="h-4 w-4" />
                <span>Visão Geral</span>
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white/70 data-[state=active]:backdrop-blur-md transition-all duration-300 ease-in-out",
                  activeTab === "resources" ? "text-customBlue shadow-sm" : "text-gray-600 hover:text-customBlue hover:bg-white/40"
                )}
              >
                <Users className="h-4 w-4" />
                <span>Recursos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="finances" 
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white/70 data-[state=active]:backdrop-blur-md transition-all duration-300 ease-in-out",
                  activeTab === "finances" ? "text-customBlue shadow-sm" : "text-gray-600 hover:text-customBlue hover:bg-white/40"
                )}
              >
                <DollarSign className="h-4 w-4" />
                <span>Finanças</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="timeline" className="focus-visible:outline-none mt-4">
            <Card className="glass-card border-white/20 shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out">
              <div className="h-[500px]">
                <Timeline 
                  workPackages={mockProject.workPackages}
                  timelineYear={2026}
                  onSelectTask={setSelectedTask}
                />
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="overview" className="focus-visible:outline-none mt-4">
            <Card className="glass-card border-white/20 shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out">
              <CardHeader className="border-b border-white/10 px-6 py-4 sticky top-0 bg-white/70 backdrop-blur-sm z-10 shadow-sm">
                <CardTitle className="text-lg font-semibold text-gray-900">Detalhes do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto h-[440px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Informações Gerais</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Data de Início</p>
                        <p className="font-medium">{new Date(mockProject.startDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Data de Fim</p>
                        <p className="font-medium">{new Date(mockProject.endDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duração</p>
                        <p className="font-medium">{durationInMonths} meses</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Financiamento</p>
                        <p className="font-medium">{mockProject.fundingType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Equipa</h3>
                    <div>
                      <p className="text-sm text-gray-500">Número de Membros</p>
                      <p className="font-medium">{teamSize}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Progresso</h3>
                    <div>
                      <p className="text-sm text-gray-500">Tarefas Concluídas</p>
                      <p className="font-medium">{completedTasks} de {totalTasks}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="focus-visible:outline-none mt-4">
            <Card className="glass-card border-white/20 shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out">
              <CardHeader className="border-b border-white/10 px-6 py-4 sticky top-0 bg-white/70 backdrop-blur-sm z-10 shadow-sm">
                <CardTitle className="text-lg font-semibold text-gray-900">Recursos</CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto h-[440px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {/* Lista de recursos únicos */}
                  {Array.from(uniqueResourceIds).map(id => {
                    const resource = resources.find(r => r.id === id);
                    if (!resource) return null;
                    
                    return (
                      <Card key={id} className="glass-card border-white/20 p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg rounded-xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{resource.name}</h3>
                            <p className="text-sm text-gray-500">{resource.role}</p>
                            <p className="text-xs text-gray-400">Desde {new Date(resource.joinDate).toLocaleDateString('pt-BR')}</p>
                          </div>
                          <Badge className="bg-blue-50/70 text-customBlue border-blue-200 backdrop-blur-sm shadow-sm">
                            {resource.profile}
                          </Badge>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="finances" className="focus-visible:outline-none mt-4">
            <Card className="glass-card border-white/20 shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out">
              <CardHeader className="border-b border-white/10 px-6 py-4 sticky top-0 bg-white/70 backdrop-blur-sm z-10 shadow-sm">
                <CardTitle className="text-lg font-semibold text-gray-900">Finanças</CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto h-[440px]">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Tipo de Financiamento: <span className="font-medium">{mockProject.fundingType}</span></p>
                  <p>Informações detalhadas sobre o financiamento do projeto serão exibidas aqui.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Sidebar para tarefas selecionadas */}
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