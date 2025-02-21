
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, StopCircle, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeEntry {
  startTime: Date;
  endTime?: Date;
  pauses: { start: Date; end?: Date }[];
  isActive: boolean;
  isPaused: boolean;
}

export function TimeTracker() {
  const [timeTracking, setTimeTracking] = useState<TimeEntry | null>(null);
  const [totalWorkTime, setTotalWorkTime] = useState("00:00:00");

  const startWork = () => {
    setTimeTracking({
      startTime: new Date(),
      pauses: [],
      isActive: true,
      isPaused: false
    });
  };

  const pauseWork = () => {
    if (timeTracking) {
      const updatedTimeTracking = {
        ...timeTracking,
        isPaused: true,
        pauses: [...timeTracking.pauses, { start: new Date() }]
      };
      setTimeTracking(updatedTimeTracking);
    }
  };

  const resumeWork = () => {
    if (timeTracking && timeTracking.pauses.length > 0) {
      const updatedPauses = [...timeTracking.pauses];
      const currentPause = updatedPauses[updatedPauses.length - 1];
      currentPause.end = new Date();

      setTimeTracking({
        ...timeTracking,
        isPaused: false,
        pauses: updatedPauses
      });
    }
  };

  const stopWork = () => {
    if (timeTracking) {
      if (timeTracking.isPaused) {
        resumeWork();
      }
      setTimeTracking({
        ...timeTracking,
        endTime: new Date(),
        isActive: false
      });
    }
  };

  const calculateTotalTime = () => {
    if (!timeTracking) return "00:00:00";

    const now = timeTracking.endTime || new Date();
    let totalMs = now.getTime() - timeTracking.startTime.getTime();

    timeTracking.pauses.forEach(pause => {
      const pauseEnd = pause.end || (timeTracking.isPaused ? new Date() : pause.start);
      totalMs -= (pauseEnd.getTime() - pause.start.getTime());
    });

    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number;
    if (timeTracking?.isActive) {
      interval = window.setInterval(() => {
        setTotalWorkTime(calculateTotalTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timeTracking]);

  return (
    <Card className="w-fit">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className={cn(
              "w-5 h-5 transition-colors",
              timeTracking?.isActive
                ? timeTracking.isPaused
                  ? "text-yellow-500"
                  : "text-green-500"
                : "text-gray-400"
            )} />
            <span className="text-3xl font-mono tracking-wider">{totalWorkTime}</span>
          </div>
          <div className="flex gap-2">
            {!timeTracking?.isActive ? (
              <Button
                variant="outline"
                size="sm"
                onClick={startWork}
                className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Iniciar
              </Button>
            ) : (
              <>
                {!timeTracking.isPaused ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={pauseWork}
                    className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 transition-colors"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Pausar
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resumeWork}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Retomar
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopWork}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <StopCircle className="h-4 w-4 mr-2" />
                  Parar
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
