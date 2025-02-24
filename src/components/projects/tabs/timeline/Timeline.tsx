import { type WorkPackage, type Task, Resource } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { X, Trash, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  onSelectTask: (task: Task) => void;
  selectedTask?: Task | null;
  onCloseTaskDetails: () => void;
}

export function Timeline({ workPackages, timelineYear, onSelectTask, selectedTask, onCloseTaskDetails }: TimelineProps) {
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

  return (
    <div className="flex h-full">
      <div className={cn(
        "flex-1 transition-all duration-300",
        selectedTask ? "mr-[800px]" : ""
      )}>
        <Card className="p-6">
          <div className="relative">
            <div className="grid grid-cols-12 gap-4 mb-8 pb-4 border-b">
              {months.map((month) => (
                <div key={month} className="text-sm font-medium text-gray-500 text-center">
                  {month}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {workPackages.map((wp) => (
                <div key={wp.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-gray-900">{wp.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {wp.tasks.length} {wp.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                    </Badge>
                    <div className="h-[1px] flex-1 bg-gray-200"></div>
                  </div>
                  <div className="space-y-1">
                    {wp.tasks.map((task) => {
                      const position = getTaskPosition(task.startDate, task.endDate);
                      if (!position) return null;
                      
                      return (
                        <div key={task.id} className="relative grid grid-cols-12 gap-4 items-center group hover:bg-customBlue/5 py-0.5 rounded-lg transition-colors">
                          <div
                            className="col-span-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-customBlue transition-colors"
                            onClick={() => onSelectTask(task)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="hover:underline line-clamp-1">{task.name}</span>
                              <Badge variant="outline" className={cn(
                                'text-xs whitespace-nowrap',
                                task.status === 'completed' ? 
                                  'border-green-500 text-green-700 bg-green-50' :
                                  'border-customBlue text-customBlue bg-customBlue/5'
                              )}>
                                {task.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                              </Badge>
                            </div>
                          </div>
                          <div className="col-span-9 relative h-12">
                            <div
                              className={cn(
                                "absolute h-8 rounded-lg border-2 transition-all duration-200",
                                task.status === 'completed' ? 
                                  'bg-green-500/20 border-green-500' :
                                  'bg-customBlue/20 border-customBlue',
                                "top-1/2 -translate-y-1/2 shadow-sm"
                              )}
                              style={{
                                left: `${((position.gridColumnStart - 1) / 12) * 100}%`,
                                width: `${(parseInt(position.gridColumnEnd.split(' ')[1]) / 12) * 100}%`,
                                minWidth: '60px'
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
        </Card>
      </div>

      {selectedTask && (
        <div className="fixed top-0 right-0 w-[800px] h-full bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
          <div className="bg-white border-b p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900">{selectedTask.name}</h2>
                <Badge variant="outline" className={cn(
                  'text-xs',
                  selectedTask.status === 'completed' ? 
                    'border-green-500 text-green-700 bg-green-50' :
                    'border-customBlue text-customBlue bg-customBlue/5'
                )}>
                  {selectedTask.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCloseTaskDetails}
                className="hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2 text-gray-600">Fundamentação</h3>
              <p className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedTask.rationale}</p>
            </div>

            {/* Rest of the task details content */}
          </div>
        </div>
      )}
    </div>
  );
}
