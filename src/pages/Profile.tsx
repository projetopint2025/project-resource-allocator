
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ChartBar, Calendar, CheckCircle2 } from "lucide-react";

const mockUserStats = {
  nome: "Vasco Fernandes",
  cargo: "Project Manager",
  email: "vasco.fernandes@star.pt",
  projetos: 12,
  horasAlocadas: 1240,
  tarefasConcluidas: 85,
  contribuicoes: [
    { projeto: "INOVC+", papel: "Project Manager", horas: 420 },
    { projeto: "DreamFAB", papel: "Analista", horas: 320 },
    { projeto: "IAMFat", papel: "Desenvolvedor", horas: 500 },
  ]
};

const Profile = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações e veja suas contribuições</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projetos Ativos</p>
                <p className="text-2xl font-semibold">{mockUserStats.projetos}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Horas Alocadas</p>
                <p className="text-2xl font-semibold">{mockUserStats.horasAlocadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
                <p className="text-2xl font-semibold">{mockUserStats.tarefasConcluidas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribuições em Projetos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockUserStats.contribuicoes.map((contribuicao) => (
              <div key={contribuicao.projeto} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{contribuicao.projeto}</h3>
                  <p className="text-sm text-muted-foreground">{contribuicao.papel}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{contribuicao.horas}</p>
                  <p className="text-sm text-muted-foreground">horas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
