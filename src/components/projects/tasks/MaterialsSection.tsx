
import { type Material } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Package2 } from "lucide-react";

interface MaterialsSectionProps {
  materials: Material[];
}

export function MaterialsSection({ materials }: MaterialsSectionProps) {
  const calculateTotal = (units: number, unitPrice: number) => {
    return units * unitPrice;
  };

  const totalValue = materials.reduce((acc, material) => {
    return acc + calculateTotal(material.units, material.unitPrice);
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Package2 className="h-4 w-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-500">Materiais</h3>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Unidades</TableHead>
              <TableHead>Preço Unitário</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.units}</TableCell>
                <TableCell>€ {material.unitPrice}</TableCell>
                <TableCell>€ {calculateTotal(material.units, material.unitPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>€ {totalValue}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
}
