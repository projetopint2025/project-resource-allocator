
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  RocketIcon,
  BeakerIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  BuildingIcon,
  LeafIcon,
} from "lucide-react";

const templates = [
  {
    id: "research",
    name: "Projeto de Investigação",
    icon: BeakerIcon,
    description: "Template para projetos de investigação científica e desenvolvimento.",
    color: "blue"
  },
  {
    id: "innovation",
    name: "Projeto de Inovação",
    icon: RocketIcon,
    description: "Template para projetos de inovação e desenvolvimento de produto.",
    color: "purple"
  },
  {
    id: "education",
    name: "Projeto Educacional",
    icon: BookOpenIcon,
    description: "Template para projetos educacionais e de formação.",
    color: "orange"
  },
  {
    id: "ai",
    name: "Projeto de IA",
    icon: BrainCircuitIcon,
    description: "Template para projetos de inteligência artificial.",
    color: "green"
  },
  {
    id: "enterprise",
    name: "Projeto Empresarial",
    icon: BuildingIcon,
    description: "Template para projetos empresariais.",
    color: "gray"
  },
  {
    id: "sustainability",
    name: "Projeto Sustentável",
    icon: LeafIcon,
    description: "Template para projetos de sustentabilidade.",
    color: "emerald"
  }
];

interface ProjectTemplateWizardProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function ProjectTemplateWizard({ onClose, onSubmit }: ProjectTemplateWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    team: []
  });

  const handleNext = () => {
    if (step === 1 && !selectedTemplate) return;
    if (step === 3) {
      onSubmit({ ...formData, template: selectedTemplate });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onClose();
      return;
    }
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-105",
                  selectedTemplate === template.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <template.icon className={cn(
                    "w-8 h-8 mb-2",
                    `text-${template.color}-500`
                  )} />
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Projeto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Data de Fim</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Orçamento (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {step === 1 && "Escolha um Template"}
          {step === 2 && "Informações Básicas"}
          {step === 3 && "Configurações do Projeto"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Selecione um template para começar seu projeto"}
          {step === 2 && "Preencha as informações básicas do projeto"}
          {step === 3 && "Configure as datas e orçamento do projeto"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        <Button onClick={handleNext}>
          {step === 3 ? "Criar Projeto" : "Próximo"}
        </Button>
      </CardFooter>
    </Card>
  );
}
