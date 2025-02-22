import { Button } from "@/components/ui/button";

interface ProjectTimelineHeaderProps {
  timelineYear: number;
  setTimelineYear: (year: number) => void;
}

export function ProjectTimelineHeader({ timelineYear, setTimelineYear }: ProjectTimelineHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg border">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Cronograma</h2>
        <p className="text-sm text-gray-500">Visualização das tarefas do projeto</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Ano:</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimelineYear(timelineYear - 1)}
          >
            {timelineYear - 1}
          </Button>
          <Button variant="default" size="sm">
            {timelineYear}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimelineYear(timelineYear + 1)}
          >
            {timelineYear + 1}
          </Button>
        </div>
      </div>
    </div>
  );
} 