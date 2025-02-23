
import { useState } from "react";
import { type Task, type Material, type Resource } from "@/types/project";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Users, Package, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TaskSidebarProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdate?: (task: Task) => void;
}

const availableResources = [
  { id: "1", name: "João Silva", role: "Investigador Científico", profile: "Senior" },
  { id: "2", name: "Maria Santos", role: "Product Owner", profile: "Senior" },
  { id: "3", name: "Pedro Costa", role: "Developer", profile: "Junior" },
];

const months = [
  'jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.',
  'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'
];

const years = Array.from({ length: 5 }, (_, i) => 2024 + i);

export function TaskSidebar({
  task: initialTask,
  open,
  onClose,
  onUpdate
}: TaskSidebarProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState(2024);

  const handleUpdateTask = (updates: Partial<Task>) => {
    const updatedTask = { ...task, ...updates };
    setTask(updatedTask);
    onUpdate?.(updatedTask);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-[1200px] p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <Input
              value={task.name}
              onChange={(e) => handleUpdateTask({ name: e.target.value })}
              className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
            />
            <Textarea
              value={task.description}
              onChange={(e) => handleUpdateTask({ description: e.target.value })}
              placeholder="Descrição da tarefa..."
              className="min-h-[100px]"
            />
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Recursos Humanos</h2>
              <div className="flex gap-2">
                <Select value={selectedResource} onValueChange={setSelectedResource}>
                  <SelectTrigger className="w-[280px]">
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
                <Button onClick={() => {
                  if (selectedResource) {
                    const resource = availableResources.find(r => r.id === selectedResource);
                    if (resource) {
                      handleUpdateTask({
                        resources: [
                          ...task.resources,
                          {
                            name: resource.name,
                            role: resource.role,
                            profile: resource.profile,
                            allocation: Array(12).fill(0)
                          }
                        ]
                      });
                      setSelectedResource("");
                    }
                  }
                }}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {task.resources.map((resource, index) => (
                    <TableRow key={index}>
                      <TableCell>{resource.name}</TableCell>
                      <TableCell>{resource.role}</TableCell>
                      <TableCell>{resource.profile}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateTask({
                            resources: task.resources.filter((_, i) => i !== index)
                          })}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Monthly Allocation Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Alocação Mensal</h3>
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(Number(value))}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {task.resources.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="space-y-2">
                  <h4 className="font-medium">{resource.name}</h4>
                  <div className="grid grid-cols-6 gap-4">
                    {months.slice(0, 6).map((month, i) => (
                      <div key={i} className="space-y-2">
                        <Label className="text-sm text-muted-foreground">{month}</Label>
                        <Input
                          type="number"
                          value={resource.allocation[i]}
                          onChange={(e) => {
                            const newAllocation = [...resource.allocation];
                            newAllocation[i] = Number(e.target.value);
                            const newResources = [...task.resources];
                            newResources[resourceIndex] = {
                              ...resource,
                              allocation: newAllocation
                            };
                            handleUpdateTask({ resources: newResources });
                          }}
                          min={0}
                          max={1}
                          step={0.1}
                          className="text-right"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    {months.slice(6).map((month, i) => (
                      <div key={i} className="space-y-2">
                        <Label className="text-sm text-muted-foreground">{month}</Label>
                        <Input
                          type="number"
                          value={resource.allocation[i + 6]}
                          onChange={(e) => {
                            const newAllocation = [...resource.allocation];
                            newAllocation[i + 6] = Number(e.target.value);
                            const newResources = [...task.resources];
                            newResources[resourceIndex] = {
                              ...resource,
                              allocation: newAllocation
                            };
                            handleUpdateTask({ resources: newResources });
                          }}
                          min={0}
                          max={1}
                          step={0.1}
                          className="text-right"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
