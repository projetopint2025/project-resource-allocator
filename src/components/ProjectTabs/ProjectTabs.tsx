import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTasks } from "./ProjectTasks";
import { ProjectDocuments } from "./ProjectDocuments";

export interface ProjectTabsProps {
  projectId: string;
}

export function ProjectTabs({ projectId }: ProjectTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <ProjectOverview projectId={projectId} />
      </TabsContent>
      <TabsContent value="tasks">
        <ProjectTasks projectId={projectId} />
      </TabsContent>
      <TabsContent value="documents">
        <ProjectDocuments projectId={projectId} />
      </TabsContent>
    </Tabs>
  );
}
