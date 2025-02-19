
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const mockValidations = [
  {
    id: 1,
    project: "INOVC+",
    type: "Relatório de Requisitos",
    requester: "João Silva",
    status: "Pendente",
    date: "2024-04-25",
  },
  {
    id: 2,
    project: "DreamFAB",
    type: "Folhas de Horas",
    requester: "Maria Santos",
    status: "Aprovado",
    date: "2024-04-20",
  },
  {
    id: 3,
    project: "IAMFat",
    type: "Folhas de Horas",
    requester: "Pedro Costa",
    status: "Rejeitado",
    date: "2024-04-18",
  },
];

const Validations = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Validações</h1>
        <p className="text-muted-foreground">Aprove ou rejeite solicitações pendentes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Solicitações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockValidations.map((validation) => (
                <TableRow key={validation.id}>
                  <TableCell>{validation.project}</TableCell>
                  <TableCell>{validation.type}</TableCell>
                  <TableCell>{validation.requester}</TableCell>
                  <TableCell>{new Date(validation.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full",
                      validation.status === "Aprovado" 
                        ? "bg-green-100 text-green-700"
                        : validation.status === "Rejeitado"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}>
                      {validation.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {validation.status === "Pendente" && (
                        <>
                          <Button size="sm" variant="ghost" className="text-green-600">
                            <Check size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600">
                            <X size={16} />
                          </Button>
                        </>
                      )}
                    </div>
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
