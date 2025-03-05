
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { 
  CalendarIcon, 
  FileIcon, 
  XIcon, 
  ClockIcon, 
  CheckIcon, 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  Package,
  Euro
} from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rubrica } from "@prisma/client";

interface MenuWorkpackageProps {
  workpackageId: string;
  open: boolean;
  onClose: () => void;
}

export function MenuWorkpackage({ workpackageId, open, onClose }: MenuWorkpackageProps) {
  const [editingName, setEditingName] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addingMaterial, setAddingMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    nome: "",
    preco: 0,
    quantidade: 0,
    rubrica: "MATERIAIS" as Rubrica,
    ano_utilizacao: new Date().getFullYear()
  });

  const { data: workpackage, refetch: refetchWorkpackage } = api.workpackage.getById.useQuery(
    { id: workpackageId },
    { enabled: !!workpackageId && open }
  );

  const updateWorkpackageMutation = api.workpackage.update.useMutation({
    onSuccess: () => {
      refetchWorkpackage();
      toast.success("Workpackage atualizado");
    }
  });

  const createMaterialMutation = api.workpackage.addMaterial.useMutation({
    onSuccess: () => {
      refetchWorkpackage();
      setAddingMaterial(false);
      setNewMaterial({
        nome: "",
        preco: 0,
        quantidade: 0,
        rubrica: "MATERIAIS" as Rubrica,
        ano_utilizacao: new Date().getFullYear()
      });
      toast.success("Material adicionado");
    }
  });

  const deleteMaterialMutation = api.workpackage.removeMaterial.useMutation({
    onSuccess: () => {
      refetchWorkpackage();
      toast.success("Material removido");
    }
  });

  if (!workpackage) {
    return (
      <Sheet open={open} onOpenChange={onClose} modal={false}>
        <SheetContent 
          className="p-0 w-[450px] bg-gradient-to-br from-gray-50 to-gray-100/50 shadow-2xl rounded-l-2xl border-l border-gray-200/50"
        >
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-75"></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const handleEstadoChange = async () => {
    await updateWorkpackageMutation.mutate({
      id: workpackageId,
      estado: !workpackage.estado
    });
  };

  const handleNameSave = async () => {
    if (newName.trim() === "") return;
    await updateWorkpackageMutation.mutate({
      id: workpackageId,
      nome: newName
    });
    setEditingName(false);
  };

  const handleDescriptionSave = async () => {
    await updateWorkpackageMutation.mutate({
      id: workpackageId,
      descricao: newDescription
    });
    setEditingDescription(false);
  };

  const handleDateChange = async (field: 'inicio' | 'fim', date: Date | undefined) => {
    await updateWorkpackageMutation.mutate({
      id: workpackageId,
      [field]: date
    });
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.nome || newMaterial.quantidade <= 0 || newMaterial.preco <= 0) {
      toast.error("Preencha todos os campos do material corretamente");
      return;
    }
    await createMaterialMutation.mutate({ workpackageId, ...newMaterial });
  };

  return (
    <Sheet open={open} onOpenChange={onClose} modal={false}>
      <SheetContent 
        className="w-full lg:w-[640px] p-0 overflow-y-auto sm:max-w-none bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl shadow-2xl border-l border-gray-200/50 rounded-l-3xl"
      >
        <div className="h-full flex flex-col">
          {/* Header renovado com menos azul */}
          <div className="border-b border-gray-200/50 bg-gradient-to-b from-white via-white to-gray-50 p-8 sticky top-0 z-10">
            <SheetHeader className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  {editingName ? (
                    <div className="flex items-center gap-3 w-full">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 text-lg font-medium rounded-xl"
                        placeholder="Nome do workpackage"
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={handleNameSave}
                          className="h-10 w-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setEditingName(false)}
                          className="h-10 w-10 rounded-xl hover:bg-red-50 text-red-500"
                        >
                          <XIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                        {workpackage.nome}
                      </h2>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setNewName(workpackage.nome);
                          setEditingName(true);
                        }}
                        className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Button 
                    variant="ghost"
                    onClick={onClose}
                    className="h-10 w-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    className={cn(
                      "rounded-xl px-4 py-1.5 font-medium cursor-pointer transition-all duration-200",
                      workpackage.estado
                        ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                    )}
                    onClick={handleEstadoChange}
                  >
                    {workpackage.estado ? "Concluído" : "Em progresso"}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {workpackage.inicio && workpackage.fim && (
                      <>
                        {format(new Date(workpackage.inicio), "dd MMM", { locale: ptBR })} - 
                        {format(new Date(workpackage.fim), "dd MMM yyyy", { locale: ptBR })}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </SheetHeader>
          </div>

          <ScrollArea className="flex-1 px-8">
            <div className="py-8 space-y-8">
              {/* Descrição renovada com menos azul */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <FileIcon className="h-5 w-5 text-gray-700" />
                    </div>
                    <h3 className="text-base font-medium text-gray-700">Descrição</h3>
                  </div>
                  {!editingDescription && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setNewDescription(workpackage.descricao || "");
                        setEditingDescription(true);
                      }}
                      className="h-8 w-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <Card className="border border-gray-200/50 shadow-lg bg-white/70 backdrop-blur-sm p-6 rounded-xl">
                  {editingDescription ? (
                    <div className="space-y-4">
                      <Textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="min-h-[120px] border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl"
                        placeholder="Descrição do workpackage"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => setEditingDescription(false)}
                          className="text-gray-500 hover:text-gray-700 rounded-xl"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleDescriptionSave}
                          className="bg-gray-700 text-white hover:bg-gray-800 rounded-xl"
                        >
                          Guardar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {workpackage.descricao || "Sem descrição"}
                    </p>
                  )}
                </Card>
              </div>

              {/* Materiais renovados com menos azul */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-700" />
                    </div>
                    <h3 className="text-base font-medium text-gray-700">Materiais</h3>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setAddingMaterial(true)}
                    className="rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Adicionar Material
                  </Button>
                </div>

                {addingMaterial && (
                  <Card className="border border-gray-200/50 shadow-lg bg-white/70 backdrop-blur-sm p-6 rounded-xl mb-4">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-medium text-gray-700">Novo Material</h4>
                        <Button
                          variant="ghost"
                          onClick={() => setAddingMaterial(false)}
                          className="h-8 w-8 rounded-xl hover:bg-red-50 hover:text-red-500"
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label className="text-sm text-gray-500">Nome do Material</Label>
                          <Input
                            value={newMaterial.nome}
                            onChange={(e) => setNewMaterial({ ...newMaterial, nome: e.target.value })}
                            className="w-full bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl"
                            placeholder="Ex: Computador Portátil"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-500">Quantidade</Label>
                          <Input
                            type="number"
                            value={newMaterial.quantidade || ""}
                            onChange={(e) => setNewMaterial({ 
                              ...newMaterial, 
                              quantidade: parseFloat(e.target.value) || 0 
                            })}
                            className="w-full bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl"
                            placeholder="Ex: 1"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-500">Preço Unitário (€)</Label>
                          <Input
                            type="number"
                            value={newMaterial.preco || ""}
                            onChange={(e) => setNewMaterial({ 
                              ...newMaterial, 
                              preco: parseFloat(e.target.value) || 0 
                            })}
                            className="w-full bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl"
                            placeholder="Ex: 1000.00"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-500">Rubrica</Label>
                          <Select
                            value={newMaterial.rubrica}
                            onValueChange={(value) => setNewMaterial({ 
                              ...newMaterial, 
                              rubrica: value as Rubrica 
                            })}
                          >
                            <SelectTrigger className="w-full bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl">
                              <SelectValue placeholder="Selecione a rubrica" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MATERIAIS">Materiais</SelectItem>
                              <SelectItem value="SERVICOS_TERCEIROS">Serviços de Terceiros</SelectItem>
                              <SelectItem value="OUTROS_SERVICOS">Outros Serviços</SelectItem>
                              <SelectItem value="DESLOCACAO_ESTADIAS">Deslocação e Estadias</SelectItem>
                              <SelectItem value="OUTROS_CUSTOS">Outros Custos</SelectItem>
                              <SelectItem value="CUSTOS_ESTRUTURA">Custos de Estrutura</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm text-gray-500">Ano de Utilização</Label>
                          <Input
                            type="number"
                            value={newMaterial.ano_utilizacao}
                            onChange={(e) => setNewMaterial({ 
                              ...newMaterial, 
                              ano_utilizacao: parseInt(e.target.value) || new Date().getFullYear() 
                            })}
                            className="w-full bg-white/80 border-gray-200 focus:border-gray-400 focus:ring-gray-200/20 rounded-xl"
                            placeholder={new Date().getFullYear().toString()}
                          />
                        </div>

                        <div className="col-span-2 flex items-center justify-between pt-4">
                          <div className="flex items-center gap-2">
                            <Euro className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                              Total: {(newMaterial.quantidade * newMaterial.preco).toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR"
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              onClick={() => setAddingMaterial(false)}
                              className="text-gray-500 hover:text-gray-700 rounded-xl"
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={handleAddMaterial}
                              className="bg-gray-700 text-white hover:bg-gray-800 rounded-xl"
                            >
                              Adicionar Material
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="border border-gray-200/50 shadow-lg bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="hover:bg-transparent border-gray-200">
                        <TableHead className="py-4 text-sm font-medium text-gray-700">Nome</TableHead>
                        <TableHead className="py-4 text-sm font-medium text-gray-700">Rubrica</TableHead>
                        <TableHead className="py-4 text-sm font-medium text-gray-700 text-right">Quantidade</TableHead>
                        <TableHead className="py-4 text-sm font-medium text-gray-700 text-right">Preço Unit.</TableHead>
                        <TableHead className="py-4 text-sm font-medium text-gray-700 text-right">Total</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workpackage.materiais.map((material) => (
                        <TableRow key={material.id} className="border-gray-200 hover:bg-gray-50">
                          <TableCell className="py-4 text-gray-600">{material.nome}</TableCell>
                          <TableCell className="py-4 text-gray-500">{material.rubrica.replace(/_/g, " ")}</TableCell>
                          <TableCell className="py-4 text-right text-gray-600">{material.quantidade}</TableCell>
                          <TableCell className="py-4 text-right text-gray-600">
                            {Number(material.preco).toLocaleString("pt-PT", { 
                              style: "currency", 
                              currency: "EUR" 
                            })}
                          </TableCell>
                          <TableCell className="py-4 text-right font-medium text-gray-700">
                            {(material.quantidade * Number(material.preco)).toLocaleString("pt-PT", {
                              style: "currency",
                              currency: "EUR"
                            })}
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const confirmed = window.confirm("Tem certeza que deseja remover este material?");
                                if (confirmed) {
                                  deleteMaterialMutation.mutate({
                                    workpackageId,
                                    materialId: material.id
                                  });
                                }
                              }}
                              className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-500"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="border-t-2 border-gray-200 bg-gray-50">
                        <TableCell colSpan={4} className="py-4 text-right font-medium text-gray-700">
                          Total
                        </TableCell>
                        <TableCell className="py-4 text-right font-semibold text-gray-800">
                          {workpackage.materiais.reduce(
                            (total, material) => total + (material.quantidade * Number(material.preco)),
                            0
                          ).toLocaleString("pt-PT", { style: "currency", currency: "EUR" })}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
