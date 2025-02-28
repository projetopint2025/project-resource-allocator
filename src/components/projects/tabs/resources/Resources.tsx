
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Project, type Resource } from "@/types/project";

interface ResourcesProps {
  project: Project;
}

export function Resources({ project }: ResourcesProps) {
  // Coleta todos os recursos únicos de todos os pacotes de trabalho
  const allResources: Resource[] = [];
  const resourceMap = new Map<number, Resource>();

  project.workPackages.forEach(wp => {
    wp.tasks.forEach(task => {
      task.resources.forEach(resource => {
        if (!resourceMap.has(resource.id)) {
          resourceMap.set(resource.id, resource);
          allResources.push(resource);
        }
      });
    });
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recursos do Projeto</CardTitle>
          <CardDescription>Lista de recursos alocados neste projeto</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Data de Entrada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allResources.length > 0 ? (
                allResources.map(resource => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">{resource.name}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{resource.profile}</Badge>
                    </TableCell>
                    <TableCell>{new Date(resource.joinDate).toLocaleDateString('pt-PT')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    Nenhum recurso alocado para este projeto.
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
