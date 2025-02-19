import { useState, useMemo, useCallback } from "react";
import { Search, Filter, MoreHorizontal, Plus, File, LayoutDashboard, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as Dialog from "@radix-ui/react-dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const projects = [
  {
    id: 1,
    name: "INOVC+",
    status: "Em desenvolvimento",
    progress: 65,
    deadline: "2024-04-25",
    team: ["João Silva", "Maria Santos"]
  },
  {
    id: 2,
    name: "DreamFAB",
    status: "Em desenvolvimento",
    progress: 45,
    deadline: "2024-04-28",
    team: ["Ana Pereira", "Rui Costa"]
  },
  {
    id: 3,
    name: "IAMFat",
    status: "Em pausa",
    progress: 30,
    deadline: "2024-04-30",
    team: ["João Silva", "Rui Costa"]
  },
  {
    id: 4,
    name: "Agenda GreenAuto",
    status: "Em desenvolvimento",
    progress: 15,
    deadline: "2024-05-05",
    team: ["Maria Santos", "Ana Pereira"]
  },
  {
    id: 5,
    name: "Projeto Teste 1",
    status: "Planeado",
    progress: 0,
    deadline: "2024-05-10",
    team: ["João Silva"]
  },
  {
    id: 6,
    name: "Projeto Teste 2",
    status: "Em análise",
    progress: 10,
    deadline: "2024-05-15",
    team: ["Ana Pereira"]
  },
  {
    id: 7,
    name: "Projeto Teste 3",
    status: "Em desenvolvimento",
    progress: 25,
    deadline: "2024-05-20",
    team: ["Rui Costa"]
  },
  {
    id: 8,
    name: "New Project 4",
    status: "Concluído",
    progress: 100,
    deadline: "2024-05-25",
    team: ["João Silva", "Maria Santos", "Ana Pereira", "Rui Costa"]
  },
];

const itemsPerPage = 7;

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProjectPopupOpen, setIsAddProjectPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleAddProjectClick = useCallback(() => {
    setIsAddProjectPopupOpen(true);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsAddProjectPopupOpen(false);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const searchMatch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = statusFilter ? project.status === statusFilter : true;
      return searchMatch && statusMatch;
    });
  }, [projects, searchQuery, statusFilter]);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return filteredProjects.slice(start, end);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const pageCount = useMemo(() => {
    return Math.ceil(filteredProjects.length / itemsPerPage);
  }, [filteredProjects, itemsPerPage]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy', { locale: ptBR });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Data inválida";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground text-sm">Consulte os seus projetos e acompanhe o progresso.</p>
        </div>
        <Button onClick={handleAddProjectClick}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Projeto
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar projetos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Todos os estados</SelectItem>
            <SelectItem value="Em desenvolvimento">Em desenvolvimento</SelectItem>
            <SelectItem value="Em pausa">Em pausa</SelectItem>
            <SelectItem value="Planeado">Planeado</SelectItem>
            <SelectItem value="Em análise">Em análise</SelectItem>
            <SelectItem value="Concluído">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Projeto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Equipa</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link to={`/projects/${project.id}`} className="font-medium hover:underline">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={project.progress} className="w-[100px]" />
                    <span>{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(project.deadline)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    {project.team.map(member => (
                      <Avatar key={member} className="h-5 w-5">
                        <AvatarFallback>{member.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Nenhum projeto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === pageCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Add Project Popup */}
      <Dialog.Root open={isAddProjectPopupOpen} onOpenChange={setIsAddProjectPopupOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">Adicionar Projeto</Dialog.Title>
            <div className="grid gap-4">
              <Button variant="ghost" className="justify-start" onClick={() => { /* Handle Import */ handleClosePopup(); }}>
                <File className="h-4 w-4 mr-2" />
                Importar
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { /* Handle From Template */ handleClosePopup(); }}>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                A partir de um template
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { /* Handle Custom */ handleClosePopup(); }}>
                <Edit className="h-4 w-4 mr-2" />
                Personalizado
              </Button>
            </div>
            <div className="mt-6 flex justify-end">
              <Dialog.Close asChild>
                <Button variant="ghost" onClick={handleClosePopup}>
                  Cancelar
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Projects;