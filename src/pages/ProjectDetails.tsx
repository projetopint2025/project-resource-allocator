
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";

const mockProject = {
  id: 1,
  name: "INOVC+",
  description: "Sistema de gestão de inovação para empresas tecnológicas",
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
          rationale: "Identificar as necessidades dos stakeholders e definir o escopo do projeto",
          resources: [
            {
              name: "João Silva",
              role: "Analista de Requisitos",
              profile: "Senior",
              allocation: [0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
              name: "Maria Santos",
              role: "Product Owner",
              profile: "Senior",
              allocation: [0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        {
          id: 2,
          name: "Validação com stakeholders",
          startDate: "2024-01-16",
          endDate: "2024-01-31",
          rationale: "Garantir que os requisitos levantados atendem às necessidades do negócio",
          resources: [
            {
              name: "João Silva",
              role: "Analista de Requisitos",
              profile: "Senior",
              allocation: [0, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      ]
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
          rationale: "Desenvolver a API e serviços necessários",
          resources: [
            {
              name: "Pedro Costa",
              role: "Desenvolvedor Backend",
              profile: "Senior",
              allocation: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        {
          id: 4,
          name: "Desenvolvimento da UI",
          startDate: "2024-02-15",
          endDate: "2024-04-01",
          rationale: "Implementar a interface do usuário seguindo o design system",
          resources: [
            {
              name: "Ana Oliveira",
              role: "Desenvolvedora Frontend",
              profile: "Pleno",
              allocation: [0, 0, 0.8, 1, 1, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      ]
    }
  ]
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">{mockProject.name}</h1>
        <p className="text-muted-foreground">{mockProject.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockProject.workPackages.map((wp) => (
              <div key={wp.id} className="space-y-4">
                <h3 className="font-medium">{wp.name}</h3>
                <div className="relative overflow-x-auto">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-2">
                      <div className="p-2 text-sm font-medium">Tarefa</div>
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
                        className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 mt-2"
                      >
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="p-2 text-sm text-left hover:text-primary transition-colors"
                        >
                          {task.name}
                        </button>
                        <div className="col-span-12 relative h-8">
                          <div
                            className="absolute h-8 rounded-md bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
                            style={{
                              left: `${(new Date(task.startDate).getMonth()) * (100/12)}%`,
                              width: `${((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.5)) * (100/12)}%`,
                            }}
                            onClick={() => setSelectedTask(task)}
                          />
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

      {selectedTask && (
        <div className="fixed top-0 right-0 w-96 h-full border-l border-border bg-background p-6 overflow-y-auto animate-slide-in-right">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{selectedTask.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedTask(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Fundamentação</h3>
              <p className="text-sm text-muted-foreground">{selectedTask.rationale}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Recursos Humanos</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Atividade</TableHead>
                      <TableHead>Perfil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTask.resources.map((resource) => (
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
              <h3 className="text-sm font-medium mb-2">Alocação Mensal</h3>
              <div className="grid grid-cols-6 gap-2">
                {selectedTask.resources[0].allocation.map((value, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      {new Date(2024, index).toLocaleDateString('pt-BR', { month: 'short' })}
                    </p>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={value}
                      className="w-full p-1 text-sm border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
