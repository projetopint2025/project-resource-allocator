
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectBudgetProps {
  total: number;
  spent: number;
  remaining: number;
}

export function ProjectBudget({ total, spent, remaining }: ProjectBudgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Orçamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Total</span>
            <span className="text-right">€ {total.toLocaleString('pt-BR')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Gasto</span>
            <span className="text-right text-green-600">€ {spent.toLocaleString('pt-BR')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>Restante</span>
            <span className="text-right text-customBlue">€ {remaining.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 mt-4">
            <div 
              className="h-full bg-customBlue rounded-full" 
              style={{ width: `${(spent/total) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
