
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function ProjectTabs({ activeTab, onTabChange }: ProjectTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
        <TabsTrigger value="kpis">KPIs</TabsTrigger>
        <TabsTrigger value="metrics">Métricas</TabsTrigger>
        <TabsTrigger value="objectives">Objetivos</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
