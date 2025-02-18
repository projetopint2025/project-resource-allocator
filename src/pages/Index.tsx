
import { LayoutDashboard, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const overviewCards = [
  {
    title: "Horas disponíveis esta semana",
    value: "13/40",
    icon: LayoutDashboard,
  },
  {
    title: "Projetos em desenvolvimento",
    value: "4",
    icon: BarChart3,
  },
];

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl">
          Bom dia, <span className="font-semibold">Vasco</span>
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {overviewCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-normal text-muted-foreground">
                {card.title}
              </CardTitle>
              <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <card.icon className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Distribuição do trabalho por projetos
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Número de horas em cada projeto na última semana
          </p>
        </CardHeader>
        <CardContent>
          {/* Aqui você pode adicionar o gráfico de pizza usando recharts */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
