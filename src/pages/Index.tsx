
import { Calendar, Clock, BarChart3, AlertTriangle, Search, Users, CircleDollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NewProjectButton } from "@/components/projects/NewProjectButton";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { motion } from "framer-motion";

const nextDeliveries = [
  { project: "INOVC+", deliverable: "Relatório de Requisitos", deadline: "25 Apr 2024", status: "Em progresso" },
  { project: "DreamFAB", deliverable: "Protótipo UI", deadline: "28 Apr 2024", status: "Pendente" },
  { project: "IAMFat", deliverable: "Documentação API", deadline: "30 Apr 2024", status: "Em revisão" },
];

const overallProjectStatus = { totalProjects: 10, onTrack: 6, atRisk: 2, completed: 2 };
const resourceAllocationSummary = { totalResources: 20, availableResources: 8, overAllocatedResources: 3 };

const Index = () => {
  const weeklyOccupation = 75;
  const availableResources = [
    { name: "João Silva", occupation: 25 },
    { name: "Maria Santos", occupation: 30 },
    { name: "Ana Pereira", occupation: 70 },
    { name: "Rui Costa", occupation: 90 },
  ];

  const getStatusColor = (occupation: number) => {
    if (occupation < 50) return "text-emerald-500";
    if (occupation < 80) return "text-amber-500";
    return "text-rose-500";
  };

  const getProgressColor = (occupation: number) => {
    if (occupation < 50) return "bg-gradient-to-r from-emerald-400 to-emerald-500";
    if (occupation < 80) return "bg-gradient-to-r from-amber-400 to-amber-500";
    return "bg-gradient-to-r from-rose-400 to-rose-500";
  };

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
        className="max-w-7xl mx-auto space-y-6 pl-16 md:pl-0"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          variants={item}
        >
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Painel de Controlo</h1>
            <p className="text-sm text-gray-500">Bem-vindo de volta, Vasco</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-grow max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-customBlue/20 transition-all duration-300"
              />
            </div>
            <NotificationsPopover />
            <NewProjectButton />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="grid gap-4 grid-cols-2 md:grid-cols-4"
          variants={item}
        >
          <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="p-3 rounded-full bg-customBlue-subtle flex-shrink-0">
                  <Clock className="h-5 w-5 text-customBlue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Ocupação Semanal</p>
                  <p className="text-xl font-semibold text-gray-900">{weeklyOccupation}%</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="p-3 rounded-full bg-customBlue-subtle flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-customBlue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Projetos Ativos</p>
                  <p className="text-xl font-semibold text-gray-900">4</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="p-3 rounded-full bg-customBlue-subtle flex-shrink-0">
                  <Calendar className="h-5 w-5 text-customBlue" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Próxima Entrega</p>
                  <p className="text-xl font-semibold text-gray-900">2 dias</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="p-3 rounded-full bg-rose-50 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tarefas Pendentes</p>
                  <p className="text-xl font-semibold text-gray-900">7</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Project and Resource Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-customBlue" /> 
                  Visão Geral dos Projetos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-xl font-semibold text-gray-900">{overallProjectStatus.totalProjects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Em Dia</p>
                    <p className="text-xl font-semibold text-emerald-500">{overallProjectStatus.onTrack}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Em Risco</p>
                    <p className="text-xl font-semibold text-amber-500">{overallProjectStatus.atRisk}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Concluídos</p>
                    <p className="text-xl font-semibold text-customBlue">{overallProjectStatus.completed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-customBlue" /> 
                  Alocação de Recursos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3 sm:col-span-1">
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-xl font-semibold text-gray-900">{resourceAllocationSummary.totalResources}</p>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <p className="text-xs text-gray-500 mb-1">Disponíveis</p>
                    <p className="text-xl font-semibold text-emerald-500">{resourceAllocationSummary.availableResources}</p>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <p className="text-xs text-gray-500 mb-1">Sobrealocados</p>
                    <p className="text-xl font-semibold text-rose-500">{resourceAllocationSummary.overAllocatedResources}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Resources and Deliveries */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-customBlue" /> 
                  Recursos Mais Disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                {availableResources.map((resource) => (
                  <div key={resource.name} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm group-hover:ring-customBlue/20 group-hover:shadow-md transition-all duration-300">
                        <AvatarFallback className="text-sm font-medium bg-customBlue-subtle text-customBlue">
                          {resource.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-customBlue transition-colors duration-300">{resource.name}</p>
                        <p className="text-xs text-gray-500">Ocupação: {resource.occupation}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor(resource.occupation)}`}
                          style={{ width: `${resource.occupation}%` }}
                        ></div>
                      </div>
                      <span className={cn("text-xs font-medium", getStatusColor(resource.occupation))}>
                        {resource.occupation}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} whileHover={{ y: -3, transition: { duration: 0.2 } }}>
            <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100 px-6 py-4">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-customBlue" /> 
                  Próximas Entregas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {nextDeliveries.map((delivery, index) => (
                  <motion.div
                    key={`${delivery.project}-${delivery.deliverable}`}
                    className="p-3 rounded-xl bg-gray-50/80 hover:bg-white transition-colors duration-300 hover:shadow-sm group"
                    variants={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-customBlue transition-colors duration-300">{delivery.project}</p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          delivery.status === "Em progresso" && "bg-amber-50 text-amber-600 border-amber-200",
                          delivery.status === "Pendente" && "bg-gray-50 text-gray-600 border-gray-200",
                          delivery.status === "Em revisão" && "bg-blue-50 text-blue-600 border-blue-200"
                        )}
                      >
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        {delivery.deliverable}
                      </p>
                      <p className="text-xs font-medium text-gray-700 flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-customBlue" />
                        {delivery.deadline}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
