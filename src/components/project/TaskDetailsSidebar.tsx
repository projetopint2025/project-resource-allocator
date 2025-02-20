
import { X, Trash, Plus, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task, Resource } from "@/types/project";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TaskDetailsSidebarProps {
  task: Task;
  onClose: () => void;
  allocationYear: number;
  onAllocationChange: (resourceIndex: number, monthIndex: number, value: string) => void;
  onAddMaterial: () => void;
  onRemoveMaterial: (index: number) => void;
  onMaterialChange: (index: number, field: string, value: string | number) => void;
  onMarkCompleted?: (taskId: number) => void;
  onAddResource?: (resource: Resource) => void;
  onRemoveResource?: (resourceIndex: number) => void;
}

const availableResources = [
  { name: "Ana Silva", role: "Designer", profile: "Senior" },
  { name: "João Santos", role: "Desenvolvedor", profile: "Pleno" },
  { name: "Maria Costa", role: "Product Owner", profile: "Senior" },
];

export const TaskDetailsSidebar = ({
  task,
  onClose,
  allocationYear,
  onAllocationChange,
  onAddMaterial,
  onRemoveMaterial,
  onMaterialChange,
  onMarkCompleted,
  onAddResource,
  onRemoveResource,
}: TaskDetailsSidebarProps) => {
  const getMonthName = (monthIndex: number) => {
    return new Date(allocationYear, monthIndex).toLocaleDateString('pt-BR', { month: 'short' });
  };

  const calculateTotal = (units: number, unitPrice: number) => {
    return units * unitPrice;
  };

  const handleAddResource = (resourceName: string) => {
    const selectedResource = availableResources.find(r => r.name === resourceName);
    if (selectedResource && onAddResource) {
      onAddResource({
        ...selectedResource,
        allocation: Array(12).fill(0),
      });
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[600px] bg-white shadow-xl border-l border-gray-200 overflow-y-auto animate-slide-in-right">
      <div className="bg-customBlue-subtle p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-customBlue">{task.name}</h2>
            <Badge variant="outline" className="mt-2">
              Em Progresso
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkCompleted?.(task.id)}
              className="border-customBlue text-customBlue hover:bg-customBlue hover:text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Marcar como Concluída
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
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
          <p className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">{task.rationale}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Recursos Humanos</h3>
            <Select onValueChange={handleAddResource}>
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
                {task.resources.map((resource, index) => (
                  <TableRow key={resource.name}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>{resource.profile}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onRemoveResource?.(index)}
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
          {task.resources.map((resource, resourceIndex) => (
            <div key={resource.name} className="mb-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3 text-gray-900">{resource.name}</p>
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
                      onChange={(e) => onAllocationChange(resourceIndex, monthIndex, e.target.value)}
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
              onClick={onAddMaterial}
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
                {task.materials.map((material, index) => (
                  <TableRow key={material.id}>
                    <TableCell>
                      <Input
                        type="text"
                        value={material.name}
                        onChange={(e) => onMaterialChange(index, 'name', e.target.value)}
                        className="bg-transparent"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={material.units}
                        onChange={(e) => onMaterialChange(index, 'units', parseFloat(e.target.value))}
                        className="bg-transparent"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={material.unitPrice}
                        onChange={(e) => onMaterialChange(index, 'unitPrice', parseFloat(e.target.value))}
                        className="bg-transparent"
                      />
                    </TableCell>
                    <TableCell>
                      € {calculateTotal(material.units, material.unitPrice)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onRemoveMaterial(index)}
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
                    € {task.materials.reduce((acc, material) => acc + calculateTotal(material.units, material.unitPrice), 0)}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
