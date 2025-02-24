
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockValidations = [
  {
    id: 1,
    title: "Validação de Relatório Final",
    project: "INOVC+",
    requestedBy: "João Silva",
    date: "2024-03-15",
    status: "pending",
    type: "report",
  },
  {
    id: 2,
    title: "Aprovação de Orçamento",
    project: "DreamFAB",
    requestedBy: "Maria Santos",
    date: "2024-03-14",
    status: "approved",
    type: "budget",
  },
  {
    id: 3,
    title: "Validação de Milestone",
    project: "IAMFat",
    requestedBy: "Pedro Costa",
    date: "2024-03-13",
    status: "rejected",
    type: "milestone",
  },
];

export default function Validations() {
  return (
    <div className="container py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Validações</h1>
          <p className="text-sm text-gray-500 mt-1">
            Gerencie as validações pendentes dos projetos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md transition-all duration-200 border border-gray-100/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-50 ring-1 ring-yellow-500/10">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm font-medium text-gray-500">Pendentes</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200 border border-gray-100/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50 ring-1 ring-green-500/10">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm font-medium text-gray-500">Aprovadas</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all duration-200 border border-gray-100/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-50 ring-1 ring-red-500/10">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm font-medium text-gray-500">Rejeitadas</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100/50">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Procurar validações..."
            className="pl-9 bg-gray-50/50 border-gray-100"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <Card className="border-gray-100/50">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockValidations.map((validation) => (
              <TableRow key={validation.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{validation.title}</TableCell>
                <TableCell>{validation.project}</TableCell>
                <TableCell>{validation.requestedBy}</TableCell>
                <TableCell>{new Date(validation.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "capitalize",
                    validation.status === 'pending' && "border-yellow-500/30 text-yellow-700 bg-yellow-50/50",
                    validation.status === 'approved' && "border-green-500/30 text-green-700 bg-green-50/50",
                    validation.status === 'rejected' && "border-red-500/30 text-red-700 bg-red-50/50"
                  )}>
                    {validation.status === 'pending' && 'Pendente'}
                    {validation.status === 'approved' && 'Aprovado'}
                    {validation.status === 'rejected' && 'Rejeitado'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
