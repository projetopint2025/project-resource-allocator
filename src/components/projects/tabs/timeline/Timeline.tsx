import { type WorkPackage, type Task, Resource } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { X, Trash, Plus, Check, Filter, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const availableResources = [
  { name: "Ana Silva", role: "Designer", profile: "Senior" },
  { name: "João Santos", role: "Desenvolvedor", profile: "Pleno" },
  { name: "Maria Costa", role: "Product Owner", profile: "Senior" },
];

interface TimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  onSelectTask: (task: Task) => void;
  selectedTask?: Task | null;
  onCloseTaskDetails: () => void;
}

export function Timeline({ workPackages, timelineYear, onSelectTask, selectedTask, onCloseTaskDetails }: TimelineProps) {
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const getTaskPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getFullYear() !== timelineYear || end.getFullYear() !== timelineYear) return null;
    
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    const duration = endMonth - startMonth + 1;
    
    return {
      gridColumnStart: startMonth + 1,
      gridColumnEnd: `span ${duration}`,
    };
  };

  return (
    <div className="flex h-full">
      <div className={cn(
        "flex-1 transition-all duration-300",
        selectedTask ? "mr-[800px]" : ""
      )}>
        <Card className="h-full border-none shadow-sm">
          <div className="relative h-full flex flex-col">
            <div className="sticky top-0 bg-white z-10 p-4 pb-0 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium text-gray-900">Timeline do Projeto</h2>
                  <Badge variant="outline" className="text-xs">
                    {timelineYear}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filtrar</span>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Todas as tarefas</DropdownMenuItem>
                      <DropdownMenuItem>Tarefas em progresso</DropdownMenuItem>
                      <DropdownMenuItem>Tarefas concluídas</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{timelineYear}</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 pb-3">
                {months.map((month) => (
                  <div key={month} className="text-sm font-medium text-gray-500 text-center">
                    {month}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-6 pt-4">
                {workPackages.map((wp) => (
                  <div key={wp.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{wp.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {wp.tasks.length} {wp.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                      </Badge>
                      <div className="h-[1px] flex-1 bg-gray-200"></div>
                    </div>
                    <div className="space-y-1">
                      {wp.tasks.map((task) => {
                        const position = getTaskPosition(task.startDate, task.endDate);
                        if (!position) return null;
                        
                        return (
                          <div key={task.id} className="relative grid grid-cols-12 gap-4 items-center group hover:bg-customBlue/5 py-1 rounded-lg transition-colors">
                            <div
                              className="col-span-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-customBlue transition-colors"
                              onClick={() => onSelectTask(task)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="hover:underline line-clamp-1">{task.name}</span>
                                <Badge variant="outline" className={cn(
                                  'text-xs whitespace-nowrap',
                                  task.status === 'completed' ? 
                                    'border-green-500 text-green-700 bg-green-50' :
                                    'border-customBlue text-customBlue bg-customBlue/5'
                                )}>
                                  {task.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                                </Badge>
                              </div>
                            </div>
                            <div className="col-span-9 relative h-10">
                              <div
                                className={cn(
                                  "absolute h-7 rounded-md border-2 transition-all duration-200",
                                  task.status === 'completed' ? 
                                    'bg-green-500/20 border-green-500' :
                                    'bg-customBlue/20 border-customBlue',
                                  "top-1/2 -translate-y-1/2 shadow-sm"
                                )}
                                style={{
                                  left: `${((position.gridColumnStart - 1) / 12) * 100}%`,
                                  width: `${(parseInt(position.gridColumnEnd.split(' ')[1]) / 12) * 100}%`,
                                  minWidth: '60px'
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {selectedTask && (
        <div className="fixed top-0 right-0 w-[800px] h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
          <div className="bg-white border-b p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900">{selectedTask.name}</h2>
                <Badge variant="outline" className={cn(
                  'text-xs',
                  selectedTask.status === 'completed' ? 
                    'border-green-500 text-green-700 bg-green-50' :
                    'border-customBlue text-customBlue bg-customBlue/5'
                )}>
                  {selectedTask.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {}}
                  className="border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Marcar como Concluída
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCloseTaskDetails}
                  className="hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Fundamentação</h3>
              <p className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedTask.rationale}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Recursos Humanos</h3>
                <Select onValueChange={(resourceName) => {}}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Adicionar colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableResources.map((resource) => (
                      <SelectItem key={resource.name} value={resource.name}>
                        {resource.name} - {resource.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Nome</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.resources?.map((resource, index) => (
                      <TableRow key={resource.name}>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.profile}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {}}
                            className="hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-gray-600">Alocação Mensal</h3>
              {selectedTask.resources?.map((resource, resourceIndex) => (
                <div key={resource.name} className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-3 text-gray-900">{resource.name}</p>
                  <div className="grid grid-cols-6 gap-2">
                    {resource.allocation?.map((value, monthIndex) => (
                      <div key={monthIndex} className="text-center">
                        <p className="text-xs mb-1 text-gray-600">
                          {months[monthIndex]}
                        </p>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={value}
                          onChange={(e) => {}}
                          className="w-full p-2 text-sm bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">Materiais</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {}}
                  className="border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Nome</TableHead>
                      <TableHead>Unidades</TableHead>
                      <TableHead>Preço Unitário</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.materials?.map((material, index) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <Input
                            type="text"
                            value={material.name}
                            onChange={(e) => {}}
                            className="bg-transparent"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={material.units}
                            onChange={(e) => {}}
                            className="bg-transparent"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={material.unitPrice}
                            onChange={(e) => {}}
                            className="bg-transparent"
                          />
                        </TableCell>
                        <TableCell>
                          € {material.units * material.unitPrice}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {}}
                            className="hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell>
                        € {selectedTask.materials?.reduce((acc, material) => acc + (material.units * material.unitPrice), 0) || 0}
                      </TableCell>
                      <TableCell />
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
} 