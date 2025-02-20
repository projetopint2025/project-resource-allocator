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
import { Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface Validation {
  id: number;
  project: string;
  requester: string;
  status: "Pendente" | "Aprovado" | "Rejeitado";
  date: string;
}

const mockValidations: Validation[] = [
  {
    id: 1,
    project: "INOVC+",
    requester: "João Silva",
    status: "Pendente",
    date: "2024-04-25",
  },
  {
    id: 2,
    project: "DreamFAB",
    requester: "Maria Santos",
    status: "Aprovado",
    date: "2024-04-20",
  },
  {
    id: 3,
    project: "IAMFat",
    requester: "Pedro Costa",
    status: "Rejeitado",
    date: "2024-04-18",
  },
];

const Validations = () => {
  const [validations, setValidations] = useState<Validation[]>(mockValidations);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredValidations = validations.filter(validation =>
    validation.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    validation.requester.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: number) => {
    setValidations(
      validations.map((validation) =>
        validation.id === id ? { ...validation, status: "Aprovado" } : validation
      )
    );
    toast({
      title: "Aprovado!",
      description: "Validação aprovada com sucesso.",
    });
  };

  const handleReject = (id: number) => {
    setValidations(
      validations.map((validation) =>
        validation.id === id ? { ...validation, status: "Rejeitado" } : validation
      )
    );
    toast({
      title: "Rejeitado!",
      description: "Validação rejeitada.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aprovado":
        return (
          <Badge variant="default" className="bg-customBlue text-white">
            {status}
          </Badge>
        );
      case "Rejeitado":
        return (
          <Badge variant="destructive">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Validações</h1>
          <p className="text-muted-foreground mt-1">Gerencie as solicitações de validação dos projetos</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar por projeto ou solicitante..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardHeader className="bg-customBlue-subtle py-4">
          <CardTitle className="text-customBlue">Solicitações de Validação</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto h-[calc(100vh-20rem)]">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Projeto</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right pr-6">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredValidations.map((validation) => (
                  <TableRow key={validation.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <Link 
                        to={`/projects/${validation.id}`} 
                        className="font-medium text-customBlue hover:underline"
                      >
                        {validation.project}
                      </Link>
                    </TableCell>
                    <TableCell>{validation.requester}</TableCell>
                    <TableCell>
                      {new Date(validation.date).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{getStatusBadge(validation.status)}</TableCell>
                    <TableCell className="text-right">
                      {validation.status === "Pendente" && (
                        <div className="flex justify-end gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <Check size={16} className="mr-1" />
                                Aprovar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Aprovação</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja aprovar esta validação?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleApprove(validation.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X size={16} className="mr-1" />
                                Rejeitar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar Rejeição</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja rejeitar esta validação?
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleReject(validation.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Confirmar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredValidations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhuma validação encontrada
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

export default Validations;
