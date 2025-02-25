import { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Users as UsersIcon, UserCheck, UserCog, Activity, Clock, MoreHorizontal, UserPlus, ArrowUpDown, Mail, Check, User as UserIcon, Calendar, BarChart, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  department: string;
  avatar?: string;
  initials: string;
  lastAccess: string;
  availability: number;
  regime: "Parcial" | "Inteiro";
  dataContratacao: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@star.pt",
    role: "Gestor",
    status: "active",
    department: "Recursos Humanos",
    initials: "JS",
    lastAccess: "Há 2 horas",
    availability: 12,
    regime: "Inteiro",
    dataContratacao: "15/03/2020"
  },
  {
    id: 2,
    name: "Ana Martins",
    email: "ana.martins@star.pt",
    role: "Administrador",
    status: "active",
    department: "Direção",
    initials: "AM",
    lastAccess: "Há 10 minutos",
    availability: 8,
    regime: "Inteiro",
    dataContratacao: "02/01/2019"
  },
  {
    id: 3,
    name: "Maria Costa",
    email: "maria.costa@star.pt",
    role: "Designer",
    status: "active",
    department: "Design",
    initials: "MC",
    lastAccess: "Há 1 dia",
    availability: 10,
    regime: "Parcial",
    dataContratacao: "10/06/2021"
  },
  {
    id: 4,
    name: "Pedro Santos",
    email: "pedro.santos@star.pt",
    role: "Desenvolvedor",
    status: "active",
    department: "Desenvolvimento",
    initials: "PS",
    lastAccess: "Agora",
    availability: 6,
    regime: "Inteiro",
    dataContratacao: "22/09/2020"
  },
  {
    id: 5,
    name: "Sofia Oliveira",
    email: "sofia.oliveira@star.pt",
    role: "Gestor",
    status: "active",
    department: "Gestão",
    initials: "SO",
    lastAccess: "Há 3 horas",
    availability: 9,
    regime: "Inteiro",
    dataContratacao: "05/04/2018"
  },
  {
    id: 6,
    name: "Rui Ferreira",
    email: "rui.ferreira@star.pt",
    role: "Suporte",
    status: "inactive",
    department: "Suporte",
    initials: "RF",
    lastAccess: "Há 2 semanas",
    availability: 0,
    regime: "Parcial",
    dataContratacao: "18/11/2022"
  },
  {
    id: 7,
    name: "Carla Mendes",
    email: "carla.mendes@star.pt",
    role: "Marketing",
    status: "inactive",
    department: "Marketing",
    initials: "CM",
    lastAccess: "Há 1 mês",
    availability: 0,
    regime: "Parcial",
    dataContratacao: "30/07/2021"
  }
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const navigate = useNavigate();

  const filteredUsers = mockUsers.filter(user => {
    const searchMatch = (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
    const roleMatch = roleFilter === "all" ? true : user.role.toLowerCase() === roleFilter.toLowerCase();
    return searchMatch && roleMatch;
  });

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-8xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Utilizadores</h1>
            <p className="text-sm text-gray-500">Gerencie os utilizadores do sistema</p>
          </div>
          <Button className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
            <Plus className="h-4 w-4" />
            Novo Utilizador
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px]">
            <div className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-blue-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-blue-100/80">
                <UsersIcon className="h-5 w-5 text-customBlue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Utilizadores</p>
                <p className="text-2xl font-semibold">{mockUsers.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px]">
            <div className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-green-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-green-100/80">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ativos</p>
                <p className="text-2xl font-semibold">{mockUsers.filter(u => u.status === "active").length}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px]">
            <div className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-amber-100/80">
                <UserCog className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Administradores</p>
                <p className="text-2xl font-semibold">{mockUsers.filter(u => u.role === "Administrador").length}</p>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-white/20 shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:translate-y-[-2px]">
            <div className="p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-purple-50/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-100/80">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ativos Hoje</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
          <div className="border-b border-white/20 p-6 flex items-center gap-4 bg-white/20 backdrop-blur-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Procurar utilizadores..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 bg-white/70 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-customBlue/20 text-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-customBlue/20 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                <SelectValue placeholder="Filtrar por cargo" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
                <SelectItem value="all" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Todos os cargos</SelectItem>
                <SelectItem value="administrador" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Administrador</SelectItem>
                <SelectItem value="gestor" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Gestor</SelectItem>
                <SelectItem value="designer" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Designer</SelectItem>
                <SelectItem value="desenvolvedor" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Desenvolvedor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/20 hover:bg-transparent">
                  <TableHead className="text-sm font-medium text-gray-700 py-4">
                    <div className="flex items-center gap-1">
                      Utilizador
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-customBlue">
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Email</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Cargo</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Regime</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">
                    <div className="flex items-center gap-1">
                      Data de Contratação
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-gray-400 hover:text-customBlue">
                        <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-sm font-medium text-gray-700 py-4">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="group border-b border-white/10 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer"
                    onClick={() => handleRowClick(user.id)}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-white/30 shadow-md group-hover:shadow-lg group-hover:ring-customBlue/30 transition-all duration-300 ease-in-out">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-blue-100/80 backdrop-blur-sm text-customBlue font-medium">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-customBlue transition-colors duration-300 ease-in-out">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.department}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 py-4">{user.email}</TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={cn(
                        'text-xs font-medium transition-all duration-300 ease-in-out shadow-sm',
                        user.role === 'Administrador' && 'border-purple-200 text-purple-700 bg-purple-50/70 backdrop-blur-sm',
                        user.role === 'Gestor' && 'border-blue-200 text-customBlue bg-blue-50/70 backdrop-blur-sm',
                        (user.role === 'Designer' || user.role === 'Desenvolvedor' || user.role === 'Suporte' || user.role === 'Marketing') && 'border-gray-200 text-gray-700 bg-gray-50/70 backdrop-blur-sm'
                      )}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className={cn(
                        'text-xs font-medium transition-all duration-300 ease-in-out shadow-sm',
                        user.regime === 'Inteiro' && 'border-green-200 text-green-700 bg-green-50/70 backdrop-blur-sm',
                        user.regime === 'Parcial' && 'border-orange-200 text-orange-700 bg-orange-50/70 backdrop-blur-sm'
                      )}>
                        {user.regime}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.dataContratacao}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-green-600 hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${user.id}/report`);
                          }}
                          title="Ver alocação"
                        >
                          <BarChart className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-blue-600 hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/users/${user.id}/generate-report`);
                          }}
                          title="Gerar Relatório"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Menu de opções adicionais
                          }}
                          title="Mais opções"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredUsers.length > 0 && (
              <div className="flex items-center justify-between py-4 px-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
                <p className="text-sm text-gray-500">A mostrar <span className="font-medium">{filteredUsers.length}</span> utilizadores</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-full text-xs gap-1 bg-white/60 hover:bg-white/80 border-white/40 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
                    <UserPlus className="h-3 w-3" />
                    Exportar
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 bg-white/60 hover:bg-white/80 border-white/40 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">1</Button>
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 bg-customBlue text-white border-customBlue hover:bg-customBlue/90 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">2</Button>
                    <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0 bg-white/60 hover:bg-white/80 border-white/40 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">3</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="py-16 text-center bg-white/10 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gray-100/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2 max-w-md mx-auto px-4">
                  <p className="text-lg font-medium text-gray-700">Nenhum utilizador encontrado</p>
                  <p className="text-sm text-gray-500">Experimente ajustar os filtros de pesquisa ou remover o termo de pesquisa para ver todos os utilizadores.</p>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-2 rounded-full bg-white/60 hover:bg-white/80 border-white/40 text-gray-700 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("all");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Users;
