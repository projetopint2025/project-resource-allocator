import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, Activity, Target, Calendar, FileText, 
  ChevronRight, LineChart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { TimeTracker } from "@/components/TimeTracker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const mockUserStats = {
  nome: "Vasco Fernandes",
  cargo: "Project Manager",
  email: "vasco.fernandes@star.pt",
  projetos: 12,
  horasAlocadas: 1240,
  tarefasConcluidas: 85,
  contribuicoes: [
    { 
      projeto: "INOVC+", 
      papel: "Project Manager", 
      horas: 420,
      alocacaoMensal: [0.8, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.0, 0.0]
    },
    { 
      projeto: "DreamFAB", 
      papel: "Analista", 
      horas: 320,
      alocacaoMensal: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.0, 0.0, 0.0, 0.0]
    },
    { 
      projeto: "IAMFat", 
      papel: "Desenvolvedor", 
      horas: 500,
      alocacaoMensal: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9, 0.8, 0.7, 0.6]
    }
  ],
  detalhesAlocacao: [
    {
      projeto: "INOVC+",
      workpackage: "WP1 - Análise de Requisitos",
      tarefa: "Levantamento de requisitos",
      horas: 120,
      alocacao: 0.8
    },
    {
      projeto: "INOVC+",
      workpackage: "WP2 - Desenvolvimento",
      tarefa: "Revisão de código",
      horas: 80,
      alocacao: 0.6
    },
    {
      projeto: "DreamFAB",
      workpackage: "WP3 - Testes",
      tarefa: "Testes de integração",
      horas: 160,
      alocacao: 0.7
    }
  ]
};

export default function Profile() {
  const [showingReport, setShowingReport] = useState(false);
  const [allocations, setAllocations] = useState(mockUserStats.detalhesAlocacao);

  if (showingReport) {
    let totalAlocacao = 0;

    const handleAllocationChange = (index: number, field: string, value: string | number) => {
      const newAllocations = [...allocations];
      newAllocations[index] = {
        ...newAllocations[index],
        [field]: field === 'alocacao' ? Math.min(1, Math.max(0, Number(value))) : value
      };
      setAllocations(newAllocations);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Relatório de Horas</h2>
            <p className="text-muted-foreground">Detalhes de alocação por workpackage e tarefa</p>
          </div>
          <Button variant="outline" onClick={() => setShowingReport(false)}>
            <ChartBar className="h-4 w-4 mr-2" />
            Voltar ao Perfil
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alocação de Horas por Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto/Work Package/Tarefa</TableHead>
                  <TableHead>Jan</TableHead>
                  <TableHead>Fev</TableHead>
                  <TableHead>Mar</TableHead>
                  {/* Continue for all months */}
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((item, index) => {
                  totalAlocacao += item.alocacao;
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.projeto}</TableCell>
                      <TableCell>{item.workpackage}</TableCell>
                      <TableCell>{item.tarefa}</TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          value={item.alocacao.toFixed(1)}
                          onChange={(e) => handleAllocationChange(index, 'alocacao', e.target.value)}
                          step="0.1"
                          min="0"
                          max="1"
                          className="w-20 text-right"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      value={totalAlocacao.toFixed(1)}
                      onChange={(e) => {
                        const newTotal = parseFloat(e.target.value);
                        const ratio = newTotal / totalAlocacao;
                        setAllocations(allocations.map(a => ({
                          ...a,
                          alocacao: Math.min(1, Math.max(0, a.alocacao * ratio))
                        })));
                      }}
                      step="0.1"
                      className="w-20 text-right font-medium"
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Perfil</h1>
          <p className="text-muted-foreground">Gerencie suas informações e atividades</p>
        </div>
        <div className="flex gap-4">
          <TimeTracker />
          <Button variant="outline" onClick={() => setShowingReport()} className="gap-2">
            <FileText className="h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Perfil Card */}
        <Card className="col-span-12 md:col-span-4">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>VF</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{mockUserStats.nome}</h2>
                <p className="text-sm text-muted-foreground">{mockUserStats.cargo}</p>
              </div>
              <div className="w-full pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div>
                    <p className="text-2xl font-bold">{mockUserStats.projetos}</p>
                    <p className="text-xs text-muted-foreground">Projetos</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUserStats.horasAlocadas}</p>
                    <p className="text-xs text-muted-foreground">Horas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockUserStats.tarefasConcluidas}</p>
                    <p className="text-xs text-muted-foreground">Tarefas</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projetos Ativos */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Projetos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockUserStats.contribuicoes.map((projeto, index) => (
                  <div key={index} className="group relative">
                    <div className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{projeto.projeto}</h3>
                          <Badge variant="outline">{projeto.papel}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {projeto.horas} horas alocadas
                        </p>
                        <div className="mt-2">
                          <Progress value={67} className="h-2" />
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Produtividade</span>
                    </div>
                    <span className="text-sm">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Metas Atingidas</span>
                    </div>
                    <span className="text-sm">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LineChart className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Eficiência</span>
                    </div>
                    <span className="text-sm">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Últimas Atividades */}
        <Card className="col-span-12">
          <CardHeader>
            <CardTitle>Últimas Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Atividade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tempo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INOVC+</TableCell>
                  <TableCell>Revisão de código</TableCell>
                  <TableCell>Hoje</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                      Concluído
                    </Badge>
                  </TableCell>
                  <TableCell>2h 30min</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DreamFAB</TableCell>
                  <TableCell>Análise de requisitos</TableCell>
                  <TableCell>Ontem</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                      Em progresso
                    </Badge>
                  </TableCell>
                  <TableCell>4h 15min</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
