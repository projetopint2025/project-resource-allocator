
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WorkPackage, Task } from "@/types/project";

interface ProjectTimelineProps {
  workPackages: WorkPackage[];
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  onSelectTask: (task: Task) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const ProjectTimeline = ({
  workPackages,
  timelineYear,
  setTimelineYear,
  onSelectTask,
  currentPage,
  pageCount,
  onPageChange,
}: ProjectTimelineProps) => {
  const getMonthName = (monthIndex: number) => {
    return new Date(timelineYear, monthIndex).toLocaleDateString('pt-BR', { month: 'short' });
  };

  const getTimelineMonths = () => {
    return Array.from({ length: 12 }).map((_, index) => getMonthName(index));
  };

  return (
    <Card className="bg-white shadow-sm border-gray-200 mb-8">
      <CardHeader className="border-b bg-customBlue-subtle">
        <div className="flex items-center justify-between">
          <CardTitle className="text-customBlue">Cronograma</CardTitle>
          <Select 
            value={timelineYear.toString()} 
            onValueChange={(value) => setTimelineYear(parseInt(value))}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] w-full">
            <div className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 border-b">
              <div className="p-2 text-sm font-medium text-gray-600">Tarefa</div>
              {getTimelineMonths().map((month, index) => (
                <div
                  key={index}
                  className="p-2 text-sm text-center border-r text-gray-600"
                >
                  {month}
                </div>
              ))}
            </div>
            {workPackages.map((wp) => (
              <div key={wp.id} className="mb-4">
                <h3 className="font-medium mt-4 mb-2 text-gray-900">{wp.name}</h3>
                {wp.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 items-center"
                  >
                    <button
                      onClick={() => onSelectTask(task)}
                      className="p-2 text-sm text-left hover:text-blue-500 transition-colors"
                    >
                      {task.name}
                    </button>
                    <div className="col-span-12 relative h-8">
                      <div
                        className="absolute h-6 rounded-md cursor-pointer hover:bg-blue-200 transition-colors"
                        style={{
                          left: `${(new Date(task.startDate).getMonth()) * (100 / 12)}%`,
                          width: `${((new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30.5)) * (100 / 12)}%`,
                          top: '1px',
                          backgroundColor: '#2C5697',
                          opacity: 0.7,
                        }}
                        onClick={() => onSelectTask(task)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
