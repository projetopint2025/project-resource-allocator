
import { type WorkPackage, type Task } from "@/types/project";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <Card className="p-6">
      <div className="relative">
        <div className="grid grid-cols-12 gap-4 mb-8 pb-4 border-b">
          {months.map((month) => (
            <div key={month} className="text-sm font-medium text-gray-500 text-center">
              {month}
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {workPackages.map((wp) => (
            <div key={wp.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg text-gray-900">{wp.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {wp.tasks.length} {wp.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                </Badge>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>
              <div className="space-y-6">
                {wp.tasks.map((task) => {
                  const position = getTaskPosition(task.startDate, task.endDate);
                  if (!position) return null;
                  
                  return (
                    <div key={task.id} className="relative grid grid-cols-12 gap-4 items-center group hover:bg-gray-50/50 p-2 rounded-lg transition-colors">
                      <div
                        className="col-span-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={() => onSelectTask(task)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="hover:underline line-clamp-1">{task.name}</span>
                          <Badge variant="outline" className={cn(
                            'text-xs whitespace-nowrap',
                            task.status === 'completed' && 'border-green-500 text-green-700 bg-green-50',
                            task.status === 'in-progress' && 'border-blue-500 text-blue-700 bg-blue-50',
                            task.status === 'pending' && 'border-gray-500 text-gray-700 bg-gray-50'
                          )}>
                            {task.status === 'completed' ? 'Concluído' : 
                             task.status === 'in-progress' ? 'Em Progresso' : 
                             'Pendente'}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-9 relative h-16">
                        <div
                          className={cn(
                            "absolute h-10 rounded-lg border-2 transition-all duration-200",
                            task.status === 'completed' && 'bg-green-500/20 border-green-500',
                            task.status === 'in-progress' && 'bg-blue-500/20 border-blue-500',
                            task.status === 'pending' && 'bg-gray-500/20 border-gray-500',
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
  );
}
