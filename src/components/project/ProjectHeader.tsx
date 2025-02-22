// Remove all imports and start with the interface
interface ProjectHeaderProps {
  name: string;
  description: string;
}

export function ProjectHeader({ name, description }: ProjectHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}
