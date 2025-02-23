
import { useQuery } from "@tanstack/react-query";
import { getProject, getProjects } from "@/lib/api/projects";

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
}
