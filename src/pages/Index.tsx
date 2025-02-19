import { useState } from "react";
import { Calendar, Clock, BarChart3, AlertTriangle, ListChecks, FileClock, TrendingUp, Search, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const nextDeliveries = [
  { project: "INOVC+", deliverable: "Relatório de Requisitos", deadline: "25 Apr 2024", status: "Em progresso" },
  { project: "DreamFAB", deliverable: "Protótipo UI", deadline: "28 Apr 2024", status: "Pendente" },
  { project: "IAMFat", deliverable: "Documentação API", deadline: "30 Apr 2024", status: "Em revisão" },
];

const projectHighlights = [
  { name: "INOVC+", progress: 65, urgent: true },
  { name: "DreamFAB", progress: 45, urgent: false },
  { name: "IAMFat", progress: 30, urgent: true },
];

const overallProjectStatus = { totalProjects: 10, onTrack: 6, atRisk: 2, completed: 2 };
const resourceAllocationSummary = { totalResources: 20, availableResources: 8, overAllocatedResources: 3 };
const kpis = { avgCompletionTime: "3 meses", budgetVariance: "+5%" };

const Index = () => {
  const weeklyOccupation = 75;
  const availableResources = [
    { name: "João Silva", occupation: 25 },
    { name: "Maria Santos", occupation: 30 },
    { name: "Ana Pereira", occupation: 70 },
    { name: "Rui Costa", occupation: 90 },
  ];

  const getStatusColor = (occupation: number) => {
    if (occupation < 50) return "text-green-500";
    if (occupation < 80) return "text-yellow-500";
    return "text-red-500";
  };

  const iconColor = "#2C5697";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors">Painel de Controlo</h1>
          <p className="text-muted-foreground text-sm">Bem-vindo de volta, Vasco</p>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-customBlue/20 transition-all"
            />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button>Adicionar Projeto</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="p-2 rounded-md" style={{ backgroundColor: iconColor, color: "white" }}>
              <Clock className="h-6 w-6" color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ocupação Semanal</p>
              <p className="text-2xl font-semibold">{weeklyOccupation}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="p-2 rounded-md" style={{ backgroundColor: iconColor, color: "white" }}>
              <BarChart3 className="h-6 w-6" color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Projetos ativos</p>
              <p className="text-2xl font-semibold">4</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="p-2 rounded-md" style={{ backgroundColor: iconColor, color: "white" }}>
              <Calendar className="h-6 w-6" color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Próxima entrega</p>
              <p className="text-2xl font-semibold">2 dias</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="p-2 rounded-md bg-red-500 text-white">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tarefas pendentes</p>
              <p className="text-2xl font-semibold">7</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project and Resource Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral dos Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-xl font-semibold">{overallProjectStatus.totalProjects}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Dia</p>
                <p className="text-xl font-semibold text-green-500">{overallProjectStatus.onTrack}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Risco</p>
                <p className="text-xl font-semibold text-yellow-500">{overallProjectStatus.atRisk}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
                <p className="text-xl font-semibold text-blue-500">{overallProjectStatus.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alocação de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-xl font-semibold">{resourceAllocationSummary.totalResources}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                <p className="text-xl font-semibold text-green-500">{resourceAllocationSummary.availableResources}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sobrealocados</p>
                <p className="text-xl font-semibold text-red-500">{resourceAllocationSummary.overAllocatedResources}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs and Highlights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recursos Humanos Mais Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableResources.map((resource) => (
                <div key={resource.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>{resource.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{resource.name}</p>
                      <p className="text-xs text-muted-foreground">Ocupação: {resource.occupation}%</p>
                    </div>
                  </div>
                  <Progress value={resource.occupation} className="w-32" />
                  <span className={cn("text-sm font-semibold", getStatusColor(resource.occupation))}>
                    {resource.occupation}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Entregas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {nextDeliveries.map((delivery) => (
              <div key={`${delivery.project}-${delivery.deliverable}`} className="rounded-md p-3 bg-muted hover:bg-muted-100 transition-colors duration-200">
                <p className="text-sm font-medium">{delivery.project}</p>
                <p className="text-xs text-muted-foreground">{delivery.deliverable} - {delivery.deadline}</p>
                <Badge variant="secondary">{delivery.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;