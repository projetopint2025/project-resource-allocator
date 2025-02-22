
import { type Task } from "@/types/project";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskSidebarProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onMarkCompleted: (taskId: number) => void;
}

export function TaskSidebar({
  task,
  open,
  onClose,
  onMarkCompleted,
}: TaskSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[600px] p-0 overflow-y-auto">
        <div className="h-full flex flex-col">
          <div className="border-b p-6 bg-gray-50/80">
            <SheetHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl font-semibold">{task.name}</SheetTitle>
                <Badge variant="outline" className={cn(
                  task.status === 'completed' && 'border-green-500 text-green-700 bg-green-50',
                  task.status === 'in-progress' && 'border-blue-500 text-blue-700 bg-blue-50',
                  task.status === 'pending' && 'border-gray-500 text-gray-700 bg-gray-50'
                )}>
                  {task.status === 'completed' ? 'Concluído' : 
                   task.status === 'in-progress' ? 'Em Progresso' : 
                   'Pendente'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(task.startDate).toLocaleDateString('pt-BR')}</span>
                  <span>-</span>
                  <span>{new Date(task.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkCompleted(task.id)}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Marcar como Concluída
                </Button>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-6">
            {task.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                <p className="text-sm text-gray-700">{task.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-500">Recursos</h3>
              </div>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Perfil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {task.resources?.map((resource) => (
                      <TableRow key={resource.name}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.profile}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {task.rationale && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Fundamentação</h3>
                <Card className="p-4">
                  <p className="text-sm text-gray-700">{task.rationale}</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
