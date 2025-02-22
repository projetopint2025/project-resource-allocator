
import React from 'react';

interface ProjectHeaderProps {
  name: string;
  description: string;
}

export function ProjectHeader({ name, description }: ProjectHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{name}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
