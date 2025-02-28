
import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar,
  BarChart4,
  Phone, 
  Mail, 
  MapPin,
  Clock, 
  Calendar as CalendarIcon,
  Briefcase,
  ChevronRight,
  Sparkles,
  X,
  ArrowLeft,
  BarChart,
  FileText,
  Building,
  ClockIcon,
  Clock3,
  TimerIcon,
  Timer,
  User,
  Clock4,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { RelatorioUser } from '@/components/users/RelatorioUser';
import * as Dialog from "@radix-ui/react-dialog";

// Mais dados de exemplo para simular vários utilizadores
const mockUsers = [
  // O utilizador existente como id=1 (atualizado para corresponder aos dados em Users.tsx)
  {
    id: 1,
    name: "João Silva",
    role: "Gestor",
    level: "Integral",
    department: "Recursos Humanos",
    photo: "",
    email: "joao.silva@star.pt",
    phone: "+351 912 345 678",
    location: "Porto, Portugal",
    joinDate: "2020-03-15",
    skills: [
      { name: "Gestão de Equipas", level: 90 },
      { name: "Recrutamento", level: 85 },
      { name: "Legislação Laboral", level: 75 },
      { name: "Avaliação de Desempenho", level: 80 },
      { name: "Excel Avançado", level: 70 },
    ],
    projects: [
      { id: 1, name: "INOVC+", role: "Gestor de RH", allocation: 0.6 },
      { id: 3, name: "IAMFat", role: "Gestor de Equipa", allocation: 0.4 },
    ],
    workHistory: [
      { id: 1, company: "HR Solutions", role: "Coordenador de RH", period: "2017-2020" },
      { id: 2, company: "Talent Co.", role: "Técnico de RH", period: "2015-2017" },
    ],
    bio: "Gestor de Recursos Humanos com mais de 8 anos de experiência. Especialista em recrutamento, seleção e gestão de talento. Focado em criar ambientes de trabalho produtivos e saudáveis."
  },
  // Adicionar mais utilizadores correspondentes aos da tabela Users.tsx
  {
    id: 2,
    name: "Ana Martins",
    role: "Administradora",
    level: "Parcial",
    department: "Direção",
    photo: "",
    email: "ana.martins@star.pt",
    phone: "+351 925 789 123",
    location: "Lisboa, Portugal",
    joinDate: "2018-05-20",
    skills: [
      { name: "Liderança", level: 95 },
      { name: "Estratégia", level: 90 },
      { name: "Finanças", level: 85 },
      { name: "Negociação", level: 92 },
      { name: "Análise de Negócio", level: 88 },
    ],
    projects: [
      { id: 2, name: "DreamFAB", role: "Diretora de Projeto", allocation: 0.3 },
      { id: 4, name: "Agenda GreenAuto", role: "Supervisora", allocation: 0.3 },
      { id: 1, name: "INOVC+", role: "Consultora Executiva", allocation: 0.2 },
    ],
    workHistory: [
      { id: 1, company: "Tech Innovations", role: "Diretora de Operações", period: "2015-2018" },
      { id: 2, company: "Global Systems", role: "Gestora Sénior", period: "2013-2015" },
    ],
    bio: "Administradora com vasta experiência em gestão executiva e transformação de negócios. Especialista em estratégia empresarial e desenvolvimento organizacional. Comprometida com a inovação e a excelência operacional."
  },
  {
    id: 3,
    name: "Maria Costa",
    role: "UI/UX Designer",
    level: "Integral",
    department: "Design",
    photo: "",
    email: "maria.costa@star.pt",
    phone: "+351 967 890 123",
    location: "Braga, Portugal",
    joinDate: "2021-02-20",
    skills: [
      { name: "Figma", level: 95 },
      { name: "Adobe XD", level: 90 },
      { name: "Photoshop", level: 85 },
      { name: "Ilustração", level: 80 },
      { name: "HTML/CSS", level: 75 },
    ],
    projects: [
      { id: 1, name: "INOVC+", role: "Lead Designer", allocation: 0.5 },
      { id: 4, name: "Agenda GreenAuto", role: "UI Designer", allocation: 0.5 },
    ],
    workHistory: [
      { id: 1, company: "DesignHub", role: "Designer Pleno", period: "2019-2021" },
      { id: 2, company: "CreativeMinds", role: "Designer Junior", period: "2017-2019" },
    ],
    bio: "Designer apaixonada por criar experiências digitais que encantam os utilizadores. Especialista em interfaces intuitivas e acessíveis."
  },
  {
    id: 4,
    name: "Pedro Santos",
    role: "Desenvolvedor",
    level: "Parcial",
    department: "Desenvolvimento",
    photo: "",
    email: "pedro.santos@star.pt",
    phone: "+351 932 456 789",
    location: "Coimbra, Portugal",
    joinDate: "2022-01-10",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "Git", level: 85 },
    ],
    projects: [
      { id: 1, name: "INOVC+", role: "Desenvolvedor Frontend", allocation: 0.7 },
      { id: 2, name: "DreamFAB", role: "Desenvolvedor Backend", allocation: 0.3 },
    ],
    workHistory: [
      { id: 1, company: "WebTech", role: "Desenvolvedor Junior", period: "2020-2022" },
      { id: 2, company: "CodeCraft", role: "Estagiário", period: "2019-2020" },
    ],
    bio: "Desenvolvedor full-stack com paixão por criar aplicações web modernas e eficientes. Sempre em busca de aprender novas tecnologias e aprimorar suas habilidades."
  },
  {
    id: 5,
    name: "Sofia Oliveira",
    role: "Gestora de Projetos",
    level: "Integral",
    department: "Gestão",
    photo: "",
    email: "sofia.oliveira@star.pt",
    phone: "+351 917 345 678",
    location: "Faro, Portugal",
    joinDate: "2019-07-15",
    skills: [
      { name: "Gestão de Projetos", level: 95 },
      { name: "Metodologias Ágeis", level: 90 },
      { name: "Liderança", level: 85 },
      { name: "MS Project", level: 80 },
      { name: "Análise de Riscos", level: 85 },
    ],
    projects: [
      { id: 3, name: "IAMFat", role: "Gestora de Projeto", allocation: 0.6 },
      { id: 4, name: "Agenda GreenAuto", role: "Coordenadora", allocation: 0.4 },
    ],
    workHistory: [
      { id: 1, company: "Project Solutions", role: "Gestora de Projetos", period: "2016-2019" },
      { id: 2, company: "AgileWorks", role: "Scrum Master", period: "2014-2016" },
    ],
    bio: "Gestora de projetos experiente com histórico comprovado de entregas bem-sucedidas. Especialista em metodologias ágeis e tradicional. Focada em resultados e na satisfação do cliente."
  },
  {
    id: 6,
    name: "Rui Ferreira",
    role: "Técnico de Suporte",
    level: "Parcial",
    department: "Suporte",
    photo: "",
    email: "rui.ferreira@star.pt",
    phone: "+351 961 234 567",
    location: "Aveiro, Portugal",
    joinDate: "2021-09-05",
    skills: [
      { name: "Resolução de Problemas", level: 85 },
      { name: "Atendimento ao Cliente", level: 90 },
      { name: "Hardware", level: 75 },
      { name: "Redes", level: 80 },
      { name: "Sistemas Operativos", level: 85 },
    ],
    projects: [],
    workHistory: [
      { id: 1, company: "TechSupport", role: "Técnico Jr", period: "2019-2021" },
      { id: 2, company: "ITHelp", role: "Estagiário", period: "2018-2019" }
    ],
    bio: "Técnico de suporte com experiência na resolução de problemas complexos de hardware e software. Focado em proporcionar o melhor serviço ao cliente e minimizar o tempo de inatividade."
  },
  {
    id: 7,
    name: "Carla Mendes",
    role: "Especialista de Marketing",
    level: "Integral",
    department: "Marketing",
    photo: "",
    email: "carla.mendes@star.pt",
    phone: "+351 939 876 543",
    location: "Setúbal, Portugal",
    joinDate: "2020-11-15",
    skills: [
      { name: "Marketing Digital", level: 90 },
      { name: "SEO", level: 85 },
      { name: "Redes Sociais", level: 92 },
      { name: "Copywriting", level: 80 },
      { name: "Analytics", level: 75 },
    ],
    projects: [],
    workHistory: [
      { id: 1, company: "DigitalMarketing", role: "Social Media Manager", period: "2018-2020" },
      { id: 2, company: "CreativeAgency", role: "Assistente de Marketing", period: "2016-2018" }
    ],
    bio: "Especialista em marketing digital com foco em estratégias de crescimento e engajamento. Experiência em campanhas para diversos setores e otimização de conversão."
  }
];

// Dados de exemplo para o relatório de alocação
const mockReportData = [
  {
    name: "INOVC+",
    tasks: [
      {
        id: 1,
        name: "Desenvolvimento Frontend",
        workpackage: "INOVC+",
        allocations: [0.5, 0.5, 0.6, 0.6, 0.7, 0.7, 0.6, 0.6, 0.5, 0.5, 0.4, 0.4],
      },
      {
        id: 2,
        name: "Testes de UI",
        workpackage: "INOVC+",
        allocations: [0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.2, 0.2],
      },
    ],
  },
  {
    name: "Agenda GreenAuto",
    tasks: [
      {
        id: 3,
        name: "Arquitetura",
        workpackage: "Agenda GreenAuto",
        allocations: [0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
      },
      {
        id: 4,
        name: "Coordenação de Equipa",
        workpackage: "Agenda GreenAuto",
        allocations: [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2],
      },
    ],
  },
  {
    name: "IAMFat",
    tasks: [
      {
        id: 5,
        name: "Gestão de Equipa",
        workpackage: "IAMFat",
        allocations: [0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4],
      },
      {
        id: 6,
        name: "Recrutamento",
        workpackage: "IAMFat",
        allocations: [0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1],
      },
    ],
  },
  {
    name: "DreamFAB",
    tasks: [
      {
        id: 7,
        name: "Desenvolvimento",
        workpackage: "DreamFAB",
        allocations: [0.4, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3, 0.3],
      },
      {
        id: 8,
        name: "Testes",
        workpackage: "DreamFAB",
        allocations: [0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2],
      },
    ],
  },
];

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reportYear, setReportYear] = useState<number>(2024);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  
  // Encontrar o utilizador correto com base no ID da URL
  const currentUser = useMemo(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) return null;
    return mockUsers.find(user => user.id === numericId) || null;
  }, [id]);
  
  useEffect(() => {
    // Simulação de carregamento de dados
    setLoading(true);
    setError(false);
    
    setTimeout(() => {
      if (currentUser) {
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
    
    console.log(`Carregando utilizador com ID: ${id}`);
  }, [id, currentUser]);
  
  // Mensagem de erro se o utilizador não for encontrado
  if (error || !currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur flex items-center justify-center">
        <div className="glass-card border-white/20 rounded-xl p-8 shadow-xl flex flex-col items-center space-y-4 max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
            <X className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Utilizador não encontrado</h2>
          <p className="text-gray-600">Não foi possível encontrar o utilizador com o ID: {id}</p>
          <Button 
            onClick={() => navigate('/users')} 
            className="mt-4 rounded-full bg-customBlue hover:bg-customBlue/90 text-white"
          >
            Voltar para lista de utilizadores
          </Button>
        </div>
      </div>
    );
  }
  
  // Estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur flex items-center justify-center">
        <div className="glass-card border-white/20 rounded-xl p-8 shadow-xl flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-customBlue border-b-customBlue border-white/30 rounded-full animate-spin"></div>
          <p className="text-gray-700">A carregar perfil do utilizador...</p>
        </div>
      </div>
    );
  }
  
  // Calcular a carga de trabalho total
  const totalAllocation = currentUser.projects.reduce((total, project) => total + project.allocation, 0);
  
  // Formatar data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };
  
  // Calcular tempo na empresa
  const calculateTimeInCompany = (joinDate: string) => {
    const start = new Date(joinDate);
    const today = new Date();
    
    const yearDiff = today.getFullYear() - start.getFullYear();
    const monthDiff = today.getMonth() - start.getMonth();
    
    if (monthDiff < 0) {
      return `${yearDiff - 1} anos e ${monthDiff + 12} meses`;
    }
    
    return `${yearDiff} anos e ${monthDiff} meses`;
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header com Navegação e Ações */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <Button 
            onClick={() => navigate('/users')} 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para utilizadores</span>
          </Button>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => navigate(`/users/${id}/report`)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BarChart className="w-4 h-4" />
              Ver Alocação
            </Button>
            <Button 
              onClick={() => navigate(`/users/${id}/generate-report`)}
              className="flex items-center gap-2 bg-customBlue hover:bg-customBlue/90"
            >
              <FileText className="w-4 h-4" />
              Gerar Relatório
            </Button>
          </div>
        </div>
        
        {/* Perfil Principal - Estilo LinkedIn */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna de Perfil e Informações */}
          <div className="lg:col-span-1 space-y-6">
            {/* Card de Perfil */}
            <Card className="overflow-hidden border-none shadow-md">
              {/* Banner personalizado - Estilo LinkedIn */}
              <div className="h-24 bg-gradient-to-r from-blue-500 to-customBlue"></div>
              
              <div className="px-6 pb-6 pt-0 relative">
                <Avatar className="h-24 w-24 border-4 border-white absolute -top-12">
                  <AvatarImage src={currentUser.photo} alt={currentUser.name} />
                  <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-600 text-white text-3xl">
                    {currentUser.name.split(' ').map(name => name[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-14 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                      <p className="text-gray-700">{currentUser.role} · {currentUser.department}</p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-none">
                          {currentUser.level}
                        </Badge>
                        <span className="text-gray-500 text-sm">{currentUser.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-3">{currentUser.bio}</p>
                  
                  <div className="space-y-3 pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Mail className="h-4 w-4 text-gray-400 mr-3" />
                      <span>{currentUser.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span>{currentUser.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-3" />
                      <span>Entrou em {formatDate(currentUser.joinDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-3" />
                      <span>{calculateTimeInCompany(currentUser.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Carga de Trabalho Card */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Carga de Trabalho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Ocupação atual</span>
                    <span className={cn(
                      "text-sm font-medium",
                      totalAllocation <= 0.5 ? "text-green-600" :
                      totalAllocation <= 0.8 ? "text-blue-600" :
                      totalAllocation <= 1.0 ? "text-amber-600" :
                      "text-red-600"
                    )}>
                      {Math.min(totalAllocation * 100, 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(totalAllocation * 100, 100)} 
                    className={cn(
                      "h-2",
                      totalAllocation <= 0.5 ? "bg-green-100 [&>div]:bg-green-500" :
                      totalAllocation <= 0.8 ? "bg-blue-100 [&>div]:bg-blue-500" :
                      totalAllocation <= 1.0 ? "bg-amber-100 [&>div]:bg-amber-500" :
                      "bg-red-100 [&>div]:bg-red-500"
                    )}
                  />
                  <p className="text-xs text-gray-500">Baseado em {currentUser.projects.length} projeto(s) ativo(s)</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Experiência Profissional */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <CardTitle className="text-lg font-semibold text-gray-900">Experiência</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentUser.workHistory.map((work) => (
                    <div key={work.id} className="relative pl-5 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200">
                      <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-blue-100 border-2 border-customBlue -translate-x-1"></div>
                      <h3 className="font-medium text-gray-900">{work.role}</h3>
                      <p className="text-sm text-gray-700 mt-0.5">{work.company}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{work.period}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Conteúdo Principal - Projetos e Competências */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projetos Card */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <CardTitle className="text-lg font-semibold text-gray-900">Projetos Atuais</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {currentUser.projects.length > 0 ? (
                    currentUser.projects.map((project) => (
                      <div key={project.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex flex-wrap justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{project.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{project.role}</p>
                          </div>
                          <Badge className={cn(
                            "self-start",
                            project.allocation <= 0.3 ? "bg-green-50 text-green-700" :
                            project.allocation <= 0.7 ? "bg-blue-50 text-blue-700" :
                            "bg-amber-50 text-amber-700"
                          )}>
                            {(project.allocation * 100).toFixed(0)}% alocação
                          </Badge>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Alocação</span>
                            <span>{(project.allocation * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                project.allocation <= 0.3 ? "bg-green-500" :
                                project.allocation <= 0.7 ? "bg-blue-500" :
                                "bg-amber-500"
                              )}
                              style={{ width: `${project.allocation * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 px-4">
                      <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                        <Briefcase className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-700 font-medium">Sem projetos ativos</h3>
                      <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                        O colaborador não está alocado a nenhum projeto atualmente.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Competências Card */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-gray-400 mr-2" />
                  <CardTitle className="text-lg font-semibold text-gray-900">Competências</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-5 sm:grid-cols-2">
                  {currentUser.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-gray-700">{skill.name}</h3>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-customBlue to-blue-400 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-8">
                  {["JavaScript", "HTML/CSS", "Git", "Scrum", "Jest", "Python", "Docker", "AWS", "Figma"].map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center justify-center text-xs py-1 bg-white border-gray-200 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Modal do Relatório */}
        <Dialog.Root open={showReport} onOpenChange={setShowReport}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out" />
            <Dialog.Content className="fixed top-10 left-1/2 -translate-x-1/2 w-[90vw] max-w-6xl max-h-[85vh] overflow-auto z-50 animate-in fade-in slide-in-from-bottom-10 rounded-2xl bg-white shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white z-10">
                <h2 className="text-xl font-semibold text-gray-900">Relatório de Alocação - {currentUser.name}</h2>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="p-6 overflow-auto">
                <RelatorioUser 
                  year={reportYear} 
                  onYearChange={setReportYear} 
                  data={mockReportData} 
                />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default UserProfile; 
