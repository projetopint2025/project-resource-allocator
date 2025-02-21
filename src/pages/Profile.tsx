
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ChartBar, Calendar, CheckCircle2, FileText, Play, Pause, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

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

interface TimeEntry {
  startTime: Date;
  endTime?: Date;
  pauses: { start: Date; end?: Date }[];
  isActive: boolean;
  isPaused: boolean;
}

const Profile = () => {
  const [showingReport, setShowingReport] = useState(false);
  const [allocations, setAllocations] = useState(mockUserStats.detalhesAlocacao);
  const [timeTracking, setTimeTracking] = useState<TimeEntry | null>(null);
  const [totalWorkTime, setTotalWorkTime] = useState("00:00:00");

  const startWork = () => {
    setTimeTracking({
      startTime: new Date(),
      pauses: [],
      isActive: true,
      isPaused: false
    });
  };

  const pauseWork = () => {
    if (timeTracking) {
      const updatedTimeTracking = {
        ...timeTracking,
        isPaused: true,
        pauses: [
          ...timeTracking.pauses,
          { start: new Date() }
        ]
      };
      setTimeTracking(updatedTimeTracking);
    }
  };

  const resumeWork = () => {
    if (timeTracking && timeTracking.pauses.length > 0) {
      const updatedPauses = [...timeTracking.pauses];
      const currentPause = updatedPauses[updatedPauses.length - 1];
      currentPause.end = new Date();

      setTimeTracking({
        ...timeTracking,
        isPaused: false,
        pauses: updatedPauses
      });
    }
  };

  const stopWork = () => {
    if (timeTracking) {
      if (timeTracking.isPaused) {
        resumeWork();
      }
      setTimeTracking({
        ...timeTracking,
        endTime: new Date(),
        isActive: false
      });
    }
  };

  const calculateTotalTime = () => {
    if (!timeTracking) return "00:00:00";

    const now = timeTracking.endTime || new Date();
    let totalMs = now.getTime() - timeTracking.startTime.getTime();

    // Subtrair tempo das pausas
    timeTracking.pauses.forEach(pause => {
      const pauseEnd = pause.end || (timeTracking.isPaused ? new Date() : pause.start);
      totalMs -= (pauseEnd.getTime() - pause.start.getTime());
    });

    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number;
    if (timeTracking?.isActive) {
      interval = window.setInterval(() => {
        setTotalWorkTime(calculateTotalTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeTracking]);

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
      <div className="space-y-8 p-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Relatório de Alocação</h1>
            <p className="text-muted-foreground">Detalhes de alocação por workpackage e tarefa</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowingReport(false)}
            className="gap-2"
          >
            <ChartBar className="h-4 w-4" />
            Voltar ao Perfil
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes de Alocação</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Pacote de Trabalho</TableHead>
                  <TableHead>Tarefa</TableHead>
                  <TableHead className="text-right">Alocação</TableHead>
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
    <div className="space-y-8 p-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <p className="text-muted-foreground">Consulte as suas informações e contribuições</p>
        </div>
        <div className="flex gap-4">
          <Card className="w-fit">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono">{totalWorkTime}</div>
                <div className="flex gap-2">
                  {!timeTracking?.isActive ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={startWork}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  ) : (
                    <>
                      {!timeTracking.isPaused ? (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={pauseWork}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={resumeWork}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={stopWork}
                        className="text-red-600 hover:text-red-700"
                      >
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            onClick={() => setShowingReport(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
                <p className="text-2xl font-semibold">{mockUserStats.projetos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horas Alocadas</p>
                <p className="text-2xl font-semibold">{mockUserStats.horasAlocadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
                <p className="text-2xl font-semibold">{mockUserStats.tarefasConcluidas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribuições em Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockUserStats.contribuicoes.map((contribuicao) => (
              <div key={contribuicao.projeto} className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{contribuicao.projeto}</h3>
                    <p className="text-sm text-muted-foreground">{contribuicao.papel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">{contribuicao.horas}</p>
                    <p className="text-sm text-muted-foreground">horas</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-3">Alocação Mensal</p>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {contribuicao.alocacaoMensal.map((alocacao, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs mb-1 text-gray-600">
                          {new Date(2024, index).toLocaleDateString('pt-BR', { month: 'short' })}
                        </p>
                        <p className="text-sm font-medium">{alocacao.toFixed(1)}</p>
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
  );
};

export default Profile;

