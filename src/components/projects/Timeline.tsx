
import { type WorkPackage, type Task } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskSidebar } from "@/components/projects/tasks/TaskSidebar";
import { WorkPackageSidebar } from "@/components/projects/workpackages/WorkPackageSidebar";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  onSelectTask?: (task: Task) => void;
  onUpdateWorkPackage?: (workPackage: WorkPackage) => void;
  onUpdateTask?: (task: Task) => void;
}

export function Timeline({ 
  workPackages, 
  timelineYear, 
  onSelectTask,
  onUpdateWorkPackage,
  onUpdateTask
}: TimelineProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedWorkPackage, setSelectedWorkPackage] = useState<WorkPackage | null>(null);
  
  const months = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const getTaskPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getFullYear() !== timelineYear || end.getFullYear() !== timelineYear) return null;
    
    const startMonth = start.getMonth();
    const endMonth = end.getMonth();
    const duration = endMonth - startMonth + 1;
    
    return {
      gridColumnStart: startMonth + 1,
      gridColumnEnd: `span ${duration}`,
    };
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    if (onSelectTask) onSelectTask(task);
  };

  const handleWorkPackageClick = (wp: WorkPackage) => {
    setSelectedWorkPackage(wp);
  };

  const handleUpdateTask = (task: Task) => {
    if (onUpdateTask) onUpdateTask(task);
  };

  const handleUpdateWorkPackage = (wp: WorkPackage) => {
    if (onUpdateWorkPackage) onUpdateWorkPackage(wp);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="sticky top-0 bg-white/70 backdrop-blur-sm z-10 border-b border-white/30 shadow-sm">
        <div className="grid grid-cols-12 gap-2 px-6 py-4">
          {months.map((month) => (
            <div key={month} className="text-xs font-medium text-gray-500 text-center">
              {month}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-4">
        <div className="space-y-8">
          {workPackages.map((wp) => (
            <div key={wp.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 
                  className="text-base font-semibold text-gray-700 cursor-pointer hover:text-customBlue transition-colors flex items-center gap-2"
                  onClick={() => handleWorkPackageClick(wp)}
                >
                  {wp.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full text-gray-400 hover:text-customBlue hover:bg-blue-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWorkPackageClick(wp);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </h3>
                <Badge className="bg-blue-50/70 text-customBlue border-blue-200 text-[10px] px-2 py-0.5 backdrop-blur-sm shadow-sm">
                  {wp.tasks.length}
                </Badge>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 via-gray-200 to-transparent"></div>
              </div>
              <div className="space-y-2">
                {wp.tasks.map((task) => {
                  const position = getTaskPosition(task.startDate, task.endDate);
                  if (!position) return null;
                  
                  return (
                    <div key={task.id} className="relative grid grid-cols-12 gap-2 items-center group hover:bg-white/40 p-2 rounded-lg transition-all duration-200 backdrop-blur-[1px] hover:backdrop-blur-sm hover:shadow-md">
                      <div
                        className="col-span-3 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-gray-600 group-hover:text-customBlue transition-colors line-clamp-1 group-hover:font-semibold">
                            {task.name}
                          </span>
                          <Badge className={cn(
                            'text-[10px] px-2 py-0.5 whitespace-nowrap font-medium backdrop-blur-sm shadow-sm',
                            task.status === 'completed' 
                              ? 'bg-emerald-50/70 text-emerald-600 border-emerald-200' 
                              : 'bg-blue-50/70 text-customBlue border-blue-200'
                          )}>
                            {task.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-9 relative h-8">
                        <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-l border-gray-300 h-full" />
                          ))}
                        </div>
                        <div
                          className={cn(
                            "absolute h-6 rounded-full transition-all duration-300",
                            task.status === 'completed' 
                              ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 border border-emerald-300/30' 
                              : 'bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300/30',
                            "top-1/2 -translate-y-1/2 shadow-md group-hover:shadow-lg group-hover:h-7"
                          )}
                          style={{
                            left: `${((position.gridColumnStart - 1) / 12) * 100}%`,
                            width: `${(parseInt(position.gridColumnEnd.split(' ')[1]) / 12) * 100}%`,
                            minWidth: '40px'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Sidebar */}
      {selectedTask && (
        <TaskSidebar
          task={selectedTask}
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleUpdateTask}
        />
      )}

      {/* WorkPackage Sidebar */}
      {selectedWorkPackage && (
        <WorkPackageSidebar
          workPackage={selectedWorkPackage}
          open={!!selectedWorkPackage}
          onClose={() => setSelectedWorkPackage(null)}
          onUpdate={handleUpdateWorkPackage}
        />
      )}
    </div>
  );
}
