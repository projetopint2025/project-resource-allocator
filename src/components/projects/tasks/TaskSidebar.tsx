
import { useState, useEffect, useRef } from "react";
import {
  type Task,
  type Resource,
  type TaskStatus,
} from "@/types/project";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Users,
  Trash2,
  Plus,
  Check,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TaskSidebarProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onMarkCompleted?: (taskId: number) => void;
}

// Simular lista de recursos disponíveis com IDs numéricos
const availableResources = [
  { id: 1, name: "João Silva", role: "Developer", profile: "Senior" },
  { id: 2, name: "Maria Santos", role: "Designer", profile: "Mid-level" },
  { id: 3, name: "Pedro Costa", role: "Analyst", profile: "Junior" },
];

export function TaskSidebar({
  task: initialTask,
  open,
  onClose,
  onUpdate,
  onMarkCompleted,
}: TaskSidebarProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano selecionável
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.blur(); // Remove o foco do input quando o menu abre
    }
  }, [open]);

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleUpdateTask = (updates: Partial<Task>) => {
    const updatedTask = { ...task, ...updates };
    setTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleAddResource = () => {
    if (selectedResource) {
      const resourceToAdd = availableResources.find(
        (r) => r.id === selectedResource
      );
      if (resourceToAdd) {
        // Adiciona um recurso com todas as propriedades necessárias
        const newResource: Resource = {
          id: resourceToAdd.id,
          name: resourceToAdd.name,
          role: resourceToAdd.role,
          profile: resourceToAdd.profile,
          joinDate: new Date().toISOString(),
          allocation: Array(12).fill(0),
        };
        
        handleUpdateTask({
          resources: [...task.resources, newResource],
        });
        
        setSelectedResource(null);
      }
    }
  };

  const handleRemoveResource = (index: number) => {
    handleUpdateTask({
      resources: task.resources.filter((_, i) => i !== index),
    });
  };

  const handleAllocationChange = (
    resourceIndex: number,
    monthIndex: number,
    value: string
  ) => {
    const newResources = [...task.resources];
    newResources[resourceIndex].allocation[monthIndex] = Number(value) || 0;
    handleUpdateTask({ resources: newResources });
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    handleUpdateTask({ status: newStatus });
    if (newStatus === "completed" && onMarkCompleted) {
      onMarkCompleted(task.id);
    }
  };

  // Meses fixos em português
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full lg:w-[500px] p-0 overflow-y-auto sm:max-w-none bg-gradient-to-b from-gray-50 to-gray-100 shadow-2xl border-l border-white/20 rounded-l-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-white/20 p-6 bg-white/70 backdrop-blur-sm">
            <SheetHeader className="space-y-4">
              <div className="flex flex-col items-start">
                <Input
                  ref={inputRef}
                  value={task.name}
                  onChange={(e) => handleUpdateTask({ name: e.target.value })}
                  className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900"
                  autoFocus={false}
                />
                <div className="flex items-center justify-between w-full mt-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm backdrop-blur-sm shadow-sm",
                      task.status === "completed"
                        ? "border-emerald-200 text-emerald-600 bg-emerald-50/70"
                        : task.status === "in-progress"
                        ? "border-blue-200 text-customBlue bg-blue-50/70"
                        : "border-amber-200 text-amber-600 bg-amber-50/70"
                    )}
                  >
                    {task.status === "completed" ? "Concluído" : task.status === "in-progress" ? "Em Progresso" : "Pendente"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(
                        task.status === "completed" ? "pending" : "completed"
                      )
                    }
                    className={cn(
                      "gap-2 rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
                      task.status === "completed"
                        ? "text-amber-600 border-amber-200 hover:bg-amber-50/70 backdrop-blur-sm"
                        : "text-emerald-600 border-emerald-200 hover:bg-emerald-50/70 backdrop-blur-sm"
                    )}
                  >
                    {task.status === "completed" ? (
                      <>
                        <Trash2 className="h-4 w-4" />
                        Marcar como Pendente
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Marcar como Concluída
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/70 p-3 shadow-md backdrop-blur-sm border border-white/30 w-full">
                  <div className="h-8 w-8 rounded-full bg-blue-50/70 flex items-center justify-center shadow-sm">
                    <Calendar className="h-4 w-4 text-customBlue" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">Período</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={task.startDate}
                        onChange={(e) =>
                          handleUpdateTask({ startDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                      <span className="text-gray-600">-</span>
                      <Input
                        type="date"
                        value={task.endDate}
                        onChange={(e) =>
                          handleUpdateTask({ endDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-32 rounded-full border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-customBlue/20 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
                    {[2024, 2025, 2026, 2027, 2028].map((year) => (
                      <SelectItem key={year} value={year.toString()} className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-customBlue" />
                Descrição
              </Label>
              <Textarea
                value={task.description}
                onChange={(e) => handleUpdateTask({ description: e.target.value })}
                className="min-h-[100px] border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-customBlue/20 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              />
              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-customBlue" />
                  Justificação
                </Label>
                <Textarea
                  value={task.rationale || ""}
                  onChange={(e) => handleUpdateTask({ rationale: e.target.value })}
                  className="min-h-[80px] border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-customBlue/20 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-50/70 flex items-center justify-center shadow-sm">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Recursos</h3>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedResource?.toString() || ""}
                    onValueChange={(value) => setSelectedResource(value ? parseInt(value) : null)}
                  >
                    <SelectTrigger className="rounded-full border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-customBlue/20 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                      <SelectValue placeholder="Selecionar recurso" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
                      {availableResources.map((resource) => (
                        <SelectItem key={resource.id} value={resource.id.toString()} className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">
                          {resource.name} - {resource.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="rounded-full bg-customBlue text-white hover:bg-customBlue/90 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                    onClick={handleAddResource}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
              <Card className="glass-card border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
                <Table>
                  <TableHeader className="bg-white/20 backdrop-blur-sm border-b border-white/20">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-sm font-medium text-gray-700 py-4">Nome</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700 py-4">Função</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700 py-4">Perfil</TableHead>
                      <TableHead className="w-[50px] text-sm font-medium text-gray-700 py-4"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.resources?.map((resource, index) => (
                      <TableRow key={resource.id} className="group border-b border-white/10 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-md">
                        <TableCell className="font-medium text-gray-900 hover:text-customBlue transition-colors duration-300 ease-in-out">{resource.name}</TableCell>
                        <TableCell className="text-gray-600">{resource.role}</TableCell>
                        <TableCell className="text-gray-600">
                          <Badge className="bg-blue-50/70 text-customBlue border-blue-200 backdrop-blur-sm shadow-sm">
                            {resource.profile}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                            onClick={() => handleRemoveResource(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {task.resources.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          Nenhum recurso adicionado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Alocação Mensal */}
            {task.resources.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-amber-50/70 flex items-center justify-center shadow-sm">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Alocação Mensal</h3>
                </div>
                {task.resources.map((resource, resourceIndex) => (
                  <div
                    key={resource.id}
                    className="glass-card border-white/20 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                  >
                    <p className="text-sm font-medium mb-4 text-gray-900 flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-white/70 flex items-center justify-center text-xs shadow-sm">
                        {resource.name.substring(0, 2)}
                      </span>
                      {resource.name}
                    </p>
                    <div className="grid grid-cols-6 gap-2">
                      {months.map((month, monthIndex) => (
                        <div key={monthIndex} className="text-center">
                          <p className="text-xs mb-1 text-gray-600">{month}</p>
                          <Input
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={resource.allocation[monthIndex] || 0}
                            onChange={(e) =>
                              handleAllocationChange(
                                resourceIndex,
                                monthIndex,
                                e.target.value
                              )
                            }
                            className="w-full p-2 text-sm bg-white/70 border border-gray-200 rounded-md focus:ring-customBlue/20 shadow-sm hover:shadow transition-all duration-300 ease-in-out"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="pt-4 flex justify-end">
              <Button 
                className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={onClose}
              >
                <Check className="h-4 w-4" />
                Guardar Alterações
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
