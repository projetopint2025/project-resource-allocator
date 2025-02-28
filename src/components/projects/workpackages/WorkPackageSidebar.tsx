
import { useState, useEffect, useRef } from "react";
import {
  type WorkPackage,
  type Task,
  type Material,
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
  ListChecks,
  Trash2,
  Plus,
  Check,
  Calendar,
  Package,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface WorkPackageSidebarProps {
  workPackage: WorkPackage;
  open: boolean;
  onClose: () => void;
  onUpdate: (workPackage: WorkPackage) => void;
}

const taskTypes = [
  { value: "research", label: "Pesquisa" },
  { value: "development", label: "Desenvolvimento" },
  { value: "testing", label: "Testes" },
  { value: "documentation", label: "Documentação" },
  { value: "management", label: "Gestão" },
];

export function WorkPackageSidebar({
  workPackage: initialWorkPackage,
  open,
  onClose,
  onUpdate,
}: WorkPackageSidebarProps) {
  const [workPackage, setWorkPackage] = useState<WorkPackage>(initialWorkPackage);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    name: "",
    type: "development" as const,
    description: "",
    startDate: "",
    endDate: "",
  });
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    units: 0,
    unitPrice: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.blur();
    }
  }, [open]);

  useEffect(() => {
    setWorkPackage(initialWorkPackage);
  }, [initialWorkPackage]);

  const handleUpdateWorkPackage = (updates: Partial<WorkPackage>) => {
    const updatedWorkPackage = { ...workPackage, ...updates };
    setWorkPackage(updatedWorkPackage);
    onUpdate(updatedWorkPackage);
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.startDate || !newTask.endDate) return;

    const newTaskObject: Task = {
      id: Date.now(),
      name: newTask.name,
      type: newTask.type,
      description: newTask.description,
      startDate: newTask.startDate,
      endDate: newTask.endDate,
      status: "pending",
      rationale: "",
      assignedTo: "",
      resources: [],
      materials: [],
    };

    handleUpdateWorkPackage({
      tasks: [...workPackage.tasks, newTaskObject],
    });

    setNewTask({
      name: "",
      type: "development",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleRemoveTask = (taskId: number) => {
    handleUpdateWorkPackage({
      tasks: workPackage.tasks.filter((task) => task.id !== taskId),
    });
  };

  const handleAddMaterial = () => {
    if (!newMaterial.name || newMaterial.units <= 0 || newMaterial.unitPrice <= 0) return;

    const newMaterialObject: Material = {
      id: Date.now(),
      name: newMaterial.name,
      units: newMaterial.units,
      unitPrice: newMaterial.unitPrice,
    };

    // Adicionar materiais ao workPackage diretamente
    handleUpdateWorkPackage({
      materials: [...(workPackage.materials || []), newMaterialObject],
    });

    setNewMaterial({
      name: "",
      units: 0,
      unitPrice: 0,
    });
  };

  const handleUpdateMaterial = (id: number, updates: Partial<Material>) => {
    if (!workPackage.materials) return;

    handleUpdateWorkPackage({
      materials: workPackage.materials.map((material) =>
        material.id === id ? { ...material, ...updates } : material
      ),
    });
  };

  const handleRemoveMaterial = (id: number) => {
    if (!workPackage.materials) return;

    handleUpdateWorkPackage({
      materials: workPackage.materials.filter((material) => material.id !== id),
    });
  };

  const getTotalMaterialsCost = () => {
    if (!workPackage.materials) return 0;

    return workPackage.materials.reduce(
      (total, material) => total + material.units * material.unitPrice,
      0
    );
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full lg:w-[600px] p-0 overflow-y-auto sm:max-w-none bg-gradient-to-b from-gray-50 to-gray-100 shadow-2xl border-l border-white/20 rounded-l-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-white/20 p-6 bg-white/70 backdrop-blur-sm">
            <SheetHeader className="space-y-4">
              <div className="flex flex-col items-start">
                <Input
                  ref={inputRef}
                  value={workPackage.name}
                  onChange={(e) => handleUpdateWorkPackage({ name: e.target.value })}
                  className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900"
                  autoFocus={false}
                />
                <div className="flex items-center justify-between w-full mt-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm backdrop-blur-sm shadow-sm",
                      workPackage.status === "completed"
                        ? "border-emerald-200 text-emerald-600 bg-emerald-50/70"
                        : "border-blue-200 text-customBlue bg-blue-50/70"
                    )}
                  >
                    {workPackage.status === "completed" ? "Concluído" : "Em Progresso"}
                  </Badge>
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
                        value={workPackage.startDate}
                        onChange={(e) =>
                          handleUpdateWorkPackage({ startDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                      <span className="text-gray-600">-</span>
                      <Input
                        type="date"
                        value={workPackage.endDate}
                        onChange={(e) =>
                          handleUpdateWorkPackage({ endDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            {/* Tarefas Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-50/70 flex items-center justify-center shadow-sm">
                    <ListChecks className="h-4 w-4 text-purple-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Tarefas</h3>
                </div>
              </div>

              <Card className="glass-card border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-name">Nome da Tarefa</Label>
                      <Input
                        id="task-name"
                        value={newTask.name}
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        placeholder="Nome da tarefa"
                        className="border border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-type">Tipo</Label>
                      <Select
                        value={newTask.type}
                        onValueChange={(value: any) => setNewTask({ ...newTask, type: value })}
                      >
                        <SelectTrigger id="task-type" className="border border-gray-200">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {taskTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-description">Descrição</Label>
                    <Textarea
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Descrição da tarefa"
                      className="border border-gray-200 min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-start-date">Data de Início</Label>
                      <Input
                        id="task-start-date"
                        type="date"
                        value={newTask.startDate}
                        onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                        className="border border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="task-end-date">Data de Fim</Label>
                      <Input
                        id="task-end-date"
                        type="date"
                        value={newTask.endDate}
                        onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                        className="border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddTask}
                      className="rounded-full bg-customBlue text-white hover:bg-customBlue/90 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Tarefa
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Tarefas List */}
              {workPackage.tasks.length > 0 && (
                <Card className="glass-card border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
                  <Table>
                    <TableHeader className="bg-white/20 backdrop-blur-sm border-b border-white/20">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-sm font-medium text-gray-700 py-4">Nome</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4">Tipo</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4">Estado</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4">Período</TableHead>
                        <TableHead className="w-[100px] text-sm font-medium text-gray-700 py-4"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workPackage.tasks.map((task) => (
                        <TableRow key={task.id} className="group border-b border-white/10 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-md">
                          <TableCell className="font-medium text-gray-900 hover:text-customBlue transition-colors duration-300 ease-in-out">
                            {task.name}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {taskTypes.find(t => t.value === task.type)?.label || task.type}
                          </TableCell>
                          <TableCell>
                            <Badge className={cn(
                              "text-xs",
                              task.status === "completed" 
                                ? "bg-emerald-50/70 text-emerald-600 border-emerald-200" 
                                : task.status === "in-progress"
                                ? "bg-blue-50/70 text-customBlue border-blue-200"
                                : "bg-amber-50/70 text-amber-600 border-amber-200"
                            )}>
                              {task.status === "completed" 
                                ? "Concluído" 
                                : task.status === "in-progress" 
                                ? "Em Progresso" 
                                : "Pendente"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {new Date(task.startDate).toLocaleDateString('pt-BR')} - {new Date(task.endDate).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                                onClick={() => setEditingTask(task)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:text-red-500 hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                                onClick={() => handleRemoveTask(task.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </div>

            {/* Materiais Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-50/70 flex items-center justify-center shadow-sm">
                    <Package className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Materiais</h3>
                </div>
              </div>

              <Card className="glass-card border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="material-name">Nome do Material</Label>
                      <Input
                        id="material-name"
                        value={newMaterial.name}
                        onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                        placeholder="Nome do material"
                        className="border border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-units">Unidades</Label>
                      <Input
                        id="material-units"
                        type="number"
                        min="1"
                        value={newMaterial.units}
                        onChange={(e) => setNewMaterial({ ...newMaterial, units: Number(e.target.value) })}
                        className="border border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-price">Preço Unitário (€)</Label>
                      <Input
                        id="material-price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newMaterial.unitPrice}
                        onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) })}
                        className="border border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddMaterial}
                      className="rounded-full bg-customBlue text-white hover:bg-customBlue/90 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Material
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Materiais List */}
              {workPackage.materials && workPackage.materials.length > 0 && (
                <Card className="glass-card border-white/20 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
                  <Table>
                    <TableHeader className="bg-white/20 backdrop-blur-sm border-b border-white/20">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-sm font-medium text-gray-700 py-4">Nome</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4 text-right">Unidades</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4 text-right">Preço Unit.</TableHead>
                        <TableHead className="text-sm font-medium text-gray-700 py-4 text-right">Total</TableHead>
                        <TableHead className="w-[50px] text-sm font-medium text-gray-700 py-4"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workPackage.materials.map((material) => (
                        <TableRow key={material.id} className="group border-b border-white/10 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-md">
                          <TableCell>
                            <Input
                              value={material.name}
                              onChange={(e) =>
                                handleUpdateMaterial(material.id, { name: e.target.value })
                              }
                              className="bg-transparent border-none p-0 h-8 text-gray-900 hover:text-customBlue transition-colors duration-300 ease-in-out focus:ring-0"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              value={material.units}
                              onChange={(e) =>
                                handleUpdateMaterial(material.id, { units: Number(e.target.value) || 0 })
                              }
                              className="bg-transparent border-none p-0 h-8 text-right w-20 text-gray-900 focus:ring-0"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              value={material.unitPrice}
                              onChange={(e) =>
                                handleUpdateMaterial(material.id, { unitPrice: Number(e.target.value) || 0 })
                              }
                              className="bg-transparent border-none p-0 h-8 text-right w-24 text-gray-900 focus:ring-0"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium text-gray-900">
                            {(material.units * material.unitPrice).toLocaleString("pt-PT", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                              onClick={() => handleRemoveMaterial(material.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-white/20 backdrop-blur-sm">
                        <TableCell colSpan={3} className="text-right font-medium text-gray-700">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-medium text-customBlue">
                          {getTotalMaterialsCost().toLocaleString("pt-PT", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              )}
            </div>
            
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
