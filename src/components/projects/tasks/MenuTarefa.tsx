
import { useState, useEffect } from "react";
import { type Task } from "@/types/project";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  Check,
  Calendar,
  Clock,
  FileText,
  Upload,
  File,
  X,
  FileCheck,
  Paperclip,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface Entregavel {
  id: string;
  nome: string;
  descricao?: string;
  data?: string;
  anexo?: string;
}

// Estendendo a interface Task para incluir entregáveis
interface TaskWithEntregaveis extends Task {
  entregaveis?: Entregavel[];
}

interface MenuTarefaProps {
  task: TaskWithEntregaveis;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: TaskWithEntregaveis) => void;
  onMarkCompleted?: (taskId: number) => void;
}

export function MenuTarefa({
  task: initialTask,
  open,
  onClose,
  onUpdate,
  onMarkCompleted,
}: MenuTarefaProps) {
  const [task, setTask] = useState<TaskWithEntregaveis>(initialTask);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleUpdateTask = (updates: Partial<TaskWithEntregaveis>) => {
    const updatedTask = { ...task, ...updates };
    setTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleStatusChange = (newStatus: boolean) => {
    handleUpdateTask({ status: newStatus ? "completed" : "pending" });
    if (newStatus && onMarkCompleted) {
      onMarkCompleted(task.id);
    }
  };

  const handleFileUpload = (entregavelId: string, file: File) => {
    setUploading(prev => ({ ...prev, [entregavelId]: true }));
    
    // Simulação de upload - em produção, substituir por API real
    setTimeout(() => {
      const updatedEntregaveis = task.entregaveis?.map(entregavel => 
        entregavel.id === entregavelId 
          ? { ...entregavel, anexo: file.name } 
          : entregavel
      ) || [];
      
      handleUpdateTask({ entregaveis: updatedEntregaveis });
      setUploading(prev => ({ ...prev, [entregavelId]: false }));
      toast.success(`Ficheiro "${file.name}" enviado com sucesso!`);
    }, 1500);
  };

  const getEntregaveisProgress = () => {
    if (!task.entregaveis?.length) return 0;
    const completedCount = task.entregaveis.filter(e => e.anexo).length;
    return (completedCount / task.entregaveis.length) * 100;
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full lg:w-[500px] p-0 overflow-y-auto sm:max-w-none bg-gradient-to-b from-gray-50 to-gray-100 shadow-2xl border-l border-white/20 rounded-l-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-white/20 p-6 bg-white/70 backdrop-blur-sm">
            <SheetHeader className="space-y-4">
              <div className="flex flex-col items-start">
                <Input
                  value={task.name}
                  onChange={(e) => handleUpdateTask({ name: e.target.value })}
                  className="text-xl font-semibold bg-transparent border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-900"
                  autoFocus={false}
                />
                <div className="flex items-center justify-between w-full mt-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm backdrop-blur-sm shadow-sm",
                      task.status === "completed"
                        ? "border-emerald-200 text-emerald-600 bg-emerald-50/70"
                        : "border-amber-200 text-amber-600 bg-amber-50/70"
                    )}
                  >
                    {task.status === "completed" ? "Concluído" : "Pendente"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(task.status !== "completed")}
                    className={cn(
                      "gap-2 rounded-full border shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
                      task.status === "completed"
                        ? "text-amber-600 border-amber-200 hover:bg-amber-50/70 backdrop-blur-sm"
                        : "text-emerald-600 border-emerald-200 hover:bg-emerald-50/70 backdrop-blur-sm"
                    )}
                  >
                    {task.status === "completed" ? (
                      <>
                        <X className="h-4 w-4" />
                        Marcar como Pendente
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Marcar como Concluída
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/70 p-3 shadow-md backdrop-blur-sm border border-white/30 w-full">
                  <div className="h-8 w-8 rounded-full bg-blue-50/70 flex items-center justify-center shadow-sm">
                    <Calendar className="h-4 w-4 text-customBlue" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-500">Período</p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={task.startDate}
                        onChange={(e) =>
                          handleUpdateTask({ startDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                      <span className="text-gray-600">-</span>
                      <Input
                        type="date"
                        value={task.endDate}
                        onChange={(e) =>
                          handleUpdateTask({ endDate: e.target.value })
                        }
                        className="text-sm border border-gray-200 rounded-md p-2 w-32 focus:ring-customBlue/50 hover:border-customBlue/50 transition-all duration-300 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="h-4 w-4 text-customBlue" />
                Descrição
              </Label>
              <Textarea
                value={task.description}
                onChange={(e) => handleUpdateTask({ description: e.target.value })}
                className="min-h-[100px] border border-gray-200 rounded-xl p-3 text-gray-900 focus:ring-customBlue/20 bg-white/70 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              />
            </div>

            {/* Entregáveis Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-50/70 flex items-center justify-center shadow-sm">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900">Entregáveis</h3>
                </div>
                
                {task.entregaveis?.length ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {task.entregaveis.filter(e => e.anexo).length} de {task.entregaveis.length} entregue(s)
                    </span>
                    <Progress value={getEntregaveisProgress()} className="w-24 h-2" />
                  </div>
                ) : null}
              </div>

              {task.entregaveis?.length ? (
                <div className="space-y-4">
                  {task.entregaveis.map((entregavel) => (
                    <Card 
                      key={entregavel.id} 
                      className="glass-card border-white/20 p-4 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out rounded-xl overflow-hidden"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          {entregavel.anexo ? (
                            <FileCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <File className="h-4 w-4 text-amber-600" />
                          )}
                          {entregavel.nome}
                        </h4>
                        {entregavel.data && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {new Date(entregavel.data).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      
                      {entregavel.descricao && (
                        <p className="text-sm text-gray-600 mb-3">{entregavel.descricao}</p>
                      )}
                      
                      {entregavel.anexo ? (
                        <div className="flex items-center justify-between p-2 rounded-lg bg-green-50/50 border border-green-100">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-700">{entregavel.anexo}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              const updatedEntregaveis = task.entregaveis?.map(e => 
                                e.id === entregavel.id ? { ...e, anexo: undefined } : e
                              );
                              handleUpdateTask({ entregaveis: updatedEntregaveis });
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <Label htmlFor={`file-${entregavel.id}`} className="w-full">
                            <div className={cn(
                              "flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-gray-300 text-gray-500 cursor-pointer hover:bg-gray-50 transition-all duration-200",
                              uploading[entregavel.id] ? "bg-blue-50/50 border-blue-200" : ""
                            )}>
                              {uploading[entregavel.id] ? (
                                <span className="text-sm">A carregar ficheiro...</span>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4" />
                                  <span className="text-sm">Carregar entregável</span>
                                </>
                              )}
                            </div>
                          </Label>
                          <Input
                            id={`file-${entregavel.id}`}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(entregavel.id, e.target.files[0]);
                              }
                            }}
                            disabled={uploading[entregavel.id]}
                          />
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 flex flex-col items-center justify-center text-gray-500 border-dashed border-gray-300 bg-white/50">
                  <FileText className="h-12 w-12 mb-3 text-gray-300" />
                  <p className="text-center">Não existem entregáveis definidos para esta tarefa.</p>
                </Card>
              )}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                className="rounded-full bg-customBlue hover:bg-customBlue/90 text-white gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={onClose}
              >
                <Check className="h-4 w-4" />
                Guardar Alterações
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
