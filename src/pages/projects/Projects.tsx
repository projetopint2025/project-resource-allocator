import { useState, useMemo, useCallback } from "react";
import { Search, Filter, MoreHorizontal, Plus, LayoutDashboard, Edit, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ProjectTemplateWizard } from "@/components/projects/creation/useProjectTemplate";
import { NewProjectButton } from "@/components/projects/NewProjectButton";

const projects = [
  { id: 1, name: "INOVC+", status: "Aceite", progress: 65, deadline: "2024-04-25" },
  { id: 2, name: "DreamFAB", status: "Pendente", progress: 45, deadline: "2024-04-28" },
  { id: 3, name: "IAMFat", status: "Pendente", progress: 30, deadline: "2024-04-30" },
  { id: 4, name: "Agenda GreenAuto", status: "Aceite", progress: 15, deadline: "2024-05-05" },
  { id: 5, name: "Projeto Teste 1", status: "Aceite", progress: 0, deadline: "2024-05-10" },
  { id: 6, name: "Projeto Teste 2", status: "Aceite", progress: 10, deadline: "2024-05-15" },
  { id: 8, name: "New Project 4", status: "Pendente", progress: 100, deadline: "2024-05-25" },
];

const itemsPerPage = 6;

const Projects = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProjectPopupOpen, setIsAddProjectPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOption, setSelectedOption] = useState<"template" | "import" | "custom" | null>(null);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = statusFilter === "all" ? true : project.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [searchQuery, statusFilter]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredProjects.length / itemsPerPage);
  }, [filteredProjects]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy", { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Data inválida";
    }
  };

  const handleAddProjectClick = useCallback(() => {
    setIsAddProjectPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsAddProjectPopupOpen(false);
    setSelectedOption(null);
  }, []);

  const handleCreateProject = (data: any) => {
    console.log("Novo projeto:", data);
    handleClosePopup();
  };

  const handleRowClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 custom-blue-blur">
      <div className="max-w-8xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-sm text-gray-500">Consulte os seus projetos e acompanhe o progresso</p>
          </div>
          <NewProjectButton />
        </div>

        {/* Combinando a Pesquisa e a Tabela */}
        <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20 hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden">
          <div className="border-b border-white/20 p-6 flex items-center gap-4 bg-white/20 backdrop-blur-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar projetos..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 bg-white/70 shadow-md backdrop-blur-sm focus:ring-2 focus:ring-customBlue/20 text-gray-700 hover:shadow-lg transition-all duration-300 ease-in-out"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-customBlue/20 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200 bg-white/80 backdrop-blur-md shadow-lg">
                <SelectItem value="all" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Todos os estados</SelectItem>
                <SelectItem value="Aceite" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Aceite</SelectItem>
                <SelectItem value="Pendente" className="text-gray-700 hover:bg-white/90 transition-all duration-300 ease-in-out">Pendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                  <TableHead className="w-[220px] text-sm font-medium text-gray-700 py-4">Projeto</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Estado</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Progresso</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700 py-4">Prazo</TableHead>
                  <TableHead className="text-right text-sm font-medium text-gray-700 py-4">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.map((project) => (
                  <TableRow 
                    key={project.id} 
                    className="group border-b border-white/10 hover:bg-white/40 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer"
                    onClick={() => handleRowClick(project.id)}
                  >
                    <TableCell className="py-4">
                      <span className="font-medium text-gray-900 group-hover:text-customBlue transition-colors duration-300 ease-in-out">
                        {project.name}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center",
                        project.status === "Aceite" && "bg-emerald-50/70 text-emerald-600 border border-emerald-200 backdrop-blur-sm",
                        project.status === "Pendente" && "bg-amber-50/70 text-amber-600 border border-amber-200 backdrop-blur-sm"
                      )}>
                        {project.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200/60 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-gradient-to-r from-customBlue to-emerald-500 rounded-full transition-all duration-1000 ease-in-out"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-600">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 py-4">{formatDate(project.deadline)}</TableCell>
                    <TableCell className="text-right py-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-500 hover:text-customBlue hover:bg-white/60 rounded-full transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                        onClick={(e) => {
                          e.stopPropagation(); // Impede que o clique do botão acione a navegação da linha
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedProjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-gray-100/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="space-y-2 max-w-md mx-auto px-4">
                          <p className="text-lg font-medium text-gray-700">Nenhum projeto encontrado</p>
                          <p className="text-sm text-gray-500">Experimente ajustar os filtros de pesquisa ou remover o termo de pesquisa para ver todos os projetos.</p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="mt-2 rounded-full bg-white/60 hover:bg-white/80 border-white/40 text-gray-700 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                          }}
                        >
                          Limpar filtros
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Paginação integrada no card */}
          {pageCount > 1 && (
            <div className="flex items-center justify-between py-4 px-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
              <p className="text-sm text-gray-500">A mostrar <span className="font-medium">{paginatedProjects.length}</span> de <span className="font-medium">{filteredProjects.length}</span> projetos</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-full h-8 w-8 p-0 border-white/40 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "rounded-full h-8 w-8 p-0 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md",
                      currentPage === page
                        ? "bg-customBlue text-white hover:bg-customBlue/90 border-customBlue"
                        : "bg-white/60 text-gray-700 hover:bg-white/80 hover:text-customBlue border-white/40"
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={currentPage === pageCount}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-full h-8 w-8 p-0 border-white/40 bg-white/60 hover:bg-white/80 text-gray-700 hover:text-customBlue transition-all duration-300 ease-in-out shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Add Project Popup */}
        <Dialog.Root open={isAddProjectPopupOpen} onOpenChange={setIsAddProjectPopupOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ease-in-out" />
            <Dialog.Content
              className={cn(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-10 fade-in",
                selectedOption === "template" ? "w-[90vw]" : "w-full max-w-md"
              )}
            >
              {selectedOption === "template" ? (
                <ProjectTemplateWizard onClose={handleClosePopup} onSubmit={handleCreateProject} />
              ) : (
                <Card className="border-none shadow-xl rounded-2xl glass-card border-white/20">
                  <CardHeader className="border-b border-white/10 px-6 py-4 bg-white/70 backdrop-blur-sm">
                    <CardTitle className="text-lg font-semibold text-gray-900">Adicionar Projeto</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-white/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                      onClick={() => setSelectedOption("import")}
                    >
                      <File className="h-5 w-5 mr-2 text-customBlue" />
                      Importar
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-white/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                      onClick={() => setSelectedOption("template")}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2 text-customBlue" />
                      A partir de um template
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-white/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
                      onClick={() => setSelectedOption("custom")}
                    >
                      <Edit className="h-5 w-5 mr-2 text-customBlue" />
                      Personalizado
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-white/10 px-6 py-4 bg-white/50 backdrop-blur-sm">
                    <Button 
                      variant="ghost" 
                      className="text-gray-600 hover:bg-white/60 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out" 
                      onClick={handleClosePopup}
                    >
                      Cancelar
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default Projects;
