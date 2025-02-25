
import { Project, Task } from "@/types/project";
import { Timeline } from "@/components/projects/Timeline";

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
    <div className="p-3 space-y-10">
      <Timeline
        workPackages={project.workPackages}
        timelineYear={timelineYear}
        onSelectTask={onSelectTask}
      />
    </div>
  );
}
