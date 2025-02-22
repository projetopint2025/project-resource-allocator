import { BarChart, LineChart } from 'lucide-react';

export const TimelineTab = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export const KPIsTab = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI Cards */}
        {[
          { title: 'Progresso Total', value: '68%', trend: '+5%' },
          { title: 'Tarefas Concluídas', value: '24/35', trend: '2 esta semana' },
          { title: 'Tempo Estimado', value: '45d', trend: '-3 dias' },
        ].map((kpi, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <h3 className="text-sm font-medium text-gray-500">{kpi.title}</h3>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-2xl font-semibold text-gray-900">
                {kpi.value}
              </span>
              <span className="text-sm text-green-500">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Evolução do Projeto
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <BarChart className="h-8 w-8" />
          <span className="ml-2">Gráfico de Evolução</span>
        </div>
      </div>
    </div>
  );
};

export const MetricsTab = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Métricas de Desempenho
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <LineChart className="h-8 w-8" />
          <span className="ml-2">Gráfico de Métricas</span>
        </div>
      </div>
    </div>
  );
};

export const ObjectivesTab = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-4">
        {[
          { title: 'Objetivo 1', progress: 75, status: 'Em progresso' },
          { title: 'Objetivo 2', progress: 100, status: 'Concluído' },
          { title: 'Objetivo 3', progress: 30, status: 'Em progresso' },
        ].map((objective, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{objective.title}</h3>
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  objective.status === 'Concluído'
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                )}
              >
                {objective.status}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    {objective.progress}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: `${objective.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-customBlue transition-all duration-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
