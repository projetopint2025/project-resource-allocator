import { useState, useEffect, useRef } from "react";
import {
  type Task,
  type Material,
  type Resource,
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
  Package,
  Trash2,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TaskSidebarProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  allocationYear: number; // Adicionado
  onMarkCompleted?: (taskId: number) => void; // Adicionado
}

// Simular lista de recursos disponíveis
const availableResources = [
  { id: "1", name: "João Silva", role: "Developer", profile: "Senior" },
  { id: "2", name: "Maria Santos", role: "Designer", profile: "Mid-level" },
  { id: "3", name: "Pedro Costa", role: "Analyst", profile: "Junior" },
];

export function TaskSidebar({
  task: initialTask,
  open,
  onClose,
  onUpdate,
  allocationYear,
  onMarkCompleted,
}: TaskSidebarProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null); // Cria uma ref para o input

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.blur(); // Remove o foco do input quando o menu abre
    }
  }, [open]);

  const handleUpdateTask = (updates: Partial<Task>) => {
    const updatedTask = { ...task, ...updates };
    setTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleAddMaterial = () => {
    handleUpdateTask({
      materials: [
        ...task.materials,
        { id: Date.now().toString(), name: "", units: 0, unitPrice: 0 },
      ],
    });
  };

  const handleUpdateMaterial = (id: string, updates: Partial<Material>) => {
    handleUpdateTask({
      materials: task.materials.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    });
  };

  const handleRemoveMaterial = (id: string) => {
    handleUpdateTask({
      materials: task.materials.filter((m) => m.id !== id),
    });
  };

  const handleAddResource = () => {
    if (selectedResource) {
      const resourceToAdd = availableResources.find(
        (r) => r.id === selectedResource
      );
      if (resourceToAdd) {
        handleUpdateTask({
          resources: [
            ...task.resources,
            {
              name: resourceToAdd.name,
              role: resourceToAdd.role,
              profile: resourceToAdd.profile,
              allocation: Array(12).fill(0),
            },
          ],
        });
        setSelectedResource("");
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
    newResources[resourceIndex].allocation[monthIndex] = Number(value);
    handleUpdateTask({ resources: newResources });
  };

  const getTotalMaterialsCost = () => {
    return task.materials.reduce(
      (total, material) => total + material.units * material.unitPrice,
      0
    );
  };

  const getMonthName = (monthIndex: number) => {
    return new Date(allocationYear, monthIndex).toLocaleDateString("pt-BR", {
      month: "short",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full lg:w-[500px] p-0 overflow-y-auto sm:max-w-none"
      >
        <div className="h-full flex flex-col">
          <div className="border-b p-6 bg-customBlue/5">
            <SheetHeader className="space-y-4">
              <div className="flex flex-col items-start justify-start"> {/* Alterado para flex column */}
                <Input
                  ref={inputRef} // Adiciona a ref ao input
                  value={task.name}
                  onChange={(e) =>
                    handleUpdateTask({ name: e.target.value })
                  }
                  className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
                  autoFocus={false}
                />
                <div className="flex items-center justify-between w-full mt-2"> {/* Adicionado um container para o badge e o botão */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm",
                      task.status === "completed"
                        ? "border-green-500 text-green-700 bg-green-50"
                        : "border-customBlue text-customBlue bg-customBlue/5"
                    )}
                  >
                    {task.status === "completed" ? "Concluído" : "Em Progresso"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateTask({
                        status:
                          task.status === "completed" ? "pending" : "completed",
                      })
                    }
                    className={cn(
                      "gap-2",
                      task.status === "completed" ? "text-red-600" : "text-green-600"
                    )}
                  >
                    {task.status === "completed"
                      ? "Marcar como Pendente"
                      : "Marcar como Concluída"}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-customBlue" />
                    <input
                      type="date"
                      value={task.startDate}
                      onChange={(e) =>
                        handleUpdateTask({ startDate: e.target.value })
                      }
                      className="text-sm border rounded px-2 py-1"
                    />
                    <span>-</span>
                    <input
                      type="date"
                      value={task.endDate}
                      onChange={(e) =>
                        handleUpdateTask({ endDate: e.target.value })
                      }
                      className="text-sm border rounded px-2 py-1"
                    />
                  </div>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-8">
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={task.description}
                onChange={(e) =>
                  handleUpdateTask({ description: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-customBlue" />
                  <h3 className="text-sm font-medium">Recursos</h3>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedResource}
                    onValueChange={setSelectedResource}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Selecionar recurso" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableResources.map((resource) => (
                        <SelectItem key={resource.id} value={resource.id}>
                          {resource.name} - {resource.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={handleAddResource}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.resources?.map((resource, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {resource.name}
                        </TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.profile}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveResource(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Alocação Mensal Separada */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Alocação Mensal</h3>
              {task.resources.map((resource, resourceIndex) => (
                <div
                  key={resource.name}
                  className="mb-6 bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm font-medium mb-3 text-gray-900">
                    {resource.name}
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {resource.allocation.map((value, monthIndex) => (
                      <div key={monthIndex} className="text-center">
                        <p className="text-xs mb-1 text-gray-600">
                          {getMonthName(monthIndex)}
                        </p>
                        <Input
                          type="number"
                          min="0"
                          max="1"
                          step="0.1"
                          value={value}
                          onChange={(e) =>
                            handleAllocationChange(
                              resourceIndex,
                              monthIndex,
                              e.target.value
                            )
                          }
                          className="w-full p-2 text-sm bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-customBlue" />
                  <h3 className="text-sm font-medium">Materiais</h3>
                </div>
                <Button size="sm" onClick={handleAddMaterial}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">
                        Preço Unit.
                      </TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.materials?.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <Input
                            value={material.name}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, {
                                name: e.target.value,
                              })
                            }
                            className="border-none p-0 h-8"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            value={material.units}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, {
                                units: Number(e.target.value),
                              })
                            }
                            className="border-none p-0 h-8 text-right w-20 ml-auto"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            value={material.unitPrice}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, {
                                unitPrice: Number(e.target.value),
                              })
                            }
                            className="border-none p-0 h-8 text-right w-24 ml-auto"
                          />
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {(material.units * material.unitPrice).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "EUR",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMaterial(material.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-right font-medium"
                      >
                        Total
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {getTotalMaterialsCost().toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
