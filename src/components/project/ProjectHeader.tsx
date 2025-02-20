
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  name: string;
  description: string;
}

export const ProjectHeader = ({ name, description }: ProjectHeaderProps) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-full mx-auto py-6 px-8">
        <div className="flex items-center space-x-4">
          <Link to="/projects">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
            <p className="text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
