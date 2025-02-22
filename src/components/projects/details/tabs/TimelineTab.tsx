
import { Button } from "@/components/ui/button";
import { Timeline } from "../Timeline";
import { type Project, type Task } from "@/types/project";

interface TimelineTabProps {
  project: Project;
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  onSelectTask: (task: Task) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function TimelineTab({
  project,
  timelineYear,
  setTimelineYear,
  onSelectTask,
  currentPage,
  pageCount,
  onPageChange,
}: TimelineTabProps) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cronograma</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setTimelineYear(2025)}
            className={timelineYear === 2025 ? 'bg-primary text-primary-foreground' : ''}
          >
            2025
          </Button>
          <Button
            variant={timelineYear === 2026 ? 'default' : 'outline'}
            onClick={() => setTimelineYear(2026)}
          >
            2026
          </Button>
          <Button
            variant="outline"
            onClick={() => setTimelineYear(2027)}
            className={timelineYear === 2027 ? 'bg-primary text-primary-foreground' : ''}
          >
            2027
          </Button>
        </div>
      </div>
      <Timeline
        workPackages={project.workPackages}
        timelineYear={timelineYear}
        onSelectTask={onSelectTask}
      />
    </div>
  );
}
