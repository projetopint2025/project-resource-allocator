
import { useState } from "react";
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
  ArrowLeft
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
      workPackageId: 1,
      workPackageName: "WP1 - Análise",
      taskId: 2,
      taskName: "Gestão de requisitos",
      projectId: 2,
      projectName: "DigitalHealth",
      allocation: 0.3,
      startDate: "2023-02-01",
      endDate: "2023-12-31"
    }
  ]
};

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("allocations");
  
  // In a real application, we would fetch the user data using the id parameter
  const user = mockUser;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-6 lg:px-8 custom-blue-blur">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Page Header with Back Button */}
        <div className="flex items-center justify-between">
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
          <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-customBlue relative" />
            <CardContent className="pt-0 relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl absolute -top-12 left-8 transform">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-customBlue to-blue-600 text-white text-xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-16 md:mt-4 md:ml-32">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <Badge 
                      variant="outline" 
                      className="bg-blue-50/80 text-customBlue border-blue-200/50 backdrop-blur-sm"
                    >
                      {user.department}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-1">{user.role}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center text-sm">
                      <Mail size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">{user.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar size={16} className="text-customBlue mr-3" />
                      <span className="text-gray-600">Desde {user.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Content Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-white/40 backdrop-blur-sm rounded-xl p-1 shadow-md">
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
              <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                  <CardTitle className="text-lg font-semibold text-gray-900">Alocações em Projetos</CardTitle>
                  <CardDescription>Alocações atuais em pacotes de trabalho e tarefas</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {user.allocations.length === 0 ? (
                    <div className="flex items-center justify-center h-40 bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
                      <p className="text-gray-500">Sem alocações atualmente</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead>Projeto</TableHead>
                          <TableHead>Pacote de Trabalho</TableHead>
                          <TableHead>Tarefa</TableHead>
                          <TableHead>Alocação</TableHead>
                          <TableHead>Período</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.allocations.map((allocation, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/80 transition-colors">
                            <TableCell className="font-medium">{allocation.projectName}</TableCell>
                            <TableCell>{allocation.workPackageName}</TableCell>
                            <TableCell>{allocation.taskName}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={allocation.allocation * 100} 
                                  className="h-2 w-16 bg-gray-100"
                                />
                                <span className="text-sm text-gray-700">{(allocation.allocation * 100).toFixed(0)}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-gray-600">
                                {new Date(allocation.startDate).toLocaleDateString('pt-PT')} - {new Date(allocation.endDate).toLocaleDateString('pt-PT')}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Information Tab */}
            <TabsContent value="info" className="mt-0 space-y-6">
              <Card className="border-none rounded-2xl shadow-xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
                <CardHeader className="px-6 py-4 bg-white/20 backdrop-blur-sm border-b border-white/10">
                  <CardTitle className="text-lg font-semibold text-gray-900">Perfil Profissional</CardTitle>
                  <CardDescription>Informações sobre formação e competências</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-customBlue mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Localização</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.location}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <FileText className="w-5 h-5 text-customBlue mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Biografia</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.bio}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <GraduationCap className="w-5 h-5 text-customBlue mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Formação</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{user.education}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-customBlue mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Competências</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {user.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1.5 bg-white/60 border-white/20 backdrop-blur-sm shadow-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <Languages className="w-5 h-5 text-customBlue mr-2" />
                      <h3 className="text-md font-medium text-gray-900">Idiomas</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {user.languages.map((language, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1.5 bg-white/60 border-white/20 backdrop-blur-sm shadow-sm"
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
