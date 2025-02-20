
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Inativo";
  availability: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@star.pt",
    role: "Gestor",
    status: "Ativo",
    availability: 12,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@star.pt",
    role: "Product Owner",
    status: "Ativo",
    availability: 3,
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro.costa@star.pt",
    role: "Desenvolvedor",
    status: "Inativo",
    availability: 8,
  },
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

  const getAvailabilityColor = (availability: number) => {
    if (availability <= 4) return "text-red-600 bg-red-50";
    if (availability <= 8) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const uniqueRoles = Array.from(new Set(mockUsers.map(user => user.role)));

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Utilizadores</h1>
          <p className="text-muted-foreground mt-1">Gerencie os utilizadores do sistema</p>
        </div>
        <Button className="bg-customBlue hover:bg-customBlue/90">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Utilizador
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar utilizadores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as funções</SelectItem>
            {uniqueRoles.map(role => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardHeader className="bg-customBlue-subtle py-4">
          <CardTitle className="text-customBlue">Lista de Utilizadores</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-20rem)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Disponibilidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "Ativo" ? "default" : "secondary"}
                        className={user.status === "Ativo" ? "bg-customBlue" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-3 py-1 font-medium",
                          getAvailabilityColor(user.availability)
                        )}
                      >
                        {user.availability}h
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum utilizador encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
