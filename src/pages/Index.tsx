import { LayoutDashboard, BarChart3, Users, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { GlobalActions } from "@/components/GlobalActions";

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
  {
    title: "Equipe atual",
    value: "6",
    icon: Users,
  },
  {
    title: "Projetos pendentes",
    value: "2",
    icon: AlertTriangle,
  },
];

const projectData = [
  { name: "INOVC+", hours: 12, color: "#2B5697" },
  { name: "DreamFAB", hours: 8, color: "#4A72B0" },
  { name: "IAMFat", hours: 6, color: "#7491C4" },
  { name: "Agenda GreenAuto", hours: 4, color: "#A1B5D8" },
];

const upcomingDeadlines = [
  {
    project: "INOVC+",
    deadline: "25 Apr 2024",
    hours: "4h restantes",
  },
  {
    project: "DreamFAB",
    deadline: "28 Apr 2024",
    hours: "12h restantes",
  },
  {
    project: "IAMFat",
    deadline: "30 Apr 2024",
    hours: "6h restantes",
  },
];

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">
          Bom dia, <span className="font-semibold">Vasco</span>
        </h1>
        <GlobalActions />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-normal text-muted-foreground">
              Distribuição do trabalho por projetos
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Número de horas em cada projeto na última semana
            </p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  dataKey="hours"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-base font-normal text-muted-foreground">
              Prazos próximos
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Projetos com deadlines esta semana
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.project}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{deadline.project}</p>
                      <p className="text-sm text-muted-foreground">
                        {deadline.deadline}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    {deadline.hours}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
