import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Lock, 
  Bell, 
  FileText, 
  Clock, 
  Briefcase, 
  PenTool,
  ChevronRight,
  Shield,
  LogOut,
  KeyRound,
  Settings,
  Edit,
  Check,
  Palette,
  X,
  MapPin,
  Building,
  Sparkles,
  Languages,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: "Vasco Fernandes",
    role: "Project Manager",
    email: "vasco.fernandes@star-institute.com",
    phone: "+351 912 345 678",
    joinDate: "10 de Maio, 2018",
    department: "Gestão de Projetos",
    skills: ["Gestão de Projetos", "Agile", "Scrum", "Análise de Dados", "Liderança"],
    languages: ["Português", "Inglês", "Espanhol"],
    location: "Lisboa, Portugal",
    bio: "Project Manager com mais de 6 anos de experiência na gestão de projetos tecnológicos e de inovação. Especialista em metodologias ágeis e desenvolvimento de equipes.",
    avatar: ""  // URL da imagem do avatar
  };
  
  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      action: "Finalizou tarefa",
      project: "INOVC+",
      item: "Levantamento de requisitos",
      timestamp: "Hoje, 14:25"
    },
    {
      id: 2,
      action: "Comentou em",
      project: "INOVC+",
      item: "Validação com stakeholders",
      timestamp: "Ontem, 16:30"
    },
    {
      id: 3,
      action: "Atualizou documento",
      project: "DigitalHealth",
      item: "Especificações técnicas",
      timestamp: "24 Fev, 10:15"
    },
    {
      id: 4,
      action: "Criou novo projeto",
      project: "EcoSustain",
      item: "",
      timestamp: "22 Fev, 09:30"
    }
  ];
  
  // Mock projects
  const projects = [
    { id: 1, name: "INOVC+", role: "Project Manager", progress: 45, status: "Em Progresso" },
    { id: 2, name: "DigitalHealth", role: "Project Manager", progress: 78, status: "Em Progresso" },
    { id: 3, name: "EcoSustain", role: "Consultor", progress: 12, status: "Inicial" },
    { id: 4, name: "SmartCity", role: "Observador", progress: 95, status: "Final" }
  ];

  // Notification settings
  const notifications = [
    { id: "email", label: "Notificações por Email", description: "Receber emails sobre atualizações de projetos", enabled: true },
    { id: "app", label: "Notificações na Aplicação", description: "Receber notificações dentro da aplicação", enabled: true },
    { id: "tasks", label: "Atualizações de Tarefas", description: "Ser notificado quando as tarefas são alteradas", enabled: true },
    { id: "comments", label: "Comentários", description: "Ser notificado de novos comentários", enabled: false }
  ];

  // Calcular tempo na empresa
  const calculateTimeInCompany = () => {
    const joinDateParts = user.joinDate.split(" de ");
    const day = parseInt(joinDateParts[0]);
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const month = monthNames.indexOf(joinDateParts[1]);
    const year = parseInt(joinDateParts[2]);
    
    const start = new Date(year, month, day);
    const today = new Date();
    
    const yearDiff = today.getFullYear() - start.getFullYear();
    const monthDiff = today.getMonth() - month;
    
    if (monthDiff < 0) {
      return `${yearDiff - 1} anos e ${monthDiff + 12} meses`;
    }
    
    return `${yearDiff} anos e ${monthDiff} meses`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-6 lg:px-8 custom-blue-blur">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Título da Página */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">O Meu Perfil</h1>
          {isEditing ? (
            <Button 
              variant="default"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="rounded-full px-4 bg-customBlue hover:bg-customBlue/90 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Check size={16} className="mr-2" />
              Guardar Alterações
            </Button>
          ) : (
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="rounded-full px-4 border-customBlue text-customBlue hover:bg-customBlue/10 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Edit size={16} className="mr-2" />
              Editar Perfil
            </Button>
          )}
        </div>
        
        {/* Perfil Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Coluna Lateral - Informações do Perfil */}
          <div className="space-y-6">
            {/* Card do Perfil */}
            <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-customBlue relative" />
              <CardContent className="pt-0 relative px-6 pb-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-600 text-white text-xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="mt-16">
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <p className="text-gray-500">{user.role}</p>
                    
                    <Badge 
                      variant="outline" 
                      className="mt-2 bg-blue-50/80 text-customBlue border-blue-200/50 backdrop-blur-sm"
                    >
                      {user.department}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 w-full mt-6">
                    <div className="flex items-center text-sm">
                      <Mail size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{user.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">Desde {user.joinDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{calculateTimeInCompany()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Links Rápidos */}
            <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
              <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                <CardTitle className="text-lg font-semibold text-gray-900">Links Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between rounded-none p-4 h-auto text-gray-700 font-normal hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Settings size={16} className="mr-3 text-customBlue" />
                      <span>Definições da Conta</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between rounded-none p-4 h-auto text-gray-700 font-normal hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Shield size={16} className="mr-3 text-customBlue" />
                      <span>Privacidade e Segurança</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between rounded-none p-4 h-auto text-gray-700 font-normal hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Bell size={16} className="mr-3 text-customBlue" />
                      <span>Notificações</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between rounded-none p-4 h-auto text-gray-700 font-normal hover:bg-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-3 text-customBlue" />
                      <span>Terminar Sessão</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Conteúdo Principal */}
          <div className="space-y-6">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 bg-white/40 backdrop-blur-sm rounded-xl p-1 shadow-md">
                <TabsTrigger 
                  value="personal" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Informações</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="projects" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Projetos</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">Atividade</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Definições</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Tab de Informações Pessoais */}
              <TabsContent value="personal" className="mt-0 space-y-6">
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Informações Pessoais</CardTitle>
                    <CardDescription>As suas informações pessoais e profissionais</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input 
                          id="name" 
                          value={user.name} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={user.email} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          value={user.phone} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Localização</Label>
                        <Input 
                          id="location" 
                          value={user.location} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="bio">Biografia</Label>
                        <textarea 
                          id="bio" 
                          rows={4}
                          disabled={!isEditing}
                          className={cn(
                            "flex w-full rounded-md border bg-white/60 border-white/20 backdrop-blur-sm px-3 py-2 text-sm",
                            "mt-1 focus-visible:outline-none",
                            isEditing ? "focus:ring-2 focus:ring-customBlue/30" : "opacity-90"
                          )}
                          defaultValue={user.bio}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Competências e Idiomas</CardTitle>
                    <CardDescription>As suas competências profissionais e idiomas</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <Sparkles className="w-5 h-5 text-customBlue mr-2" />
                        <h3 className="text-md font-medium text-gray-900">Competências</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {user.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className={cn(
                              "px-3 py-1.5 bg-white/60 border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300",
                              isEditing && "pr-1"
                            )}
                          >
                            {skill}
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-gray-200 rounded-full"
                              >
                                <X size={10} />
                              </Button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="rounded-full px-3 py-1 h-auto text-xs bg-white/60 border-customBlue/30 text-customBlue hover:bg-customBlue/10"
                          >
                            + Adicionar
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <Languages className="w-5 h-5 text-customBlue mr-2" />
                        <h3 className="text-md font-medium text-gray-900">Idiomas</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.languages.map((language, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className={cn(
                              "px-3 py-1.5 bg-white/60 border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300",
                              isEditing && "pr-1"
                            )}
                          >
                            {language}
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-2 hover:bg-gray-200 rounded-full"
                              >
                                <X size={10} />
                              </Button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="rounded-full px-3 py-1 h-auto text-xs bg-white/60 border-customBlue/30 text-customBlue hover:bg-customBlue/10"
                          >
                            + Adicionar
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Informações Profissionais</CardTitle>
                    <CardDescription>Detalhes da sua posição e função</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="role">Cargo</Label>
                        <Input 
                          id="role" 
                          value={user.role} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Departamento</Label>
                        <Input 
                          id="department" 
                          value={user.department} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="joinDate">Data de Entrada</Label>
                        <Input 
                          id="joinDate" 
                          value={user.joinDate} 
                          disabled={!isEditing}
                          className={cn(
                            "mt-1 bg-white/60 border-white/20 backdrop-blur-sm transition-all duration-300",
                            isEditing && "focus:ring-2 focus:ring-customBlue/30"
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab de Projetos */}
              <TabsContent value="projects" className="mt-0">
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Meus Projetos</CardTitle>
                    <CardDescription>Projetos em que está envolvido atualmente</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map(project => (
                        <Card key={project.id} className="border-none rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out glass-card border-white/20">
                          <div className="flex flex-col">
                            <div className="p-5">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "px-2 py-1 shadow-sm backdrop-blur-sm",
                                    project.status === "Em Progresso" && "bg-blue-50/70 text-blue-600 border-blue-200/50",
                                    project.status === "Inicial" && "bg-amber-50/70 text-amber-600 border-amber-200/50",
                                    project.status === "Final" && "bg-green-50/70 text-green-600 border-green-200/50"
                                  )}
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Função: {project.role}</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <span>Progresso</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress 
                                  value={project.progress} 
                                  className={cn(
                                    "h-2 bg-gray-100/60",
                                    project.progress < 30 ? "[&>div]:bg-amber-500" :
                                    project.progress < 70 ? "[&>div]:bg-blue-500" :
                                    "[&>div]:bg-green-500"
                                  )}
                                />
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              className="border-t border-white/10 rounded-none justify-start h-12 text-customBlue font-normal hover:bg-white/40 transition-all duration-300"
                            >
                              Ver detalhes
                              <ChevronRight size={16} className="ml-1" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab de Atividade */}
              <TabsContent value="activity" className="mt-0">
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Atividade Recente</CardTitle>
                    <CardDescription>As suas ações mais recentes na plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {recentActivity.map(activity => (
                        <div key={activity.id} className="flex">
                          <div className="mr-4 flex flex-col items-center">
                            <div className="h-10 w-10 rounded-full flex items-center justify-center shadow-md">
                              {activity.action === "Finalizou tarefa" && (
                                <div className="h-10 w-10 rounded-full bg-green-50/70 backdrop-blur-sm flex items-center justify-center">
                                  <Check size={18} className="text-green-500" />
                                </div>
                              )}
                              {activity.action === "Comentou em" && (
                                <div className="h-10 w-10 rounded-full bg-blue-50/70 backdrop-blur-sm flex items-center justify-center">
                                  <PenTool size={18} className="text-blue-500" />
                                </div>
                              )}
                              {activity.action === "Atualizou documento" && (
                                <div className="h-10 w-10 rounded-full bg-amber-50/70 backdrop-blur-sm flex items-center justify-center">
                                  <FileText size={18} className="text-amber-500" />
                                </div>
                              )}
                              {activity.action === "Criou novo projeto" && (
                                <div className="h-10 w-10 rounded-full bg-purple-50/70 backdrop-blur-sm flex items-center justify-center">
                                  <Briefcase size={18} className="text-purple-500" />
                                </div>
                              )}
                            </div>
                            <div className="h-full w-0.5 bg-gray-100 mt-2"></div>
                          </div>
                          <div className="flex-1">
                            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="flex flex-col sm:flex-row sm:justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{activity.action} {activity.item && `"${activity.item}"`}</p>
                                  <p className="text-sm text-gray-600">Projeto: {activity.project}</p>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                                  <Clock size={14} className="mr-1" />
                                  {activity.timestamp}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab de Definições */}
              <TabsContent value="settings" className="mt-0 space-y-6">
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Notificações</CardTitle>
                    <CardDescription>Gerencie como recebe notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="divide-y divide-gray-100">
                      {notifications.map(notification => (
                        <div key={notification.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                          <div>
                            <h4 className="font-medium text-gray-900">{notification.label}</h4>
                            <p className="text-sm text-gray-500">{notification.description}</p>
                          </div>
                          <Switch 
                            id={notification.id} 
                            defaultChecked={notification.enabled}
                            className="data-[state=checked]:bg-customBlue data-[state=checked]:border-customBlue"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Aparência</CardTitle>
                    <CardDescription>Personalize a aparência da interface</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gray-100/80 flex items-center justify-center shadow-sm">
                          <Palette size={18} className="text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Tema Escuro</h4>
                          <p className="text-sm text-gray-500">Usar tema escuro na aplicação</p>
                        </div>
                      </div>
                      <Switch 
                        id="dark-mode" 
                        className="data-[state=checked]:bg-customBlue data-[state=checked]:border-customBlue"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                  <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                    <CardTitle className="text-lg font-semibold text-gray-900">Segurança</CardTitle>
                    <CardDescription>Gerencie as configurações de segurança da sua conta</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80"
                      >
                        <KeyRound size={16} className="mr-2 text-customBlue" />
                        Alterar Palavra-passe
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80"
                      >
                        <Shield size={16} className="mr-2 text-customBlue" />
                        Autenticação de Dois Fatores
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start bg-white/60 backdrop-blur-sm border-white/20 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80"
                      >
                        <FileText size={16} className="mr-2 text-customBlue" />
                        Histórico de Sessões
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 