
import { useState } from "react";
import { type Task, type Material, type Resource } from "@/types/project";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Users, Package, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskSidebarProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export function TaskSidebar({
  task: initialTask,
  open,
  onClose,
  onUpdate,
}: TaskSidebarProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    name: "",
    role: "",
    profile: "",
    allocation: Array(12).fill(0)
  });
  const [newMaterial, setNewMaterial] = useState<Partial<Material>>({
    name: "",
    units: 0,
    unitPrice: 0
  });

  const handleUpdateTask = (updates: Partial<Task>) => {
    const updatedTask = { ...task, ...updates };
    setTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.role && newResource.profile) {
      handleUpdateTask({
        resources: [...task.resources, newResource as Resource]
      });
      setNewResource({ name: "", role: "", profile: "", allocation: Array(12).fill(0) });
    }
  };

  const handleRemoveResource = (index: number) => {
    handleUpdateTask({
      resources: task.resources.filter((_, i) => i !== index)
    });
  };

  const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.units && newMaterial.unitPrice) {
      handleUpdateTask({
        materials: [...task.materials, { id: Date.now().toString(), ...newMaterial as Material }]
      });
      setNewMaterial({ name: "", units: 0, unitPrice: 0 });
    }
  };

  const handleRemoveMaterial = (id: string) => {
    handleUpdateTask({
      materials: task.materials.filter(m => m.id !== id)
    });
  };

  const getTotalMaterialsCost = () => {
    return task.materials.reduce((total, material) => 
      total + (material.units * material.unitPrice), 0
    );
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[800px] p-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          <div className="border-b p-6 bg-customBlue/5">
            <SheetHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <Input
                  value={task.name}
                  onChange={(e) => handleUpdateTask({ name: e.target.value })}
                  className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0"
                />
                <Badge variant="outline" className={cn(
                  'text-sm',
                  task.status === 'completed' ? 'border-green-500 text-green-700 bg-green-50' :
                  'border-customBlue text-customBlue bg-customBlue/5'
                )}>
                  {task.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-customBlue" />
                    <input
                      type="date"
                      value={task.startDate}
                      onChange={(e) => handleUpdateTask({ startDate: e.target.value })}
                      className="text-sm border rounded px-2 py-1"
                    />
                    <span>-</span>
                    <input
                      type="date"
                      value={task.endDate}
                      onChange={(e) => handleUpdateTask({ endDate: e.target.value })}
                      className="text-sm border rounded px-2 py-1"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateTask({ status: task.status === 'completed' ? 'pending' : 'completed' })}
                  className={cn(
                    "gap-2",
                    task.status === 'completed' ? "text-red-600" : "text-green-600"
                  )}
                >
                  {task.status === 'completed' ? 'Marcar como Pendente' : 'Marcar como Concluída'}
                </Button>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <Label>Descrição</Label>
              <textarea
                value={task.description}
                onChange={(e) => handleUpdateTask({ description: e.target.value })}
                className="w-full min-h-[100px] p-2 text-sm border rounded"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-customBlue" />
                  <h3 className="text-sm font-medium">Recursos</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome"
                    value={newResource.name}
                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                    className="text-sm w-32"
                  />
                  <Input
                    placeholder="Função"
                    value={newResource.role}
                    onChange={(e) => setNewResource({ ...newResource, role: e.target.value })}
                    className="text-sm w-32"
                  />
                  <Input
                    placeholder="Perfil"
                    value={newResource.profile}
                    onChange={(e) => setNewResource({ ...newResource, profile: e.target.value })}
                    className="text-sm w-32"
                  />
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
                      <TableHead>Alocação</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.resources?.map((resource, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.profile}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {resource.allocation.map((value, i) => (
                              <input
                                key={i}
                                type="number"
                                min="0"
                                max="1"
                                step="0.1"
                                value={value}
                                onChange={(e) => {
                                  const newAllocation = [...resource.allocation];
                                  newAllocation[i] = Number(e.target.value);
                                  const newResources = [...task.resources];
                                  newResources[index] = { ...resource, allocation: newAllocation };
                                  handleUpdateTask({ resources: newResources });
                                }}
                                className="w-10 text-xs border rounded p-1"
                              />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-customBlue" />
                  <h3 className="text-sm font-medium">Materiais</h3>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="text-sm w-32"
                  />
                  <Input
                    placeholder="Unidades"
                    type="number"
                    value={newMaterial.units}
                    onChange={(e) => setNewMaterial({ ...newMaterial, units: Number(e.target.value) })}
                    className="text-sm w-24"
                  />
                  <Input
                    placeholder="Preço Unit."
                    type="number"
                    value={newMaterial.unitPrice}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unitPrice: Number(e.target.value) })}
                    className="text-sm w-24"
                  />
                  <Button size="sm" onClick={handleAddMaterial}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-right">Unidades</TableHead>
                      <TableHead className="text-right">Preço Unit.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.materials?.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell className="text-right">{material.units}</TableCell>
                        <TableCell className="text-right">
                          {material.unitPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' })}
                        </TableCell>
                        <TableCell className="text-right">
                          {(material.units * material.unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMaterial(material.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                      <TableCell className="text-right font-medium">
                        {getTotalMaterialsCost().toLocaleString('pt-BR', { style: 'currency', currency: 'EUR' })}
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
