
import { type Resource } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

interface ResourcesSectionProps {
  resources: Resource[];
  allocationYear: number;
  onAllocationChange: (resourceIndex: number, monthIndex: number, value: string) => void;
}

export function ResourcesSection({
  resources,
  allocationYear,
  onAllocationChange,
}: ResourcesSectionProps) {
  const getMonthName = (monthIndex: number) => {
    return new Date(allocationYear, monthIndex).toLocaleDateString('pt-BR', { month: 'short' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-500">Recursos Humanos</h3>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Nome</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Perfil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource, resourceIndex) => (
              <TableRow key={resource.name}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{resource.role}</TableCell>
                <TableCell>{resource.profile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-500">Alocação Mensal</h4>
        {resources.map((resource, resourceIndex) => (
          <Card key={resource.name} className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">{resource.name}</p>
              <div className="grid grid-cols-6 gap-2">
                {resource.allocation.map((value, monthIndex) => (
                  <div key={monthIndex} className="space-y-1">
                    <p className="text-xs text-gray-500">{getMonthName(monthIndex)}</p>
                    <Input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={value}
                      onChange={(e) => onAllocationChange(resourceIndex, monthIndex, e.target.value)}
                      className="h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
