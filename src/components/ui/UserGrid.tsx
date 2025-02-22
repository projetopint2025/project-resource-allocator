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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

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
  }[];
}

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead>Utilizador</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Disponibilidade</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.department}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{user.email}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(
                  'text-xs font-medium',
                  user.role === 'admin' && 'border-purple-500 text-purple-700 bg-purple-50',
                  user.role === 'manager' && 'border-blue-500 text-blue-700 bg-blue-50',
                  user.role === 'user' && 'border-gray-500 text-gray-700 bg-gray-50'
                )}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(
                  'text-xs font-medium',
                  user.status === 'active' && 'border-green-500 text-green-700 bg-green-50',
                  user.status === 'inactive' && 'border-gray-500 text-gray-700 bg-gray-50'
                )}>
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-100 rounded-full h-2">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        user.availability > 8 ? "bg-green-500" :
                        user.availability > 4 ? "bg-yellow-500" : "bg-red-500"
                      )}
                      style={{ width: `${(user.availability/12)*100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{user.availability}h</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserGrid;
