import { type Project, type Task } from "@/types/project";
import { ProjectTimeline } from "../timeline/ProjectTimeline";
import { ProjectTimelineHeader } from "../timeline/ProjectTimelineHeader";

interface TimelineTabProps {
  project: Project;
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onSelectTask: (task: Task) => void;
}

export function TimelineTab({
  project,
  timelineYear,
  setTimelineYear,
  currentPage,
  pageCount,
  onPageChange,
  onSelectTask
}: TimelineTabProps) {
  return (
    <div className="p-4">
      <ProjectTimelineHeader
        timelineYear={timelineYear}
        setTimelineYear={setTimelineYear}
      />
      <ProjectTimeline
        workPackages={project.workPackages}
        timelineYear={timelineYear}
        onSelectTask={onSelectTask}
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={onPageChange}
      />
    </div>
  );
} 