
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Project, type Material } from "@/types/project";

interface BudgetProps {
  project: Project;
}

export function Budget({ project }: BudgetProps) {
  // Coletar todos os materiais de todos os workpackages
  const allMaterials: Array<Material & { workPackage: string }> = [];
  
  project.workPackages.forEach(wp => {
    if (wp.materials) {
      wp.materials.forEach(material => {
        allMaterials.push({
          ...material,
          workPackage: wp.name
        });
      });
    }
  });

  // Calcular o total
  const totalBudget = allMaterials.reduce((sum, material) => {
    return sum + (material.units * material.unitPrice);
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Orçamento do Projeto</CardTitle>
          <CardDescription>Detalhes dos materiais e custos do projeto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {totalBudget.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
            </div>
            <p className="text-sm text-gray-500">Custo total em materiais</p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pacote de Trabalho</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Valor Unit.</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allMaterials.length > 0 ? (
                allMaterials.map((material, index) => (
                  <TableRow key={`${material.id}-${index}`}>
                    <TableCell>{material.workPackage}</TableCell>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell className="text-right">{material.units}</TableCell>
                    <TableCell className="text-right">
                      {material.unitPrice.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {(material.units * material.unitPrice).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum material alocado para este projeto.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
