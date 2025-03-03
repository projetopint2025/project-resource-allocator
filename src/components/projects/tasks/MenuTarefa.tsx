
import { useState, useEffect } from "react";
import { X, Upload, Check, AlertCircle, FileText, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type Task, type Entregavel, TaskStatus } from "@/types/project";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MenuTarefaProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export function MenuTarefa({ task, open, onClose, onUpdate }: MenuTarefaProps) {
  const [localTask, setLocalTask] = useState<Task>(task);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({});
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadError, setUploadError] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    setLocalTask(task);
    // Reset files state when task changes
    setFiles({});
    setUploading({});
    setUploadError({});
  }, [task]);

  const handleToggleStatus = () => {
    const updatedTask = {
      ...localTask,
      status: localTask.status === TaskStatus.completed ? TaskStatus.pending : TaskStatus.completed
    };
    setLocalTask(updatedTask);
    onUpdate(updatedTask);
  };

  const handleFileChange = (entregavelId: string, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [entregavelId]: file
    }));
  };

  const handleUpload = (entregavelId: string) => {
    const file = files[entregavelId];
    if (!file) return;

    setUploading(prev => ({ ...prev, [entregavelId]: true }));
    setUploadError(prev => ({ ...prev, [entregavelId]: null }));

    // Simulate file upload
    setTimeout(() => {
      // In a real app, you would upload the file to your server/cloud storage here
      // and get back a URL to store in the task

      // Update the task with the new file URL (in a real app, this would be the actual URL)
      const updatedEntregaveis = localTask.entregaveis?.map(e => 
        e.id === entregavelId 
          ? { ...e, anexo: URL.createObjectURL(file) }
          : e
      ) || [];

      const updatedTask = {
        ...localTask,
        entregaveis: updatedEntregaveis
      };

      setLocalTask(updatedTask);
      onUpdate(updatedTask);
      setUploading(prev => ({ ...prev, [entregavelId]: false }));
    }, 1500);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data não definida";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Data inválida";
    }
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto border-none glass-card border-white/20 shadow-xl backdrop-blur-sm">
        <ScrollArea className="h-[calc(100vh-8rem)] overflow-y-auto pr-4">
          <SheetHeader className="space-y-2">
            <SheetTitle className="text-xl font-bold flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                {localTask.name}
                <Badge 
                  className={cn(
                    localTask.status === TaskStatus.completed 
                      ? "bg-emerald-50/70 text-emerald-600 border-emerald-200 backdrop-blur-sm shadow-sm" 
                      : "bg-amber-50/70 text-amber-600 border-amber-200 backdrop-blur-sm shadow-sm"
                  )}
                >
                  {localTask.status === TaskStatus.completed ? "Concluída" : "Pendente"}
                </Badge>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="rounded-full hover:bg-white/20 transition-all duration-300 ease-in-out"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>

            <SheetDescription className="text-gray-600">
              <div className="grid grid-cols-2 gap-4 mt-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-customBlue" />
                  <div>
                    <span className="text-xs text-gray-500">Data de Início</span>
                    <p className="font-medium">{formatDate(localTask.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-customBlue" />
                  <div>
                    <span className="text-xs text-gray-500">Data de Fim</span>
                    <p className="font-medium">{formatDate(localTask.endDate)}</p>
                  </div>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 bg-white/5 p-5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-base font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-customBlue" />
              Descrição
            </h3>
            <p className="text-sm text-gray-600">{localTask.description || "Sem descrição disponível."}</p>
          </div>
          
          <Separator className="my-6 opacity-30" />
          
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-customBlue" />
              Entregáveis
            </h3>
            
            {localTask.entregaveis && localTask.entregaveis.length > 0 ? (
              <div className="space-y-6">
                {localTask.entregaveis.map((entregavel) => (
                  <div key={entregavel.id} className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                    <h4 className="font-medium text-gray-800 mb-1">{entregavel.nome}</h4>
                    {entregavel.descricao && (
                      <p className="text-sm text-gray-600 mb-3">{entregavel.descricao}</p>
                    )}
                    
                    <div className="mt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          {entregavel.anexo ? (
                            <div className="flex items-center justify-between bg-white/30 p-3 rounded-xl border border-white/30 shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-emerald-50/70 flex items-center justify-center shadow-sm backdrop-blur-sm">
                                  <Check className="h-4 w-4 text-emerald-600" />
                                </div>
                                <div className="text-sm">
                                  <p className="font-medium">Anexo enviado</p>
                                  <a 
                                    href={entregavel.anexo} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-customBlue hover:underline"
                                  >
                                    Ver anexo
                                  </a>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const updatedEntregaveis = localTask.entregaveis?.map(e => 
                                    e.id === entregavel.id ? { ...e, anexo: undefined } : e
                                  );
                                  setLocalTask({
                                    ...localTask,
                                    entregaveis: updatedEntregaveis
                                  });
                                  onUpdate({
                                    ...localTask,
                                    entregaveis: updatedEntregaveis
                                  });
                                }}
                                className="text-xs text-red-600 rounded-full hover:bg-white/20"
                              >
                                Remover
                              </Button>
                            </div>
                          ) : (
                            <div className="bg-white/20 p-4 rounded-xl border border-white/30 shadow-sm">
                              <Label htmlFor={`file-${entregavel.id}`} className="text-xs text-gray-500 mb-1 block">
                                Anexar ficheiro
                              </Label>
                              <div className="flex gap-2">
                                <Input
                                  id={`file-${entregavel.id}`}
                                  type="file"
                                  onChange={(e) => handleFileChange(entregavel.id, e.target.files?.[0] || null)}
                                  className="flex-1 text-sm bg-white/40 backdrop-blur-sm border-white/30 rounded-lg focus:ring-customBlue/30"
                                />
                                <Button
                                  onClick={() => handleUpload(entregavel.id)}
                                  disabled={!files[entregavel.id] || uploading[entregavel.id]}
                                  className="gap-1 bg-customBlue hover:bg-customBlue/90 rounded-lg shadow-sm"
                                  size="sm"
                                >
                                  {uploading[entregavel.id] ? (
                                    <span>Enviando...</span>
                                  ) : (
                                    <>
                                      <Upload className="h-4 w-4" />
                                      <span>Enviar</span>
                                    </>
                                  )}
                                </Button>
                              </div>
                              {uploadError[entregavel.id] && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>{uploadError[entregavel.id]}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
                Não existem entregáveis definidos para esta tarefa.
              </p>
            )}
          </div>
        </ScrollArea>
        
        <SheetFooter className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 shadow-sm">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-sm border-white/30 transition-all duration-300 ease-in-out"
          >
            Fechar
          </Button>
          <Button
            onClick={handleToggleStatus}
            className={cn(
              "rounded-full shadow-sm hover:shadow-md transition-all duration-300 ease-in-out",
              localTask.status === TaskStatus.completed 
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            )}
          >
            {localTask.status === TaskStatus.completed ? "Marcar como Pendente" : "Marcar como Concluída"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
