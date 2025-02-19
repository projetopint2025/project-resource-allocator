import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: 1, name: "João Silva", email: "joao.silva@star.pt", role: "Analista", status: "Ativo" },
  { id: 2, name: "Maria Santos", email: "maria.santos@star.pt", role: "Product Owner", status: "Ativo" },
  { id: 3, name: "Pedro Costa", email: "pedro.costa@star.pt", role: "Desenvolvedor", status: "Inativo" },
  { id: 4, name: "Ana Oliveira", email: "ana.oliveira@star.pt", role: "Designer", status: "Ativo" },
];

const Users = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Utilizadores</h1>
          <p className="text-muted-foreground">Gerencie os utilizadores do sistema</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Novo Utilizador
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Utilizadores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      user.status === "Ativo" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    )}>
                      {user.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
