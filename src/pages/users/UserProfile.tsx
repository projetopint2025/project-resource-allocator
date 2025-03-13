import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail,
  Calendar as CalendarIcon,
  ChevronRight,
  X,
  ArrowLeft,
  BarChart,
  FileText,
  Briefcase,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { RelatorioUser } from '@/components/users/RelatorioUser';
import * as Dialog from "@radix-ui/react-dialog";

const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    role: "Gestor",
    level: "Sénior",
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
    achievements: [
      { id: 1, title: "Certificação em Gestão de RH", date: "2023-09-10", description: "Obteve certificação internacional em gestão de recursos humanos" },
      { id: 2, title: "Reconhecimento Anual", date: "2023-01-15", description: "Reconhecido pela excelência na gestão da equipa" },
    ],
    workHistory: [
      { id: 1, company: "HR Solutions", role: "Coordenador de RH", period: "2017-2020" },
      { id: 2, company: "Talent Co.", role: "Técnico de RH", period: "2015-2017" },
    ],
    bio: "Gestor de Recursos Humanos com mais de 8 anos de experiência. Especialista em recrutamento, seleção e gestão de talento. Focado em criar ambientes de trabalho produtivos e saudáveis."
  },
  {
    id: 2,
    name: "Ana Martins",
    role: "Administradora",
    level: "Sénior",
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
    achievements: [
      { id: 1, title: "MBA Executivo", date: "2021-06-15", description: "Conclusão de MBA com distinção pela Universidade Nova" },
      { id: 2, title: "Prémio Liderança", date: "2022-11-20", description: "Reconhecida como líder do ano no setor tecnológico" },
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
    level: "Sénior",
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
    achievements: [
      { id: 1, title: "Prémio de Design", date: "2023-05-18", description: "Venceu o prémio nacional de design de interfaces" },
      { id: 2, title: "Curso Avançado", date: "2022-11-10", description: "Concluiu o curso avançado de Design Systems" },
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
    level: "Pleno",
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
    achievements: [
      { id: 1, title: "Certificação React", date: "2022-08-25", description: "Obteve certificação avançada em React" },
      { id: 2, title: "Hackathon Winner", date: "2023-03-12", description: "Vencedor do hackathon interno da empresa" },
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
    level: "Sénior",
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
    achievements: [
      { id: 1, title: "Certificação PMP", date: "2021-05-10", description: "Obteve certificação Project Management Professional" },
      { id: 2, title: "Projeto Destaque", date: "2022-12-05", description: "Liderou o projeto do ano com entrega antecipada" },
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
    level: "Pleno",
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
    achievements: [
      { id: 1, title: "Técnico do Mês", date: "2022-04-10", description: "Reconhecido pela excelência no atendimento ao cliente" }
    ],
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
    level: "Pleno",
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
    achievements: [
      { id: 1, title: "Campanha Premiada", date: "2022-10-20", description: "Desenvolveu campanha digital que ganhou prémio nacional" }
    ],
    workHistory: [
      { id: 1, company: "DigitalMarketing", role: "Social Media Manager", period: "2018-2020" },
      { id: 2, company: "CreativeAgency", role: "Assistente de Marketing", period: "2016-2018" }
    ],
    bio: "Especialista em marketing digital com foco em estratégias de crescimento e engajamento. Experiência em campanhas para diversos setores e otimização de conversão."
  }
];

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
  
  const currentUser = useMemo(() => {
    const numericId = Number(id);
    if (isNaN(numericId)) return null;
    return mockUsers.find(user => user.id === numericId) || null;
  }, [id]);
  
  useEffect(() => {
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
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => navigate('/users')} 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 p-0 bg-white/60 hover:bg-white/80 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
            >
              <ArrowLeft className="h-4 w-4 text-gray-700" />
            </Button>
            <span className="text-sm text-gray-500">Voltar para utilizadores</span>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => navigate(`/users/${id}/report`)}
              className="rounded-full px-6 py-2 bg-white/80 hover:bg-white/90 text-customBlue border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <BarChart className="w-4 h-4 mr-2" />
              Ver Alocação
            </Button>
            <Button 
              onClick={() => navigate(`/users/${id}/generate-report`)}
              className="rounded-full px-6 py-2 bg-gradient-to-r from-customBlue to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
          </div>
        </div>
        
        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-customBlue" />
          <div className="px-8 pb-6 pt-20 relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl absolute -top-16 left-8">
              <AvatarImage src={currentUser.photo} alt={currentUser.name} />
              <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-600 text-white text-2xl">
                {currentUser.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600">{currentUser.role}</p>
                  <span className="text-gray-400">•</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
                    {currentUser.level}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-customBlue" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-customBlue" />
                  <span>{currentUser.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarIcon className="w-4 h-4 text-customBlue" />
                  <span>Desde {formatDate(currentUser.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Tabs defaultValue="allocations" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-white/40 backdrop-blur-sm rounded-lg p-1 shadow-md">
            <TabsTrigger value="allocations" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300">
              <Briefcase className="w-4 h-4 mr-2" />
              Alocações
            </TabsTrigger>
            <TabsTrigger value="info" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300">
              <FileText className="w-4 h-4 mr-2" />
              Informações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="allocations" className="mt-0">
            <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 transition-all duration-300 ease-in-out overflow-hidden">
              <CardHeader className="px-6 py-4 border-b border-white/10 bg-white/20 backdrop-blur-sm">
                <CardTitle className="text-lg font-semibold text-gray-900">Projetos e Alocações</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {currentUser.projects.map((project) => (
                  <div key={project.id} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                        <p className="text-gray-600 text-sm">{project.role}</p>
                      </div>
                      <Badge className={cn(
                        "px-3 py-1 rounded-full text-xs whitespace-nowrap",
                        project.allocation <= 0.3 ? "bg-green-50 text-green-600 border-green-200" :
                        project.allocation <= 0.7 ? "bg-blue-50 text-blue-600 border-blue-200" :
                        "bg-amber-50 text-amber-600 border-amber-200"
                      )}>
                        {(project.allocation * 100).toFixed(0)}% alocação
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
                        <span>Alocação</span>
                        <span>{(project.allocation * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
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
                ))}
                
                {currentUser.projects.length === 0 && (
                  <div className="text-center py-8">
                    <div className="bg-gray-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                      <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-700 font-medium">Sem projetos ativos</h3>
                    <p className="text-gray-500 text-sm mt-1">O colaborador não está alocado a nenhum projeto atualmente.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="px-6 py-4 border-t border-white/10 bg-white/10 backdrop-blur-sm">
                <Button 
                  onClick={() => setShowReport(true)}
                  variant="ghost" 
                  className="text-customBlue hover:bg-white/60 w-full justify-center rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out" 
                  size="sm"
                >
                  Ver detalhes de alocação
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="info" className="mt-0">
            <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 transition-all duration-300 ease-in-out overflow-hidden">
              <CardHeader className="px-6 py-4 border-b border-white/10 bg-white/20 backdrop-blur-sm">
                <CardTitle className="text-lg font-semibold text-gray-900">Perfil Profissional</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Biografia</h3>
                    <p className="text-gray-700 leading-relaxed">{currentUser.bio}</p>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Competências</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {currentUser.skills.map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center gap-2">
                            <h4 className="text-sm font-medium text-gray-900">{skill.name}</h4>
                            <span className="text-xs text-gray-600">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-customBlue to-blue-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Experiência Anterior</h3>
                    <div className="space-y-3">
                      {currentUser.workHistory.map((work) => (
                        <div key={work.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{work.role}</h4>
                            <span className="text-xs text-gray-500">{work.period}</span>
                          </div>
                          <p className="text-sm text-gray-600">{work.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Certificações e Prêmios</h3>
                    <div className="space-y-3">
                      {currentUser.achievements.map((achievement) => (
                        <div key={achievement.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                            <span className="text-xs text-gray-500">{formatDate(achievement.date)}</span>
                          </div>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
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
