
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface ProjectResourcesProps {
  allocated: number;
  available: number;
}

export function ProjectResources({ allocated, available }: ProjectResourcesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Recursos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-customBlue" />
              <span>Alocados</span>
            </div>
            <span className="text-right">{allocated}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Disponíveis</span>
            <span className="text-right text-green-600">{available}</span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-gray-100">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${(allocated/(allocated + available)) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
