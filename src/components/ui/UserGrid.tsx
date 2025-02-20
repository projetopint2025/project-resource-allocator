
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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  availability: number;
}

interface UserGridProps {
  users: User[];
}

const getAvailabilityColor = (availability: number) => {
  if (availability <= 4) {
    return "bg-red-500 text-white";
  } else if (availability <= 8) {
    return "bg-yellow-500 text-gray-800";
  } else {
    return "bg-green-500 text-white";
  }
};

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
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
            {users.map((user) => (
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserGrid;
