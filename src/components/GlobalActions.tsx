
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GlobalActions = () => {
  return (
    <div className="flex items-center justify-end gap-4 mb-8">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm text-muted-foreground">Disponível</span>
      </div>
      <Button className="bg-[#2B5697] hover:bg-[#2B5697]/90">
        <Plus className="h-4 w-4 mr-2" />
        Novo projeto
      </Button>
    </div>
  );
};
