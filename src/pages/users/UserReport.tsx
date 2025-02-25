import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RelatorioUser } from "@/components/users/RelatorioUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, DownloadCloud } from "lucide-react";

// Mock data para demonstração - poderia vir de uma API em produção
const mockWorkPackages = [
  {
    name: "WP1 - Gestão de Projeto",
    tasks: [
      {
        id: 1,
        name: "T1.1 - Coordenação",
        workpackage: "WP1",
        allocations: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
      },
      {
        id: 2,
        name: "T1.2 - Reuniões",
        workpackage: "WP1",
        allocations: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      },
    ],
  },
  {
    name: "WP2 - Desenvolvimento",
    tasks: [
      {
        id: 3,
        name: "T2.1 - Frontend",
        workpackage: "WP2",
        allocations: [0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0],
      },
      {
        id: 4,
        name: "T2.2 - Backend",
        workpackage: "WP2",
        allocations: [0.3, 0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.0, 0.0],
      },
    ],
  },
  {
    name: "WP3 - Testes",
    tasks: [
      {
        id: 5,
        name: "T3.1 - Testes Unitários",
        workpackage: "WP3",
        allocations: [0.0, 0.0, 0.0, 0.0, 0.2, 0.2, 0.2, 0.3, 0.3, 0.3, 0.2, 0.2],
      },
      {
        id: 6,
        name: "T3.2 - Testes de Integração",
        workpackage: "WP3",
        allocations: [0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.3, 0.3],
      },
    ],
  },
];

const UserReport = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [userName, setUserName] = useState<string>("Utilizador");
  
  // Em produção, buscaríamos os dados do utilizador e seu relatório de uma API
  useEffect(() => {
    // Simulação de fetch de dados do utilizador
    if (userId) {
      // Aqui poderia ter uma chamada API real
      setUserName(userId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()));
    }
  }, [userId]);

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
    // Aqui poderia buscar dados atualizados para o novo ano
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Cabeçalho da página */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBack}
              className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Relatório de Alocação</h1>
              <p className="text-sm text-gray-500">Consulte e edite as alocações de tempo de {userName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full bg-white/70 hover:bg-white/90 shadow-md hover:shadow-lg border-gray-200 text-gray-700 gap-2 transition-all duration-300 ease-in-out"
              onClick={() => window.print()}
            >
              <DownloadCloud className="h-4 w-4 text-customBlue" />
              <span>Exportar PDF</span>
            </Button>
            
            <Button 
              className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105"
              onClick={() => navigate(`/users/${userId}/generate-report`)}
            >
              <FileText className="h-4 w-4" />
              <span>Gerar Relatório</span>
            </Button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
          <CardContent className="p-0">
            <RelatorioUser 
              year={currentYear} 
              onYearChange={handleYearChange} 
              data={mockWorkPackages}
              userName={userName}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserReport; 