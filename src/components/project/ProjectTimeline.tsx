import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ListChecks, 
  Users,
  BarChart3,
  Filter,
  Search,
  AlertCircle
} from "lucide-react";
import { type WorkPackage } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface ProjectTimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  onSelectTask: (task: any) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function ProjectTimeline({
  workPackages,
  timelineYear,
  setTimelineYear,
  onSelectTask,
  currentPage,
  pageCount,
  onPageChange,
}: ProjectTimelineProps) {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const getTaskPosition = (startDate: string) => {
    const date = new Date(startDate);
    const monthPosition = date.getMonth();
    const dayPosition = date.getDate() / 30; // Normalize days to a 0-1 position within month
    return monthPosition + dayPosition;
  };

  const getTaskDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays / 365) * 12; // Convert days to months
  };

  const getTaskStatus = (task: any) => {
    // Mock status based on dates for demonstration
    const now = new Date();
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    
    if (endDate < now) return 'completed';
    if (startDate <= now && endDate >= now) return 'in-progress';
    return 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500';
      case 'in-progress':
        return 'bg-blue-500/20 border-blue-500';
      default:
        return 'bg-gray-500/20 border-gray-500';
    }
  };

  const totalTasks = workPackages.reduce((acc, wp) => acc + wp.tasks.length, 0);
  const completedTasks = workPackages.reduce((acc, wp) => 
    acc + wp.tasks.filter((task: any) => task.status === 'completed').length, 0
  );
  const inProgressTasks = workPackages.reduce((acc, wp) => 
    acc + wp.tasks.filter((task: any) => task.status === 'in-progress').length, 0
  );

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setSheetOpen(true);
    onSelectTask(task);
  };

  const filteredWorkPackages = workPackages.map(wp => ({
    ...wp,
    tasks: wp.tasks.filter(task => {
      const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || getTaskStatus(task) === statusFilter;
      return matchesSearch && matchesStatus;
    })
  })).filter(wp => wp.tasks.length > 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-2">
              <div className="p-2 w-fit rounded-lg bg-blue-100/50 ring-1 ring-blue-500/10">
                <ListChecks className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              <p className="text-sm font-medium text-gray-500">Total de Tarefas</p>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-2">
              <div className="p-2 w-fit rounded-lg bg-green-100/50 ring-1 ring-green-500/10">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
              <p className="text-sm font-medium text-gray-500">Em Progresso</p>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-2">
              <div className="p-2 w-fit rounded-lg bg-purple-100/50 ring-1 ring-purple-500/10">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              <p className="text-sm font-medium text-gray-500">Concluídas</p>
            </div>
          </Card>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col gap-2">
              <div className="p-2 w-fit rounded-lg bg-yellow-100/50 ring-1 ring-yellow-500/10">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </p>
              <p className="text-sm font-medium text-gray-500">Taxa Conclusão</p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Progresso do Projeto</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tarefas Concluídas</span>
                <span className="font-medium text-gray-700">{completedTasks}/{totalTasks}</span>
              </div>
              <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Em Progresso</span>
                <span className="font-medium text-gray-700">{inProgressTasks}/{totalTasks}</span>
              </div>
              <Progress value={(inProgressTasks / totalTasks) * 100} className="h-2" />
            </div>
            <div className="pt-4 border-t">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                  <p className="text-xs text-gray-500">Concluídas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
                  <p className="text-xs text-gray-500">Em Andamento</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {totalTasks - completedTasks - inProgressTasks}
                  </p>
                  <p className="text-xs text-gray-500">Pendentes</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-lg border">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTimelineYear(timelineYear - 1)}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold text-lg text-gray-700 min-w-[4rem] text-center">{timelineYear}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTimelineYear(timelineYear + 1)}
            className="hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
              <SelectItem value="in-progress">Em Progresso</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-700">
              {currentPage}/{pageCount}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === pageCount}
              onClick={() => onPageChange(currentPage + 1)}
              className="hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-auto max-h-[calc(100vh-24rem)]">
        <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
          <div className="relative">
            <div className="sticky top-0 bg-white z-10 grid grid-cols-12 gap-4 mb-8 pb-4 border-b px-6 pt-4">
              {months.map((month) => (
                <div key={month} className="text-sm font-medium text-gray-500 text-center">
                  {month}
                </div>
              ))}
            </div>

            <div className="px-6 pb-4">
              {filteredWorkPackages.length > 0 ? (
                <div className="space-y-8">
                  {filteredWorkPackages.map((wp) => (
                    <div key={wp.id} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg text-gray-900">{wp.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {wp.tasks.length} {wp.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                        </Badge>
                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                      </div>
                      <div className="space-y-6">
                        {wp.tasks.map((task: any) => {
                          const status = getTaskStatus(task);
                          const statusColor = getStatusColor(status);
                          
                          return (
                            <div key={task.id} className="relative grid grid-cols-12 gap-4 items-center group hover:bg-gray-50/50 p-2 rounded-lg transition-colors">
                              <div
                                className="col-span-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => handleTaskClick(task)}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="hover:underline line-clamp-1">{task.name}</span>
                                  <Badge variant="outline" className={cn(
                                    'text-xs whitespace-nowrap',
                                    status === 'completed' && 'border-green-500 text-green-700 bg-green-50',
                                    status === 'in-progress' && 'border-blue-500 text-blue-700 bg-blue-50',
                                    status === 'pending' && 'border-gray-500 text-gray-700 bg-gray-50'
                                  )}>
                                    {status === 'completed' ? 'Concluído' : 
                                     status === 'in-progress' ? 'Em Progresso' : 
                                     'Pendente'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="col-span-9 relative h-16">
                                <div
                                  className={cn(
                                    "absolute h-10 rounded-lg border-2 transition-all duration-200",
                                    statusColor,
                                    "top-1/2 -translate-y-1/2 shadow-sm"
                                  )}
                                  style={{
                                    left: `${(getTaskPosition(task.startDate) / 12) * 100}%`,
                                    width: `${(getTaskDuration(task.startDate, task.endDate) / 12) * 100}%`,
                                    minWidth: '60px'
                                  }}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                    <span className="px-2 truncate">
                                      {new Date(task.startDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - 
                                      {new Date(task.endDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
                  <p className="text-gray-500">
                    Tente ajustar seus filtros ou critérios de busca
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          {selectedTask && (
            <>
              <SheetHeader className="space-y-4">
                <SheetTitle className="text-xl font-semibold">{selectedTask.name}</SheetTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      'px-3 py-1',
                      selectedTask.status === 'completed' && 'bg-green-50 text-green-700 border-green-200',
                      selectedTask.status === 'in-progress' && 'bg-blue-50 text-blue-700 border-blue-200',
                      selectedTask.status === 'pending' && 'bg-gray-50 text-gray-700 border-gray-200'
                    )}
                  >
                    {selectedTask.status === 'completed' ? 'Concluído' : 
                     selectedTask.status === 'in-progress' ? 'Em Progresso' : 
                     'Pendente'}
                  </Badge>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Data Início</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarDays className="h-4 w-4" />
                      <p className="text-sm">{new Date(selectedTask.startDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Data Fim</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CalendarDays className="h-4 w-4" />
                      <p className="text-sm">{new Date(selectedTask.endDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>
                {selectedTask.description && (
                  <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500">Descrição</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{selectedTask.description}</p>
                  </div>
                )}
                {selectedTask.assignedTo && (
                  <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-500">Responsável</p>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <p className="text-sm text-gray-700">{selectedTask.assignedTo}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
