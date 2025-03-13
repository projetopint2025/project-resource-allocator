
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase,
  MapPin,
  Building,
  Sparkles,
  Languages,
  GraduationCap,
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Folder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { UserInfo } from "@/types/project";

// Mock user data for visualization
const mockUser: UserInfo = {
  id: 1,
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
  education: "Mestrado em Gestão de Projetos, Instituto Superior Técnico (2015-2017)",
  avatar: "",
  allocations: [
    {
      workPackageId: 1,
      workPackageName: "WP1 - Gestão de Projeto",
      taskId: 1,
      taskName: "Coordenação geral",
      projectId: 1,
      projectName: "INOVC+",
      allocation: 0.5,
      startDate: "2023-01-01",
      endDate: "2023-12-31"
    },
    {
      workPackageId: 2,
      workPackageName: "WP2 - Desenvolvimento",
      taskId: 5,
      taskName: "Supervisão de desenvolvimento",
      projectId: 1,
      projectName: "INOVC+",
      allocation: 0.2,
      startDate: "2023-03-15",
      endDate: "2023-08-30"
    },
    {
      workPackageId: 3,
      workPackageName: "WP3 - Testes",
      taskId: 8,
      taskName: "Validação de qualidade",
      projectId: 1,
      projectName: "INOVC+",
      allocation: 0.15,
      startDate: "2023-07-01",
      endDate: "2023-09-30"
    },
    {
      workPackageId: 1,
      workPackageName: "WP1 - Análise",
      taskId: 2,
      taskName: "Gestão de requisitos",
      projectId: 2,
      projectName: "DigitalHealth",
      allocation: 0.3,
      startDate: "2023-02-01",
      endDate: "2023-12-31"
    },
    {
      workPackageId: 2,
      workPackageName: "WP2 - Implementação",
      taskId: 6,
      taskName: "Coordenação técnica",
      projectId: 2,
      projectName: "DigitalHealth",
      allocation: 0.25,
      startDate: "2023-04-10",
      endDate: "2023-11-15"
    }
  ]
};

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("allocations");
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({});
  
  // In a real application, we would fetch the user data using the id parameter
  const user = mockUser;

  // Group allocations by project and workpackage
  const groupedAllocations = useMemo(() => {
    const projectMap = new Map();
    
    user.allocations.forEach(allocation => {
      if (!projectMap.has(allocation.projectId)) {
        projectMap.set(allocation.projectId, {
          id: allocation.projectId,
          name: allocation.projectName,
          workPackages: new Map()
        });
      }
      
      const project = projectMap.get(allocation.projectId);
      
      if (!project.workPackages.has(allocation.workPackageId)) {
        project.workPackages.set(allocation.workPackageId, {
          id: allocation.workPackageId,
          name: allocation.workPackageName,
          tasks: []
        });
      }
      
      const workPackage = project.workPackages.get(allocation.workPackageId);
      workPackage.tasks.push(allocation);
    });
    
    // Convert Maps to arrays for easier rendering
    return Array.from(projectMap.values()).map(project => ({
      ...project,
      workPackages: Array.from(project.workPackages.values())
    }));
  }, [user.allocations]);

  // Calculate time in company
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

  const toggleProject = (projectId: number) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const getTotalAllocation = (projectId: number) => {
    return user.allocations
      .filter(a => a.projectId === projectId)
      .reduce((sum, a) => sum + a.allocation, 0);
  };

  // Get color for allocation percentage
  const getAllocationColor = (allocation: number) => {
    if (allocation <= 0.25) return "bg-emerald-500";
    if (allocation <= 0.5) return "bg-blue-500";
    if (allocation <= 0.75) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 py-8 px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Page Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full mr-2 hover:bg-white/50" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Utilizador</h1>
          </div>
        </div>
        
        {/* User Profile Card */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-none rounded-2xl shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <div className="h-36 bg-gradient-to-r from-blue-600 to-customBlue relative" />
            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <Avatar className="h-28 w-28 border-4 border-white shadow-xl absolute -top-14 left-8 transform">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-600 text-white text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-20 md:mt-8 md:ml-36">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
                    <Badge 
                      className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 transition-colors ml-2 py-1.5"
                    >
                      {user.department}
                    </Badge>
                  </div>
                  
                  <div className="text-lg text-gray-600 mb-4 font-medium">{user.role}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="flex items-center text-sm">
                      <Mail size={18} className="text-blue-600 mr-3" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={18} className="text-blue-600 mr-3" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={18} className="text-blue-600 mr-3" />
                      <span className="text-gray-600">Desde {user.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Content Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-white/50 backdrop-blur-sm rounded-xl p-1 shadow-md">
              <TabsTrigger 
                value="allocations" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Alocações</span>
              </TabsTrigger>
              <TabsTrigger 
                value="info" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-300 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Informações</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Allocations Tab */}
            <TabsContent value="allocations" className="mt-0 space-y-6">
              <Card className="border-none rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="px-6 py-5 bg-white/90 border-b border-gray-100">
                  <CardTitle className="text-xl font-semibold text-gray-900">Alocações em Projetos</CardTitle>
                  <CardDescription>Alocações atuais em pacotes de trabalho e tarefas</CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  {groupedAllocations.length === 0 ? (
                    <div className="flex items-center justify-center h-40 bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Sem alocações atualmente</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {groupedAllocations.map((project) => (
                        <div key={project.id} className="rounded-lg border border-gray-200 overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleProject(project.id)}
                          >
                            <div className="flex items-center gap-3">
                              <Folder className="text-blue-600 h-5 w-5" />
                              <h3 className="font-medium">{project.name}</h3>
                              <Badge 
                                variant="outline" 
                                className="ml-2 bg-blue-50 text-blue-700 border-blue-100"
                              >
                                {project.workPackages.reduce((total, wp) => total + wp.tasks.length, 0)} tarefas
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={getTotalAllocation(project.id) * 100} 
                                  className="h-2 w-24 bg-gray-200"
                                />
                                <span className={`text-sm font-medium ${getTotalAllocation(project.id) > 0.8 ? 'text-rose-600' : 'text-gray-700'}`}>
                                  {(getTotalAllocation(project.id) * 100).toFixed(0)}%
                                </span>
                              </div>
                              {expandedProjects[project.id] ? 
                                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              }
                            </div>
                          </div>
                          
                          {expandedProjects[project.id] && (
                            <div className="divide-y divide-gray-100">
                              {project.workPackages.map((workPackage) => (
                                <div key={workPackage.id} className="px-4 py-3 bg-white">
                                  <div className="px-2 py-2 mb-2 bg-gray-50/80 rounded-md">
                                    <h4 className="text-sm font-medium text-gray-700 flex items-center">
                                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                      {workPackage.name}
                                    </h4>
                                  </div>
                                  
                                  <Table>
                                    <TableHeader>
                                      <TableRow className="bg-gray-50/50 hover:bg-gray-50/90">
                                        <TableHead className="w-1/3">Tarefa</TableHead>
                                        <TableHead className="w-1/5">Alocação</TableHead>
                                        <TableHead className="w-1/4">Período</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {workPackage.tasks.map((task) => (
                                        <TableRow key={task.taskId} className="hover:bg-gray-50/80 transition-colors">
                                          <TableCell className="font-medium">{task.taskName}</TableCell>
                                          <TableCell>
                                            <div className="flex items-center gap-2">
                                              <Progress 
                                                value={task.allocation * 100} 
                                                className={`h-2 w-16 bg-gray-200 ${getAllocationColor(task.allocation)}`}
                                              />
                                              <span className="text-sm text-gray-700">{(task.allocation * 100).toFixed(0)}%</span>
                                            </div>
                                          </TableCell>
                                          <TableCell>
                                            <div className="text-sm text-gray-600 flex items-center gap-1">
                                              <Calendar className="h-3 w-3 text-gray-400 mr-1" />
                                              {new Date(task.startDate).toLocaleDateString('pt-PT')} - {new Date(task.endDate).toLocaleDateString('pt-PT')}
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Information Tab */}
            <TabsContent value="info" className="mt-0 space-y-6">
              <Card className="border-none rounded-2xl shadow-lg bg-white/90 backdrop-blur-sm">
                <CardHeader className="px-6 py-5 bg-white/90 border-b border-gray-100">
                  <CardTitle className="text-xl font-semibold text-gray-900">Perfil Profissional</CardTitle>
                  <CardDescription>Informações sobre formação e competências</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Localização</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.location}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Biografia</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.bio}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Formação</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.education}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Competências</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {user.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Languages className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Idiomas</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {user.languages.map((language, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
