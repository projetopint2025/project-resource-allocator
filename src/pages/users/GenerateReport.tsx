import * as React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calendar,
  FileText,
  BarChart,
  Users,
  PieChart,
  ChevronLeft,
  Download,
} from "lucide-react";

export default function GenerateReport() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedType, setSelectedType] = useState("detailed");
  const [includeAllTeam, setIncludeAllTeam] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    wp: true,
    tasks: true,
    availability: true,
    charts: true,
    summary: true,
    efficiency: true,
  });

  // Converter userId para nome de utilizador (substituindo hífens por espaços e capitalizando)
  const userName = userId
    ? userId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Utilizador";

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Relatório gerado com sucesso",
      description: "O seu relatório foi gerado e está pronto para download.",
    });
    
    // Simular um pequeno atraso antes de redirecionar de volta
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/70 p-6 mb-6 rounded-xl shadow-lg backdrop-blur-sm border border-white/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Geração de Relatório</h1>
            </div>
            <p className="text-sm text-gray-500 ml-12">Configure as opções para o relatório do utilizador {userName}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Coluna Principal */}
          <div className="col-span-12 md:col-span-8 space-y-6">
            {/* Período e Conteúdo */}
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-white/90 border-b border-gray-100 pb-4">
                <CardTitle className="text-xl text-gray-800">Configuração do Relatório</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white/80">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border border-gray-100 shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-customBlue" />
                          <span>Período</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Mês Inicial</label>
                            <Select defaultValue="0">
                              <SelectTrigger className="w-full rounded-lg">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map((month, i) => (
                                  <SelectItem key={i} value={i.toString()}>{month}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Mês Final</label>
                            <Select defaultValue="11">
                              <SelectTrigger className="w-full rounded-lg">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                {months.map((month, i) => (
                                  <SelectItem key={i} value={i.toString()}>{month}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-100 shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="h-4 w-4 text-customBlue" />
                          <span>Utilizadores</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="current-user" className="mr-2" checked disabled />
                            <label htmlFor="current-user" className="text-sm text-gray-700">{userName}</label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="all-team" 
                              className="mr-2" 
                              checked={includeAllTeam}
                              onChange={() => setIncludeAllTeam(!includeAllTeam)}
                            />
                            <label htmlFor="all-team" className="text-sm text-gray-700">Toda a equipa</label>
                          </div>
                          <Button variant="outline" className="w-full mt-2 text-sm rounded-lg">
                            Selecionar utilizadores
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-100 shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-customBlue" />
                          <span>Formato</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo de Relatório</label>
                            <Select 
                              value={selectedType}
                              onValueChange={setSelectedType}
                            >
                              <SelectTrigger className="w-full rounded-lg">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="detailed">Detalhado</SelectItem>
                                <SelectItem value="summary">Resumido</SelectItem>
                                <SelectItem value="analytics">Análise</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Formato de Ficheiro</label>
                            <Select 
                              value={selectedFormat}
                              onValueChange={setSelectedFormat}
                            >
                              <SelectTrigger className="w-full rounded-lg">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pdf">PDF</SelectItem>
                                <SelectItem value="excel">Excel</SelectItem>
                                <SelectItem value="csv">CSV</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Conteúdo do Relatório</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-wp" 
                            className="mr-2" 
                            checked={selectedSections.wp}
                            onChange={() => setSelectedSections({...selectedSections, wp: !selectedSections.wp})}
                          />
                          <label htmlFor="section-wp" className="text-sm text-gray-700">WorkPackages</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-tasks" 
                            className="mr-2" 
                            checked={selectedSections.tasks}
                            onChange={() => setSelectedSections({...selectedSections, tasks: !selectedSections.tasks})}
                          />
                          <label htmlFor="section-tasks" className="text-sm text-gray-700">Tarefas</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-availability" 
                            className="mr-2" 
                            checked={selectedSections.availability}
                            onChange={() => setSelectedSections({...selectedSections, availability: !selectedSections.availability})}
                          />
                          <label htmlFor="section-availability" className="text-sm text-gray-700">Disponibilidade</label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-charts" 
                            className="mr-2" 
                            checked={selectedSections.charts}
                            onChange={() => setSelectedSections({...selectedSections, charts: !selectedSections.charts})}
                          />
                          <label htmlFor="section-charts" className="text-sm text-gray-700">Gráficos</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-summary" 
                            className="mr-2" 
                            checked={selectedSections.summary}
                            onChange={() => setSelectedSections({...selectedSections, summary: !selectedSections.summary})}
                          />
                          <label htmlFor="section-summary" className="text-sm text-gray-700">Resumo Anual</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="section-efficiency" 
                            className="mr-2" 
                            checked={selectedSections.efficiency}
                            onChange={() => setSelectedSections({...selectedSections, efficiency: !selectedSections.efficiency})}
                          />
                          <label htmlFor="section-efficiency" className="text-sm text-gray-700">Análise de Eficiência</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="col-span-12 md:col-span-4 space-y-6">
            {/* Resumo do Relatório */}
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-white/90 border-b border-gray-100 pb-4">
                <CardTitle className="text-xl text-gray-800">Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-6 bg-white/80">
                  <div className="aspect-[1.414/1] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                    <div className="h-full flex flex-col">
                      <div className="bg-purple-600 text-white p-4">
                        <h4 className="text-lg font-bold">Relatório de Alocação: {userName}</h4>
                        <p className="text-sm opacity-80">Gerado em: {format(new Date(), "dd/MM/yyyy")}</p>
                      </div>
                      
                      <div className="flex-1 p-4 flex items-center justify-center">
                        <div className="text-center space-y-2 opacity-70">
                          <PieChart className="h-20 w-20 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-500">Pré-visualização do relatório</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo e Botão */}
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-white/90 border-b border-gray-100 pb-4">
                <CardTitle className="text-xl text-gray-800">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white/80">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="px-2 py-1 bg-blue-50 text-blue-600 border-blue-200">
                        {selectedFormat.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="px-2 py-1 bg-purple-50 text-purple-600 border-purple-200">
                        {selectedType === "detailed" ? "Detalhado" : selectedType === "summary" ? "Resumido" : "Análise"}
                      </Badge>
                      <Badge variant="outline" className="px-2 py-1 bg-green-50 text-green-600 border-green-200">
                        {Object.values(selectedSections).filter(Boolean).length} secções
                      </Badge>
                    </div>
                    <Separator />
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex justify-between">
                        <span>Utilizador:</span>
                        <span className="font-medium">{userName}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Período:</span>
                        <span className="font-medium">Ano Completo</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Secções:</span>
                        <span className="font-medium">{Object.values(selectedSections).filter(Boolean).length}/6</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-lg shadow-md py-6"
                      onClick={handleGenerateReport}
                    >
                      <FileText className="h-5 w-5" />
                      Gerar Relatório
                    </Button>
                    <Button variant="outline" className="w-full gap-2 rounded-lg">
                      <Download className="h-4 w-4" />
                      Exportar Dados
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 