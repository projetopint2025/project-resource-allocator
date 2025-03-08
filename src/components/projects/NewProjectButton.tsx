
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NewProjectButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function NewProjectButton({ variant = "default", size = "default" }: NewProjectButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/projects/new");
  };

  return (
    <Button
      variant={variant}
      size={size}
      className="gap-2 bg-customBlue hover:bg-customBlue/90 text-white shadow-md"
      onClick={handleClick}
    >
      <Plus className="h-4 w-4" />
      Novo Projeto
    </Button>
  );
}
