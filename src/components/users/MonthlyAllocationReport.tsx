
import React from "react";
import {
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  User,
  CalendarDays,
  BarChart3,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface AllocationEntry {
  workPackageId: string;
  workPackageName: string;
  projectId: string;
  projectName: string;
  allocation: number;
}

interface ProjectGroup {
  projectId: string;
  projectName: string;
  totalAllocation: number;
  workPackages: {
    workPackageId: string;
    workPackageName: string;
    allocation: number;
  }[];
}

interface MonthlyAllocationReportProps {
  userName: string;
  userRole?: string;
  userId: string;
  period: {
    month: number;
    year: number;
  };
  workingData: {
    workingDays: number;
    potentialHours: number;
    vacationDays: number;
    dailyHours: number;
  };
  allocations: AllocationEntry[];
  economicActivity?: number;
  signedBy?: string;
  signedDate?: string;
  signatureId?: string;
}

export const MonthlyAllocationReport: React.FC<MonthlyAllocationReportProps> = ({
  userName,
  userRole = "Investigador",
  userId,
  period,
  workingData,
  allocations,
  economicActivity = 0,
  signedBy,
  signedDate,
  signatureId,
}) => {
  // Função para agrupar alocações por projeto
  const groupByProject = (): ProjectGroup[] => {
    const projects: Record<string, ProjectGroup> = {};
    
    allocations.forEach(entry => {
      if (!projects[entry.projectId]) {
        projects[entry.projectId] = {
          projectId: entry.projectId,
          projectName: entry.projectName,
          totalAllocation: 0,
          workPackages: []
        };
      }
      
      projects[entry.projectId].workPackages.push({
        workPackageId: entry.workPackageId,
        workPackageName: entry.workPackageName,
        allocation: entry.allocation
      });
      
      projects[entry.projectId].totalAllocation += entry.allocation;
    });
    
    return Object.values(projects);
  };

  const projectGroups = groupByProject();
  
  // Calcular totais
  const totalAllocated = projectGroups.reduce((sum, group) => sum + group.totalAllocation, 0) + economicActivity;
  const remainingHours = workingData.potentialHours - totalAllocated;
  
  // Obter nome do mês
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const monthName = months[period.month - 1];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-md max-w-4xl mx-auto print:shadow-none print:p-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-8 print:mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-xl bg-customBlue flex items-center justify-center mr-4 print:hidden">
            <FileText className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Registo de Horas</h1>
            <p className="text-gray-500">Star Institute</p>
          </div>
        </div>
        <img 
          src="/lovable-uploads/95c2b3a8-d072-4daa-92c4-1b3d740429fb.png" 
          alt="Star Institute Logo" 
          className="h-16 print:h-14" 
        />
      </div>
      
      {/* Informações do colaborador e período */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-customBlue" />
            <h2 className="text-lg font-semibold">{userName}</h2>
          </div>
          <p className="text-gray-500 text-sm ml-7">{userRole}</p>
          <p className="text-gray-500 text-sm ml-7">ID: {userId}</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2 md:text-right">
          <div className="flex items-center gap-2 justify-end">
            <Calendar className="h-5 w-5 text-customBlue" />
            <h2 className="text-lg font-semibold">Período de Reporte</h2>
          </div>
          <p className="text-gray-700 font-medium">{monthName}/{period.year}</p>
        </motion.div>
      </motion.div>
      
      <Separator className="my-6 print:my-3" />
      
      {/* Informações de trabalho */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 print:mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-customBlue" />
            <p className="text-sm text-gray-500">Jornada diária</p>
          </div>
          <p className="text-lg font-semibold">{workingData.dailyHours.toFixed(2)}h</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-4 w-4 text-customBlue" />
            <p className="text-sm text-gray-500">Dias úteis</p>
          </div>
          <p className="text-lg font-semibold">{workingData.workingDays}</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-customBlue" />
            <p className="text-sm text-gray-500">Horas potenciais</p>
          </div>
          <p className="text-lg font-semibold">{workingData.potentialHours.toFixed(2)}h</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-gray-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-gray-500">Férias/Ausências</p>
          </div>
          <p className="text-lg font-semibold">{workingData.vacationDays}</p>
        </motion.div>
      </motion.div>
      
      {/* Tabela de alocações */}
      <div className="mb-8 print:mb-4">
        <div className="bg-gray-50 p-3 rounded-t-xl flex items-center">
          <Briefcase className="h-5 w-5 text-customBlue mr-2" />
          <h2 className="text-md font-semibold">Alocações de Projetos</h2>
        </div>
        
        <div className="border border-gray-100 rounded-b-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Projeto/Work Package</th>
                <th className="py-3 px-4 text-right font-medium text-gray-500 w-32">Horas</th>
              </tr>
            </thead>
            <tbody>
              {projectGroups.map((project, index) => (
                <React.Fragment key={project.projectId}>
                  <tr className={cn("bg-white", index > 0 && "border-t border-gray-100")}>
                    <td className="py-3 px-4 font-medium">{project.projectName}</td>
                    <td className="py-3 px-4 text-right font-medium text-customBlue">
                      {project.totalAllocation.toFixed(2)}h
                    </td>
                  </tr>
                  {project.workPackages.map((wp) => (
                    <tr key={wp.workPackageId} className="bg-gray-50/30">
                      <td className="py-2 px-4 pl-8 text-gray-600 text-sm">
                        {wp.workPackageName}
                      </td>
                      <td className="py-2 px-4 text-right text-gray-600 text-sm">
                        {wp.allocation.toFixed(2)}h
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              
              {economicActivity > 0 && (
                <tr className="border-t border-gray-100 bg-white">
                  <td className="py-3 px-4 font-medium">Atividade Económica</td>
                  <td className="py-3 px-4 text-right font-medium text-customBlue">
                    {economicActivity.toFixed(2)}h
                  </td>
                </tr>
              )}
              
              <tr className="border-t border-gray-100 bg-gray-50">
                <td className="py-3 px-4 font-medium">TOTAL GLOBAL</td>
                <td className="py-3 px-4 text-right font-bold text-customBlue">
                  {totalAllocated.toFixed(2)}h
                </td>
              </tr>
              
              <tr className="border-t border-gray-100 bg-white">
                <td className="py-3 px-4 font-medium text-gray-500">Controlo</td>
                <td className="py-3 px-4 text-right font-medium text-gray-500">
                  {remainingHours.toFixed(2)}h
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Assinatura */}
      {signedBy && (
        <div className="border-t border-gray-100 pt-6 mb-6 print:mb-2">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Assinado por:</p>
              <p className="font-medium">{signedBy}</p>
              {signatureId && <p className="text-sm text-gray-500">Num. de Identificação: {signatureId}</p>}
            </div>
            {signedDate && (
              <div className="text-right">
                <p className="text-gray-500 text-sm mb-1">Data:</p>
                <p className="font-medium">{signedDate}</p>
              </div>
            )}
          </div>
          <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
            <p className="text-sm text-gray-400">Rúbrica do(a) Técnico(a): _____________________________</p>
          </div>
        </div>
      )}
      
      {/* Botões de ação (apenas visíveis na tela, não na impressão) */}
      <div className="flex justify-end gap-3 mt-8 print:hidden">
        <Button
          variant="outline"
          className="gap-2 rounded-lg"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4" />
          <span>Exportar PDF</span>
        </Button>
        
        <Button
          className="gap-2 rounded-lg bg-customBlue hover:bg-customBlue/90"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Validar Relatório</span>
        </Button>
      </div>
      
      {/* Rodapé */}
      <div className="mt-12 print:mt-8 text-center">
        <div className="flex justify-center gap-4 items-center mb-2">
          <img src="/lovable-uploads/95c2b3a8-d072-4daa-92c4-1b3d740429fb.png" alt="Star Institute Logo" className="h-6" />
        </div>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Star Institute - SCIENCE & TECHNOLOGY APPLIED RESEARCH</p>
      </div>
    </div>
  );
};
