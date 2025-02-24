import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const dynamic = 'force-dynamic';

async function getProject(id: string) {
  // Aqui você implementaria a lógica real de busca do projeto
  // Por enquanto, vamos usar o mock
  const mockProject = {
    id: parseInt(id),
    name: "INOVC+",
    description: "Sistema de gestão de inovação para empresas tecnológicas",
    status: "pending",
    progress: 45,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    workPackages: [
      // ... seus workPackages existentes
    ]
  };

  return mockProject;
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectDetails project={project} />
    </Suspense>
  );
} 