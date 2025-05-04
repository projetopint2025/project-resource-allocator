
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText, Calendar, Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthlyAllocationReport } from "@/components/users/MonthlyAllocationReport";
import { useToast } from "@/components/ui/use-toast";

const GenerateReport = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().getMonth().toString()
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  // Dados de exemplo para o relatório
  const mockUserData = {
    userName: userId ? userId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) : "Utilizador",
    userId: "09620223",
    userRole: "Investigador",
  };

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Dados fictícios para o relatório
  const mockAllocations = [
    {
      workPackageId: "WP1",
      workPackageName: "Gestão de Projeto",
      projectId: "AMGA",
      projectName: "AGENDA GREEN AUTO",
      allocation: 49.16,
    },
    {
      workPackageId: "WP9",
      workPackageName: "Sistema de drones para controlo de qualidade",
      projectId: "AMGA",
      projectName: "AGENDA GREEN AUTO",
      allocation: 0,
    },
    {
      workPackageId: "WP10",
      workPackageName: "Sistema de navegação 3D para robots móveis",
      projectId: "AMGA",
      projectName: "AGENDA GREEN AUTO",
      allocation: 0,
    },
    {
      workPackageId: "WP11",
      workPackageName: "Divulgação e Promoção",
      projectId: "AMGA",
      projectName: "AGENDA GREEN AUTO",
      allocation: 40.46,
    },
    {
      workPackageId: "LA1",
      workPackageName: "Prospetiva Tecnológica e de Mercado",
      projectId: "CTI",
      projectName: "MISSÃO DE INTERFACE - CTI",
      allocation: 0,
    },
    {
      workPackageId: "LA2",
      workPackageName: "Investigação, Desenvolvimento e Inovação",
      projectId: "CTI",
      projectName: "MISSÃO DE INTERFACE - CTI",
      allocation: 43.45,
    },
    {
      workPackageId: "LA3",
      workPackageName: "Capacitação e Qualificação Empresarial",
      projectId: "CTI",
      projectName: "MISSÃO DE INTERFACE - CTI",
      allocation: 0,
    },
    {
      workPackageId: "LA4",
      workPackageName: "Promoção, Disseminação e Internacionalização",
      projectId: "CTI",
      projectName: "MISSÃO DE INTERFACE - CTI",
      allocation: 3.31,
    },
    {
      workPackageId: "WP1",
      workPackageName: "Project management",
      projectId: "IAMFat",
      projectName: "PROJETO EUROPEU IAMFat",
      allocation: 0.69,
    },
    {
      workPackageId: "WP1",
      workPackageName: "Project coordination and dissemination",
      projectId: "DreamFab",
      projectName: "PROJETO EUROPEU DREAMFab",
      allocation: 0.28,
    },
  ];

  const workingDataByMonth: Record<string, any> = {
    // Outubro
    "9": {
      workingDays: 23,
      potentialHours: 184,
      vacationDays: 0,
      dailyHours: 8,
    },
    // Novembro
    "10": {
      workingDays: 20,
      potentialHours: 160,
      vacationDays: 0,
      dailyHours: 8,
    },
    // Dezembro
    "11": {
      workingDays: 21,
      potentialHours: 168,
      vacationDays: 4,
      dailyHours: 8,
    },
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleExportPDF = () => {
    window.print();
    toast({
      title: "Relatório exportado como PDF",
      description: "O relatório foi exportado para PDF com sucesso.",
    });
  };

  const handleSaveReport = () => {
    toast({
      title: "Relatório guardado",
      description: "O relatório foi guardado com sucesso.",
    });
  };

  // Get working data for selected month
  const monthIndex = parseInt(selectedMonth);
  const workingData = workingDataByMonth[monthIndex.toString()] || {
    workingDays: 22,
    potentialHours: 176,
    vacationDays: 0,
    dailyHours: 8,
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8">
      <motion.div
        className="max-w-7xl mx-auto space-y-6 md:pl-20 lg:pl-24" // Adjusted padding for sidebar
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Cabeçalho da página */}
        <motion.div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" variants={item}>
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Gerar Relatório
              </h1>
              <p className="text-sm text-gray-500">
                Crie um relatório de alocação mensal para {mockUserData.userName}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[180px] rounded-full bg-white/80 hover:bg-white/90 shadow-sm hover:shadow-md border-gray-200 text-gray-700 gap-2 transition-all duration-300 ease-in-out">
                <Calendar className="h-4 w-4 text-customBlue" />
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-200 bg-white/90 backdrop-blur-md shadow-lg">
                {months.map((month, index) => (
                  <SelectItem
                    key={index}
                    value={index.toString()}
                    className="text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedYear}
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-[140px] rounded-full bg-white/80 hover:bg-white/90 shadow-sm hover:shadow-md border-gray-200 text-gray-700 gap-2 transition-all duration-300 ease-in-out">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-200 bg-white/90 backdrop-blur-md shadow-lg">
                {[2023, 2024, 2025].map((year) => (
                  <SelectItem
                    key={year}
                    value={year.toString()}
                    className="text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Conteúdo principal */}
        <motion.div variants={item} className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="print:shadow-none">
            <MonthlyAllocationReport
              userName={mockUserData.userName}
              userRole={mockUserData.userRole}
              userId={mockUserData.userId}
              period={{
                month: parseInt(selectedMonth) + 1,
                year: parseInt(selectedYear),
              }}
              workingData={workingData}
              allocations={mockAllocations}
              economicActivity={38.65}
              signedBy="HELGA ISABEL DA SILVA LOPES CARVALHO"
              signedDate={`${new Date().toISOString().split('T')[0]}`}
              signatureId="09620223"
            />
          </div>
        </motion.div>

        {/* Botões de ação na parte inferior (não visíveis na impressão) */}
        <motion.div variants={item} className="flex justify-end gap-3 print:hidden">
          <Button
            variant="outline"
            className="rounded-full bg-white/80 hover:bg-white/90 shadow-sm hover:shadow-md border-gray-200 text-gray-700 gap-2 transition-all duration-300 ease-in-out"
            onClick={handleExportPDF}
          >
            <FileText className="h-4 w-4 text-customBlue" />
            <span>Exportar PDF</span>
          </Button>

          <Button
            className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            onClick={handleSaveReport}
          >
            <Check className="h-4 w-4" />
            <span>Guardar Relatório</span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GenerateReport;
