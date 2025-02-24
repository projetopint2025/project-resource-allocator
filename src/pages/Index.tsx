import { NewProjectButton } from "@/components/projects/NewProjectButton";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-8xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Bem-vindo de volta</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationsPopover />
            <NewProjectButton />
          </div>
        </div>

        {/* Project Overview Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Projects Card */}
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardHeader className="space-y-1 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Total de Projetos</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900">12</div>
            </CardContent>
          </Card>

          {/* Projects in Development Card */}
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardHeader className="space-y-1 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900">7</div>
            </CardContent>
          </Card>

          {/* Concluded Projects Card */}
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardHeader className="space-y-1 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Concluídos</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900">5</div>
            </CardContent>
          </Card>
        </section>

        {/* Team Activity Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Card */}
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardHeader className="space-y-1 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">João Silva adicionou uma nova tarefa ao projeto INOVC+</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Maria Santos concluiu a análise de requisitos do projeto DreamFAB</p>
                    <p className="text-xs text-gray-500">Há 5 horas</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Rui Costa atualizou o prazo do projeto IAMFat</p>
                    <p className="text-xs text-gray-500">Ontem</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Project Status Overview Card */}
          <Card className="border-none shadow-lg rounded-2xl bg-white">
            <CardHeader className="space-y-1 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">Visão Geral do Estado dos Projetos</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">INOVC+</div>
                  <div className="text-sm text-gray-500">Em desenvolvimento</div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">DreamFAB</div>
                  <div className="text-sm text-gray-500">Em desenvolvimento</div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">IAMFat</div>
                  <div className="text-sm text-gray-500">Em pausa</div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
