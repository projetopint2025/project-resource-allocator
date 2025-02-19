
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalActions } from "@/components/GlobalActions";

const mockProject = {
  id: 1,
  name: "INOVC+",
  status: "Em desenvolvimento",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
  progress: 65,
  deadline: "25 Apr 2024",
  hoursLeft: 4,
  workPackages: [
    {
      id: 1,
      name: "WP1 - Análise de Requisitos",
      tasks: [
        {
          id: 1,
          name: "Levantamento de requisitos",
          startDate: "2024-01-01",
          endDate: "2024-01-15",
        },
        {
          id: 2,
          name: "Validação com stakeholders",
          startDate: "2024-01-16",
          endDate: "2024-01-31",
        },
      ],
    },
    {
      id: 2,
      name: "WP2 - Desenvolvimento",
      tasks: [
        {
          id: 3,
          name: "Implementação do backend",
          startDate: "2024-02-01",
          endDate: "2024-03-15",
        },
        {
          id: 4,
          name: "Desenvolvimento da UI",
          startDate: "2024-02-15",
          endDate: "2024-04-01",
        },
      ],
    },
  ],
};

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{mockProject.name}</h1>
          <p className="text-muted-foreground">{mockProject.description}</p>
        </div>
        <GlobalActions />
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{mockProject.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium">{mockProject.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horas Restantes</p>
                <p className="font-medium">{mockProject.hoursLeft}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Packages e Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockProject.workPackages.map((wp) => (
                <div key={wp.id} className="space-y-4">
                  <h3 className="font-medium">{wp.name}</h3>
                  <div className="relative overflow-x-auto">
                    <div className="min-w-[800px]">
                      <div className="grid grid-cols-12 gap-2">
                        {Array.from({ length: 12 }).map((_, index) => (
                          <div
                            key={index}
                            className="p-2 text-sm text-center border-r border-border"
                          >
                            {new Date(2024, index).toLocaleDateString('pt-BR', {
                              month: 'short'
                            })}
                          </div>
                        ))}
                      </div>
                      {wp.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="relative h-10 mt-2"
                        >
                          <div
                            className="absolute h-8 rounded-md bg-primary/10 border border-primary/20"
                            style={{
                              left: `${(new Date(task.startDate).getMonth()) * (100/12)}%`,
                              width: `${((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.5)) * (100/12)}%`,
                            }}
                          >
                            <div className="px-2 py-1 text-sm truncate">
                              {task.name}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
