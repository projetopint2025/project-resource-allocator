
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@/types/project";

interface OverviewProps {
  project: Project;
}

export function Overview({ project }: OverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
          <CardDescription>Informações gerais sobre o projeto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
              <p className="mt-1 text-sm text-gray-900">{project.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Início</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(project.startDate).toLocaleDateString('pt-PT')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Fim</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(project.endDate).toLocaleDateString('pt-PT')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 text-sm text-gray-900">{project.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Progresso</h3>
                <p className="mt-1 text-sm text-gray-900">{project.progress}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
