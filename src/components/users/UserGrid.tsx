import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, UserPlus, ArrowUpDown, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserGridProps {
  users: {
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
  }[];
}

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  const navigate = useNavigate();

  const handleRowClick = (userId: number) => {
    navigate(`/users/${userId}`);
    console.log(`Navegando para o utilizador: /users/${userId}`);
  };

  return (
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
          {users.map((user) => (
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
                    className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                    onClick={(e) => {
                      e.stopPropagation(); // Impede que o clique no botão acione a navegação
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length > 0 && (
        <div className="flex items-center justify-between py-4 px-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <p className="text-sm text-gray-500">A mostrar <span className="font-medium">{users.length}</span> utilizadores</p>
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
  );
};

export default UserGrid;
