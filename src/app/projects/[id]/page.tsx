import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/projects/tabs/timeline/Timeline";
import { Overview } from "@/components/projects/tabs/overview/Overview";
import { Resources } from "@/components/projects/tabs/resources/Resources";
import { Budget } from "@/components/projects/tabs/budget/Budget";
import { mockProject, mockWorkPackages, mockResources, mockBudget } from "@/data/mockData";
import { Task } from "@/types/project";
import { CalendarClock, Users, LineChart, DollarSign, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ProjectPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  // Calculate project progress
  const totalTasks = mockWorkPackages.reduce((acc, wp) => acc + wp.tasks.length, 0);
  const completedTasks = mockWorkPackages.reduce((acc, wp) => {
    return acc + wp.tasks.filter(task => task.status === 'completed').length;
  }, 0);
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{mockProject.name}</h1>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Progresso</p>
                <div className="flex items-center gap-3">
                  <Progress value={progressPercentage} className="w-32 h-2" />
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Início</p>
                <p className="text-sm font-medium">{mockProject.startDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Término</p>
                <p className="text-sm font-medium">{mockProject.endDate}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Exportar</Button>
              <Button size="sm">Editar Projeto</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="bg-white border p-1 h-auto">
            <TabsTrigger value="timeline" className="flex items-center gap-2 py-2 px-4">
              <CalendarClock className="h-4 w-4" />
              <span>Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2 py-2 px-4">
              <LineChart className="h-4 w-4" />
              <span>Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 py-2 px-4">
              <Users className="h-4 w-4" />
              <span>Recursos</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2 py-2 px-4">
              <DollarSign className="h-4 w-4" />
              <span>Orçamento</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="h-[calc(100vh-16rem)]">
            <Timeline
              workPackages={mockWorkPackages}
              timelineYear={2024}
              onSelectTask={handleSelectTask}
              selectedTask={selectedTask}
              onCloseTaskDetails={() => setSelectedTask(null)}
            />
          </TabsContent>

          <TabsContent value="overview" className="h-[calc(100vh-16rem)]">
            <Overview project={mockProject} />
          </TabsContent>

          <TabsContent value="resources" className="h-[calc(100vh-16rem)]">
            <Resources resources={mockResources} />
          </TabsContent>

          <TabsContent value="budget" className="h-[calc(100vh-16rem)]">
            <Budget budget={mockBudget} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 