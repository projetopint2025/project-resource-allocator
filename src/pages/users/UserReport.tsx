
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RelatorioUser } from "@/components/users/RelatorioUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, DownloadCloud, Calendar } from "lucide-react";
import { motion } from "framer-motion";

// Mock data para demonstração - poderia vir de uma API em produção
const mockWorkPackages = [
  {
    name: "WP1 - Gestão de Projeto",
    allocations: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
  },
  {
    name: "WP2 - Desenvolvimento",
    allocations: [0.6, 0.6, 0.6, 0.5, 0.4, 0.4, 0.3, 0.2, 0.2, 0.1, 0.0, 0.0],
  },
  {
    name: "WP3 - Testes",
    allocations: [0.0, 0.0, 0.0, 0.0, 0.2, 0.3, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5],
  },
  {
    name: "WP4 - Documentação",
    allocations: [0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3],
  }
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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8 custom-blue-blur">
      <motion.div 
        className="max-w-7xl mx-auto space-y-6 pl-16 md:pl-20 lg:pl-24" // Adjusted padding for sidebar
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Cabeçalho da página */}
        <motion.div className="flex items-center justify-between" variants={item}>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBack}
              className="rounded-full h-10 w-10 bg-white/90 backdrop-blur-sm border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Relatório de Alocação</h1>
              <p className="text-sm text-gray-500">Consulte as alocações de tempo de {userName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full bg-white/80 hover:bg-white/90 shadow-sm hover:shadow-md border-gray-200 text-gray-700 gap-2 transition-all duration-300 ease-in-out"
              onClick={() => window.print()}
            >
              <DownloadCloud className="h-4 w-4 text-customBlue" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </Button>
            
            <Button 
              className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
              onClick={() => navigate(`/users/${userId}/generate-report`)}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Gerar Relatório</span>
            </Button>
          </div>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div variants={item}>
          <Card className="border-none shadow-md rounded-2xl glass-card border-white/20 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden">
            <CardContent className="p-0">
              <RelatorioUser 
                year={currentYear} 
                onYearChange={handleYearChange} 
                data={mockWorkPackages}
                userName={userName}
              />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserReport;
