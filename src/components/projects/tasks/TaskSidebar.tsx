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
  onMarkCompleted?: (taskId: number) => void;
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
  onMarkCompleted,
}: TaskSidebarProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano selecionável
  const inputRef = useRef<HTMLInputElement>(null);

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
              allocation: Array(12).fill(0), // Resetar alocação para o novo ano
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
    newResources[resourceIndex].allocation[monthIndex] = Number(value) || 0; // Garante que o valor seja 0 se inválido
    handleUpdateTask({ resources: newResources });
  };

  const getTotalMaterialsCost = () => {
    return task.materials.reduce(
      (total, material) => total + material.units * material.unitPrice,
      0
    );
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
        className="w-full lg:w-[500px] p-0 overflow-y-auto sm:max-w-none bg-white shadow-lg rounded-l-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="border-b p-6 bg-customBlue/5">
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
                      "text-sm",
                      task.status === "completed"
                        ? "border-green-200 text-green-600 bg-green-50"
                        : "border-customBlue text-customBlue bg-customBlue/10"
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
                      "gap-2 rounded-full",
                      task.status === "completed"
                        ? "text-red-600 border-red-200 hover:bg-red-50"
                        : "text-green-600 border-green-200 hover:bg-green-50"
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
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-customBlue" />
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={task.startDate}
                      onChange={(e) =>
                        handleUpdateTask({ startDate: e.target.value })
                      }
                      className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50"
                    />
                    <span className="text-gray-600">-</span>
                    <Input
                      type="date"
                      value={task.endDate}
                      onChange={(e) =>
                        handleUpdateTask({ endDate: e.target.value })
                      }
                      className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50"
                    />
                  </div>
                </div>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-32 rounded-md border-gray-200 text-gray-700 focus:ring-customBlue/50">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md border-gray-200">
                    {[2024, 2025, 2026, 2027, 2028].map((year) => (
                      <SelectItem key={year} value={year.toString()} className="text-gray-700 hover:bg-gray-50">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-8">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Descrição</Label>
              <Textarea
                value={task.description}
                onChange={(e) => handleUpdateTask({ description: e.target.value })}
                className="min-h-[100px] border border-gray-200 rounded-md p-3 text-gray-900 focus:ring-customBlue/50"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-customBlue" />
                  <h3 className="text-sm font-medium text-gray-900">Recursos</h3>
                </div>
                <div className="flex gap-2">
                  <Select
                    value={selectedResource}
                    onValueChange={setSelectedResource}
                  >
                    <SelectTrigger className="rounded-md border-gray-200 text-gray-700 focus:ring-customBlue/50">
                      <SelectValue placeholder="Selecionar recurso" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md border-gray-200">
                      {availableResources.map((resource) => (
                        <SelectItem key={resource.id} value={resource.id} className="text-gray-700 hover:bg-gray-50">
                          {resource.name} - {resource.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="rounded-md bg-customBlue text-white hover:bg-customBlue/90"
                    onClick={handleAddResource}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
              <Card className="border-none shadow-md rounded-xl bg-white">
                <Table className="w-full">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-700">Nome</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Função</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Perfil</TableHead>
                      <TableHead className="w-[50px] text-sm font-medium text-gray-700"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.resources?.map((resource, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">{resource.name}</TableCell>
                        <TableCell className="text-gray-600">{resource.role}</TableCell>
                        <TableCell className="text-gray-600">{resource.profile}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveResource(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Alocação Mensal */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Alocação Mensal</h3>
              {task.resources.map((resource, resourceIndex) => (
                <div
                  key={resource.name}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <p className="text-sm font-medium mb-4 text-gray-900">
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
                          className="w-full p-2 text-sm bg-white border border-gray-200 rounded-md focus:ring-customBlue/50"
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
                  <Package className="h-5 w-5 text-customBlue" />
                  <h3 className="text-sm font-medium text-gray-900">Materiais</h3>
                </div>
                <Button
                  size="sm"
                  className="rounded-md bg-customBlue text-white hover:bg-customBlue/90"
                  onClick={handleAddMaterial}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Material
                </Button>
              </div>
              <Card className="border-none shadow-md rounded-xl bg-white">
                <Table className="w-full">
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-700">Nome</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700 text-right">Unidades</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700 text-right">Preço Unit.</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700 text-right">Total</TableHead>
                      <TableHead className="w-[50px] text-sm font-medium text-gray-700"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.materials?.map((material) => (
                      <TableRow key={material.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Input
                            value={material.name}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, { name: e.target.value })
                            }
                            className="border-none p-0 h-8 text-gray-900 focus:ring-customBlue/50"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            value={material.units}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, { units: Number(e.target.value) || 0 })
                            }
                            className="border-none p-0 h-8 text-right w-20 text-gray-900 focus:ring-customBlue/50"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            value={material.unitPrice}
                            onChange={(e) =>
                              handleUpdateMaterial(material.id, { unitPrice: Number(e.target.value) || 0 })
                            }
                            className="border-none p-0 h-8 text-right w-24 text-gray-900 focus:ring-customBlue/50"
                          />
                        </TableCell>
                        <TableCell className="text-right font-medium text-gray-900">
                          {(material.units * material.unitPrice).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveMaterial(material.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium text-gray-700">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-900">
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