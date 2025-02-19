
import { Calendar, Clock, BarChart3, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const nextDeliveries = [
  {
    project: "INOVC+",
    deliverable: "Relatório de Requisitos",
    deadline: "25 Apr 2024",
    status: "Em progresso",
  },
  {
    project: "DreamFAB",
    deliverable: "Protótipo UI",
    deadline: "28 Apr 2024",
    status: "Pendente",
  },
  {
    project: "IAMFat",
    deliverable: "Documentação API",
    deadline: "30 Apr 2024",
    status: "Em revisão",
  },
];

const projectHighlights = [
  {
    name: "INOVC+",
    progress: 65,
    urgent: true,
  },
  {
    name: "DreamFAB",
    progress: 45,
    urgent: false,
  },
  {
    name: "IAMFat",
    progress: 30,
    urgent: true,
  },
];

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Painel de Controlo</h1>
        <p className="text-muted-foreground">Bem-vindo de volta, Vasco</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas esta semana</p>
                <p className="text-2xl font-bold">13/40</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projetos ativos</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Próxima entrega</p>
                <p className="text-2xl font-bold">2 dias</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tarefas pendentes</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Entregas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextDeliveries.map((delivery) => (
                <div
                  key={`${delivery.project}-${delivery.deliverable}`}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium">{delivery.project}</p>
                    <p className="text-sm text-muted-foreground">{delivery.deliverable}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{delivery.deadline}</p>
                    <p className="text-sm text-muted-foreground">{delivery.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos em Destaque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectHighlights.map((project) => (
                <div
                  key={project.name}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">{project.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="w-full bg-secondary rounded-full h-2 mr-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                    {project.urgent && (
                      <span className="px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded-lg">
                        Urgente
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                Ver todos os projetos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
