
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalActions } from "@/components/GlobalActions";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "INOVC+",
    status: "Em desenvolvimento",
    progress: 65,
    deadline: "25 Apr 2024",
    hoursLeft: 4,
  },
  {
    id: 2,
    name: "DreamFAB",
    status: "Em desenvolvimento",
    progress: 45,
    deadline: "28 Apr 2024",
    hoursLeft: 12,
  },
  {
    id: 3,
    name: "IAMFat",
    status: "Em pausa",
    progress: 30,
    deadline: "30 Apr 2024",
    hoursLeft: 6,
  },
  {
    id: 4,
    name: "Agenda GreenAuto",
    status: "Em desenvolvimento",
    progress: 15,
    deadline: "5 May 2024",
    hoursLeft: 20,
  },
];

const Projects = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projetos</h1>
          <p className="text-gray-500 mt-1">Gerencie e monitore seus projetos ativos</p>
        </div>
        <GlobalActions />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar projetos..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
        <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:border-gray-300">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group"
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-gray-200/80">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500">{project.status}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-500">Progresso</span>
                      <span className="font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Deadline</span>
                    <span className="text-gray-900">{project.deadline}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Horas restantes</span>
                    <span className="font-medium text-indigo-600">{project.hoursLeft}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
