
import { type WorkPackage, type Task } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  onSelectTask: (task: Task) => void;
}

export function Timeline({ workPackages, timelineYear, onSelectTask }: TimelineProps) {
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
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-12 gap-4">
          {months.map((month) => (
            <div key={month} className="text-sm font-medium text-gray-400 text-center">
              {month}
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {workPackages.map((wp) => (
            <div key={wp.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg text-gray-900">{wp.name}</h3>
                <Badge variant="outline" className="text-xs bg-gray-50">
                  {wp.tasks.length} {wp.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                </Badge>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>
              <div className="space-y-4">
                {wp.tasks.map((task) => {
                  const position = getTaskPosition(task.startDate, task.endDate);
                  if (!position) return null;
                  
                  return (
                    <div key={task.id} className="relative grid grid-cols-12 gap-4 items-center group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
                      <div
                        className="col-span-3 cursor-pointer"
                        onClick={() => onSelectTask(task)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700 hover:text-customBlue transition-colors line-clamp-1">
                            {task.name}
                          </span>
                          <Badge variant="outline" className={cn(
                            'text-xs whitespace-nowrap',
                            task.status === 'completed' 
                              ? 'border-green-500 text-green-700 bg-green-50' 
                              : 'border-customBlue text-customBlue bg-blue-50'
                          )}>
                            {task.status === 'completed' ? 'Concluído' : 'Em Progresso'}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-9 relative h-16">
                        <div
                          className={cn(
                            "absolute h-10 rounded-lg transition-all duration-200",
                            task.status === 'completed' 
                              ? 'bg-green-100 border-2 border-green-500' 
                              : 'bg-blue-50 border-2 border-customBlue',
                            "top-1/2 -translate-y-1/2 shadow-sm group-hover:shadow-md"
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
  );
}
