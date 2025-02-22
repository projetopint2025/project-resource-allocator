import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, Users as UsersIcon, UserCheck, UserCog, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserGrid from "@/components/ui/UserGrid";

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
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@star.pt",
    role: "manager",
    status: "active",
    department: "Recursos Humanos",
    initials: "JS",
    lastAccess: "Há 2 horas",
    availability: 12,
  },
  // ... outros usuários
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const searchMatch = (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
    const roleMatch = roleFilter === "all" ? true : user.role === roleFilter;
    return searchMatch && roleMatch;
  });

  return (
    <div className="container space-y-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Utilizadores</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie os utilizadores do sistema
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Utilizador
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-2">
            <div className="p-2 w-fit rounded-lg bg-blue-100/50 ring-1 ring-blue-500/10">
              <UsersIcon className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
            <p className="text-sm font-medium text-gray-500">Total Utilizadores</p>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-2">
            <div className="p-2 w-fit rounded-lg bg-green-100/50 ring-1 ring-green-500/10">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockUsers.filter(u => u.status === "active").length}
            </p>
            <p className="text-sm font-medium text-gray-500">Ativos</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-2">
            <div className="p-2 w-fit rounded-lg bg-yellow-100/50 ring-1 ring-yellow-500/10">
              <UserCog className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockUsers.filter(u => u.role === "admin").length}
            </p>
            <p className="text-sm font-medium text-gray-500">Administradores</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-2">
            <div className="p-2 w-fit rounded-lg bg-purple-100/50 ring-1 ring-purple-500/10">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm font-medium text-gray-500">Ativos Hoje</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar utilizadores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os cargos</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="manager">Gestor</SelectItem>
            <SelectItem value="user">Utilizador</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Grid */}
      <div className="overflow-auto">
        <UserGrid users={filteredUsers} />
      </div>
    </div>
  );
};

export default Users;
