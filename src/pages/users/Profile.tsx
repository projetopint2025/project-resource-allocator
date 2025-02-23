import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { RelatorioUser } from "@/components/users/RelatorioUser";

const mockUserStats = {
  nome: "Vasco Fernandes",
  cargo: "Project Manager",
  email: "vasco.fernandes@star.pt",
  contribuicoes: [
    {
      projeto: "INOVC+",
      papel: "Project Manager",
      horas: 420,
      alocacaoMensal: [0.8, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0, 0.0, 0.0],
    },
    {
      projeto: "DreamFAB",
      papel: "Analista",
      horas: 320,
      alocacaoMensal: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.0, 0.0, 0.0, 0.0],
    },
    {
      projeto: "IAMFat",
      papel: "Desenvolvedor",
      horas: 500,
      alocacaoMensal: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.9, 0.8, 0.7, 0.6],
    },
  ],
  detalhesAlocacao: [
    {
      projeto: "INOVC+",
      workpackage: "WP1 - Análise de Requisitos",
      tarefa: "Levantamento de requisitos",
      horas: 120,
      alocacao: 0.8,
    },
    {
      projeto: "INOVC+",
      workpackage: "WP2 - Desenvolvimento",
      tarefa: "Revisão de código",
      horas: 80,
      alocacao: 0.6,
    },
    {
      projeto: "DreamFAB",
      workpackage: "WP3 - Testes",
      tarefa: "Testes de integração",
      horas: 160,
      alocacao: 0.7,
    },
  ],
};

interface TaskAllocation {
  id: number;
  name: string;
  workpackage: string;
  allocations: number[];
}

interface WorkPackageAllocation {
  name: string;
  tasks: TaskAllocation[];
}

export default function Profile() {
  const [showingReport, setShowingReport] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);

  const transformDataForReport = () => {
    const workPackages = new Map<string, WorkPackageAllocation>();

    mockUserStats.detalhesAlocacao.forEach((detalhe) => {
      if (!workPackages.has(detalhe.workpackage)) {
        workPackages.set(detalhe.workpackage, {
          name: detalhe.workpackage,
          tasks: [],
        });
      }

      const wp = workPackages.get(detalhe.workpackage)!;
      wp.tasks.push({
        id: Math.random(),
        name: detalhe.tarefa,
        workpackage: detalhe.workpackage,
        allocations: new Array(12).fill(detalhe.alocacao),
      });
    });

    return Array.from(workPackages.values());
  };

  if (showingReport) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Relatório de Horas</h2>
            <Button
              variant="outline"
              className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowingReport(false)}
            >
              Voltar
            </Button>
          </div>
          <RelatorioUser
            year={selectedYear}
            onYearChange={setSelectedYear}
            data={transformDataForReport()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-blue-100 shadow-md rounded-full">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl font-semibold text-gray-600">VF</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{mockUserStats.nome}</h1>
              <p className="text-lg text-gray-600">{mockUserStats.cargo}</p>
              <p className="text-sm text-gray-500">{mockUserStats.email}</p>
            </div>
          </div>
          <Button
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-md"
            onClick={() => setShowingReport(true)}
          >
            <FileText className="h-5 w-5 mr-2" />
            Relatório de Alocação
          </Button>
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Projetos Alocados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUserStats.contribuicoes.map((projeto, index) => (
              <Card
                key={index}
                className="border-none shadow-lg rounded-2xl bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-900">{projeto.projeto}</h3>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-600 border-blue-200 text-xs font-medium"
                        >
                          {projeto.papel}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{projeto.horas} horas alocadas</p>
                      <Progress value={(projeto.horas / 500) * 100} className="h-2 bg-gray-200" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}