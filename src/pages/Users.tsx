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
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

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
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana.oliveira@star.pt",
    role: "Designer",
    status: "Ativo",
    availability: 6,
  },
  {
    id: 5,
    name: "Ricardo Pereira",
    email: "ricardo.pereira@star.pt",
    role: "Infraestrutura",
    status: "Ativo",
    availability: 10,
  },
  {
    id: 6,
    name: "Sofia Castro",
    email: "sofia.castro@star.pt",
    role: "Gerente de Projeto",
    status: "Ativo",
    availability: 12,
  },
];

const getAvailabilityColor = (availability: number) => {
  if (availability <= 4) {
    return "bg-red-500 text-white";
  } else if (availability <= 8) {
    return "bg-yellow-500 text-gray-800";
  } else {
    return "bg-green-500 text-white";
  }
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(mockUsers);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Utilizadores</h2>
          <p className="text-muted-foreground">Consulte os utilizadores do sistema</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Utilizador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Utilizadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="search"
              placeholder="Pesquisar utilizador..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Disponibilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "Ativo" ? "outline" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn(
                      "px-3 py-1 font-semibold rounded-full",
                      getAvailabilityColor(user.availability)
                    )}>
                      {user.availability}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Nenhum utilizador encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;