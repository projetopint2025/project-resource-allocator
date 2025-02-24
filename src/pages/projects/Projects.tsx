import { useState, useMemo, useCallback } from "react";
import { Search, Filter, MoreHorizontal, Plus, LayoutDashboard, Edit, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  { id: 1, name: "INOVC+", status: "Em desenvolvimento", progress: 65, deadline: "2024-04-25", team: ["João Silva", "Maria Santos"] },
  { id: 2, name: "DreamFAB", status: "Em desenvolvimento", progress: 45, deadline: "2024-04-28", team: ["Ana Pereira", "Rui Costa"] },
  { id: 3, name: "IAMFat", status: "Em pausa", progress: 30, deadline: "2024-04-30", team: ["João Silva", "Rui Costa"] },
  { id: 4, name: "Agenda GreenAuto", status: "Em desenvolvimento", progress: 15, deadline: "2024-05-05", team: ["Maria Santos", "Ana Pereira"] },
  { id: 5, name: "Projeto Teste 1", status: "Planeado", progress: 0, deadline: "2024-05-10", team: ["João Silva"] },
  { id: 6, name: "Projeto Teste 2", status: "Em análise", progress: 10, deadline: "2024-05-15", team: ["Ana Pereira"] },
  { id: 8, name: "New Project 4", status: "Concluído", progress: 100, deadline: "2024-05-25", team: ["João Silva", "Maria Santos", "Ana Pereira", "Rui Costa"] },
];

const itemsPerPage = 6;

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProjectPopupOpen, setIsAddProjectPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState<"template" | "import" | "custom" | null>(null);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = statusFilter ? project.status === statusFilter : true;
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-8xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
            <p className="text-sm text-gray-500">Consulte os seus projetos e acompanhe o progresso</p>
          </div>
          <NewProjectButton />
        </div>

        {/* Filters and Search */}
        <Card className="border-none shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Pesquisar projetos..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 rounded-full border-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-200">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200">
                <SelectItem value="todos" className="text-gray-700 hover:bg-gray-50">Todos os estados</SelectItem>
                <SelectItem value="Em desenvolvimento" className="text-gray-700 hover:bg-gray-50">Em desenvolvimento</SelectItem>
                <SelectItem value="Em pausa" className="text-gray-700 hover:bg-gray-50">Em pausa</SelectItem>
                <SelectItem value="Planeado" className="text-gray-700 hover:bg-gray-50">Planeado</SelectItem>
                <SelectItem value="Em análise" className="text-gray-700 hover:bg-gray-50">Em análise</SelectItem>
                <SelectItem value="Concluído" className="text-gray-700 hover:bg-gray-50">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Project Table */}
        <Card className="border-none shadow-lg rounded-2xl bg-white">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100">
                  <TableHead className="w-[200px] text-sm font-medium text-gray-700">Projeto</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Estado</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Progresso</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Prazo</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Equipa</TableHead>
                  <TableHead className="text-right text-sm font-medium text-gray-700">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Link to={`/projects/${project.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-600">{project.status}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="w-24 h-1 bg-gray-200" />
                        <span className="text-gray-600">{project.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{formatDate(project.deadline)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {project.team.map((member) => (
                          <Avatar key={member} className="h-6 w-6 ring-1 ring-blue-100">
                            <AvatarFallback className="text-xs text-gray-600">{member.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedProjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      Nenhum projeto encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 py-4">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-full border-customBlue text-customBlue hover:bg-customBlue/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "rounded-full",
                  currentPage === page
                    ? "bg-customBlue text-white hover:bg-customBlue/90"
                    : "border-customBlue text-customBlue hover:bg-customBlue/10"
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
              className="rounded-full border-customBlue text-customBlue hover:bg-customBlue/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Add Project Popup */}
        <Dialog.Root open={isAddProjectPopupOpen} onOpenChange={setIsAddProjectPopupOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content
              className={cn(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-h-[90vh] overflow-y-auto",
                selectedOption === "template" ? "w-[90vw]" : "w-full max-w-md"
              )}
            >
              {selectedOption === "template" ? (
                <ProjectTemplateWizard onClose={handleClosePopup} onSubmit={handleCreateProject} />
              ) : (
                <Card className="border-none shadow-lg rounded-2xl bg-white">
                  <CardHeader className="border-b border-gray-100 px-6 py-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">Adicionar Projeto</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => setSelectedOption("import")}
                    >
                      <File className="h-4 w-4 mr-2 text-blue-500" />
                      Importar
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => setSelectedOption("template")}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2 text-blue-500" />
                      A partir de um template
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:bg-gray-100 rounded-lg"
                      onClick={() => setSelectedOption("custom")}
                    >
                      <Edit className="h-4 w-4 mr-2 text-blue-500" />
                      Personalizado
                    </Button>
                  </CardContent>
                  <CardFooter className="flex justify-end border-t border-gray-100 px-6 py-4">
                    <Button variant="ghost" className="text-gray-600 hover:bg-gray-100" onClick={handleClosePopup}>
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
