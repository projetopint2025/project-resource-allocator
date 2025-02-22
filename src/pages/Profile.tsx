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
import { TimeTracker } from "@/components/TimeTracker";

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

const Profile = () => {
  const [showingReport, setShowingReport] = useState(false);
  const [allocations, setAllocations] = useState(mockUserStats.detalhesAlocacao);

  const generateReport = () => {
    // Implementar lógica para gerar relatório
    setShowingReport(true);
  };

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
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <p className="text-muted-foreground">Consulte as suas informações e contribuições</p>
        </div>
        <div className="flex gap-4">
          <TimeTracker />
          <Button
            variant="outline"
            onClick={generateReport}
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
