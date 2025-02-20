
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
import { Check, X } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

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
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
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
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Validações</h1>
        <p className="text-muted-foreground">Aprove ou rejeite solicitações pendentes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projetos Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validations.map((validation) => (
                <TableRow key={validation.id}>
                  <TableCell>
                    <Link to={`/projects/${validation.id}`} className="hover:underline">
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
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <Check size={16} />
                              Aprovar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação irá aprovar a validação.
                                Tem a certeza que pretende continuar?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleApprove(validation.id)}
                              >
                                Confirmar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <X size={16} />
                              Rejeitar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação irá rejeitar a validação.
                                Tem a certeza que pretende continuar?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleReject(validation.id)}
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Validations;
