
import { X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/types/project";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TaskDetailsSidebarProps {
  task: Task;
  onClose: () => void;
  allocationYear: number;
  onAllocationChange: (resourceIndex: number, monthIndex: number, value: string) => void;
  onAddMaterial: () => void;
  onRemoveMaterial: (index: number) => void;
  onMaterialChange: (index: number, field: string, value: string | number) => void;
}

export const TaskDetailsSidebar = ({
  task,
  onClose,
  allocationYear,
  onAllocationChange,
  onAddMaterial,
  onRemoveMaterial,
  onMaterialChange,
}: TaskDetailsSidebarProps) => {
  const getMonthName = (monthIndex: number) => {
    return new Date(allocationYear, monthIndex).toLocaleDateString('pt-BR', { month: 'short' });
  };

  const calculateTotal = (units: number, unitPrice: number) => {
    return units * unitPrice;
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[600px] bg-white shadow-xl border-l border-gray-200 overflow-y-auto animate-slide-in-right">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{task.name}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-600">Fundamentação</h3>
          <p className="text-sm text-gray-900">{task.rationale}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-600">Recursos Humanos</h3>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Perfil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {task.resources.map((resource, index) => (
                  <TableRow key={resource.name}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>{resource.profile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-600">Alocação Mensal</h3>
          {task.resources.map((resource, resourceIndex) => (
            <div key={resource.name} className="mb-4">
              <p className="text-sm font-medium mb-2">{resource.name}</p>
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
                      className="w-full p-2 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Materiais</h3>
            <Button variant="outline" size="sm" onClick={onAddMaterial}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Material
            </Button>
          </div>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Unidades</TableHead>
                  <TableHead>Preço Unitário</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Ações</TableHead>
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
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={material.units}
                        onChange={(e) => onMaterialChange(index, 'units', parseFloat(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={material.unitPrice}
                        onChange={(e) => onMaterialChange(index, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      € {calculateTotal(material.units, material.unitPrice)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => onRemoveMaterial(index)}>
                        <Trash className="h-4 w-4 text-red-500" />
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
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
