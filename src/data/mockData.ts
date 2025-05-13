import { Task, WorkPackage, Project, Resource, Budget, Material, TaskType } from "@/types/project";

// Tipos de Financiamento
export const tiposFinanciamento = [
  {
    id: 1,
    nome: "Horizonte Europa",
    campos: {
      codigoProj: true,
      taxaFinanciamento: true,
      coordenador: true,
      parceiros: true
    }
  },
  {
    id: 2,
    nome: "Portugal 2030",
    campos: {
      codigoProj: true,
      taxaFinanciamento: true,
      regiao: true
    }
  },
  {
    id: 3,
    nome: "Financiamento Interno",
    campos: {
      departamento: true,
      centroCusto: true
    }
  },
  {
    id: 4,
    nome: "Prestação de Serviços",
    campos: {
      cliente: true,
      contrato: true,
      valorTotal: true
    }
  }
];

// Recursos Humanos
export const recursosHumanos = [
  {
    id: 1,
    nome: "Ana Silva",
    foto: "/avatars/ana-silva.jpg",
    atividade: "Design UX/UI",
    contratacao: "2021-03-15",
    username: "anasilva",
    email: "ana.silva@empresa.pt",
    perfil: "Senior"
  },
  {
    id: 2,
    nome: "João Santos",
    foto: "/avatars/joao-santos.jpg",
    atividade: "Desenvolvimento Frontend",
    contratacao: "2020-06-01",
    username: "joaosantos",
    email: "joao.santos@empresa.pt",
    perfil: "Pleno"
  },
  {
    id: 3,
    nome: "Maria Costa",
    foto: "/avatars/maria-costa.jpg",
    atividade: "Gestão de Produto",
    contratacao: "2019-01-10",
    username: "mariacosta",
    email: "maria.costa@empresa.pt",
    perfil: "Senior"
  },
  {
    id: 4,
    nome: "Pedro Oliveira",
    foto: "/avatars/pedro-oliveira.jpg",
    atividade: "Desenvolvimento Backend",
    contratacao: "2022-02-15",
    username: "pedrooliveira",
    email: "pedro.oliveira@empresa.pt",
    perfil: "Junior"
  },
  {
    id: 5,
    nome: "Sofia Martins",
    foto: "/avatars/sofia-martins.jpg",
    atividade: "Análise de Dados",
    contratacao: "2021-11-05",
    username: "sofiamartins",
    email: "sofia.martins@empresa.pt",
    perfil: "Pleno"
  }
];

// Materiais
export const materiais = [
  {
    id: 1,
    nome: "Laptop Dell XPS 15",
    preco: 1899.99,
    quantidade: 5
  },
  {
    id: 2,
    nome: "Monitor LG 27\" 4K",
    preco: 499.99,
    quantidade: 10
  },
  {
    id: 3,
    nome: "Licença Adobe Creative Cloud",
    preco: 599.99,
    quantidade: 3
  },
  {
    id: 4,
    nome: "Servidor Cloud (anual)",
    preco: 1200.00,
    quantidade: 1
  },
  {
    id: 5,
    nome: "Dispositivo IoT Raspberry Pi",
    preco: 89.99,
    quantidade: 15
  },
  {
    id: 6,
    nome: "Sensor de Temperatura",
    preco: 24.99,
    quantidade: 30
  }
];

// Alocações de Recursos por Mês para as Tarefas
export const alocacoes = [
  // Tarefa 1, RH 1, Meses 1-3 de 2024
  { tarefaId: 1, rhId: 1, mes: 1, ano: 2024, ocupacao: 0.5 },
  { tarefaId: 1, rhId: 1, mes: 2, ano: 2024, ocupacao: 0.7 },
  { tarefaId: 1, rhId: 1, mes: 3, ano: 2024, ocupacao: 0.3 },
  
  // Tarefa 1, RH 2, Meses 2-4 de 2024
  { tarefaId: 1, rhId: 2, mes: 2, ano: 2024, ocupacao: 0.4 },
  { tarefaId: 1, rhId: 2, mes: 3, ano: 2024, ocupacao: 0.6 },
  { tarefaId: 1, rhId: 2, mes: 4, ano: 2024, ocupacao: 0.2 },
  
  // Tarefa 2, RH 1, Meses 4-6 de 2024
  { tarefaId: 2, rhId: 1, mes: 4, ano: 2024, ocupacao: 0.8 },
  { tarefaId: 2, rhId: 1, mes: 5, ano: 2024, ocupacao: 0.9 },
  { tarefaId: 2, rhId: 1, mes: 6, ano: 2024, ocupacao: 0.5 },
  
  // Tarefa 3, RH 3, Meses 3-5 de 2024
  { tarefaId: 3, rhId: 3, mes: 3, ano: 2024, ocupacao: 0.6 },
  { tarefaId: 3, rhId: 3, mes: 4, ano: 2024, ocupacao: 0.8 },
  { tarefaId: 3, rhId: 3, mes: 5, ano: 2024, ocupacao: 0.7 },
  
  // Tarefa 4, RH 4, Meses 6-8 de 2024
  { tarefaId: 4, rhId: 4, mes: 6, ano: 2024, ocupacao: 0.5 },
  { tarefaId: 4, rhId: 4, mes: 7, ano: 2024, ocupacao: 0.7 },
  { tarefaId: 4, rhId: 4, mes: 8, ano: 2024, ocupacao: 0.6 },
  
  // Tarefa 5, RH 5, Meses 7-9 de 2024
  { tarefaId: 5, rhId: 5, mes: 7, ano: 2024, ocupacao: 0.4 },
  { tarefaId: 5, rhId: 5, mes: 8, ano: 2024, ocupacao: 0.6 },
  { tarefaId: 5, rhId: 5, mes: 9, ano: 2024, ocupacao: 0.3 },
];

// Projetos
export const projetos = [
  {
    id: 1,
    nome: "Sistema de Monitorização IoT",
    descricao: "Desenvolvimento de um sistema integrado de monitorização IoT para ambientes industriais, incluindo sensores, gateway de dados e dashboard analítico.",
    inicio: "2024-01-15",
    fim: "2024-09-30",
    estado: false,
    tipoFinanciamentoId: 1,
    detalhesFinanciamento: {
      codigoProj: "HE-IoT-2023-871",
      taxaFinanciamento: 70,
      coordenador: "Universidade de Lisboa",
      parceiros: ["Instituto Superior Técnico", "INESC-ID", "IoT Solutions GmbH"]
    },
    progress: 25
  },
  {
    id: 2,
    nome: "Plataforma de Gestão de Projetos",
    descricao: "Criação de uma plataforma web para gestão de projetos, recursos e orçamentos, com capacidades de reporting e análise de KPIs.",
    inicio: "2024-03-01",
    fim: "2024-12-15",
    estado: false,
    tipoFinanciamentoId: 3,
    detalhesFinanciamento: {
      departamento: "Tecnologia da Informação",
      centroCusto: "CC-TI-2024"
    }
  },
  {
    id: 3,
    nome: "Aplicação Mobile para Saúde",
    descricao: "Desenvolvimento de uma aplicação mobile para monitorização de saúde, integrando com dispositivos wearable e fornecendo insights personalizados.",
    inicio: "2024-02-10",
    fim: "2024-10-25",
    estado: false,
    tipoFinanciamentoId: 2,
    detalhesFinanciamento: {
      codigoProj: "PT2030-SAUDE-451",
      taxaFinanciamento: 85,
      regiao: "Lisboa e Vale do Tejo"
    }
  },
  {
    id: 4,
    nome: "Sistema de Análise de Dados Energéticos",
    descricao: "Consultoria e implementação de sistema de análise de dados energéticos para otimização de consumo em edifícios comerciais.",
    inicio: "2024-04-01",
    fim: "2024-07-31",
    estado: false,
    tipoFinanciamentoId: 4,
    detalhesFinanciamento: {
      cliente: "EnergiaSA",
      contrato: "CONT-2024-0042",
      valorTotal: 75000
    }
  }
];

// Workpackages
export const workpackages = [
  // Projeto 1: Sistema de Monitorização IoT
  {
    id: 1,
    projetoId: 1,
    nome: "WP1: Requisitos e Arquitetura",
    inicio: "2024-01-15",
    fim: "2024-03-15",
    estado: true
  },
  {
    id: 2,
    projetoId: 1,
    nome: "WP2: Desenvolvimento de Hardware",
    inicio: "2024-03-01",
    fim: "2024-06-30",
    estado: false
  },
  {
    id: 3,
    projetoId: 1,
    nome: "WP3: Desenvolvimento de Software",
    inicio: "2024-04-01",
    fim: "2024-08-15",
    estado: false
  },
  {
    id: 4,
    projetoId: 1,
    nome: "WP4: Integração e Testes",
    inicio: "2024-08-01",
    fim: "2024-09-30",
    estado: false
  },
  
  // Projeto 2: Plataforma de Gestão de Projetos
  {
    id: 5,
    projetoId: 2,
    nome: "WP1: Análise e Design",
    inicio: "2024-03-01",
    fim: "2024-04-30",
    estado: false
  },
  {
    id: 6,
    projetoId: 2,
    nome: "WP2: Desenvolvimento Frontend",
    inicio: "2024-05-01",
    fim: "2024-09-30",
    estado: false
  },
  {
    id: 7,
    projetoId: 2,
    nome: "WP3: Desenvolvimento Backend",
    inicio: "2024-05-01",
    fim: "2024-10-15",
    estado: false
  },
  {
    id: 8,
    projetoId: 2,
    nome: "WP4: Testes e Deployment",
    inicio: "2024-10-01",
    fim: "2024-12-15",
    estado: false
  },
  
  // Projeto 3: Aplicação Mobile para Saúde
  {
    id: 9,
    projetoId: 3,
    nome: "WP1: UX Research",
    inicio: "2024-02-10",
    fim: "2024-03-31",
    estado: true
  },
  {
    id: 10,
    projetoId: 3,
    nome: "WP2: Design de UI",
    inicio: "2024-03-15",
    fim: "2024-05-15",
    estado: false
  },
  {
    id: 11,
    projetoId: 3,
    nome: "WP3: Desenvolvimento App",
    inicio: "2024-05-01",
    fim: "2024-09-30",
    estado: false
  },
  {
    id: 12,
    projetoId: 3,
    nome: "WP4: Integração e Testes",
    inicio: "2024-09-01",
    fim: "2024-10-25",
    estado: false
  }
];

// Tarefas
export const tarefas = [
  // WP1: Requisitos e Arquitetura (Projeto 1)
  {
    id: 1,
    workpackageId: 1,
    nome: "Levantamento de requisitos",
    inicio: "2024-01-15",
    fim: "2024-02-15",
    estado: true,
    rationale: "Identificar e documentar os requisitos funcionais e não funcionais do sistema através de entrevistas com stakeholders e análise de benchmarking."
  },
  {
    id: 2,
    workpackageId: 1,
    nome: "Definição da arquitetura",
    inicio: "2024-02-01",
    fim: "2024-03-15",
    estado: true,
    rationale: "Desenvolver a arquitetura técnica do sistema, incluindo componentes de hardware, software e comunicação entre sistemas."
  },
  
  // WP2: Desenvolvimento de Hardware (Projeto 1)
  {
    id: 3,
    workpackageId: 2,
    nome: "Prototipagem de sensores",
    inicio: "2024-03-01",
    fim: "2024-04-30",
    estado: false,
    rationale: "Criar protótipos funcionais dos sensores IoT para medição de temperatura, humidade e qualidade do ar."
  },
  {
    id: 4,
    workpackageId: 2,
    nome: "Desenvolvimento do gateway",
    inicio: "2024-04-15",
    fim: "2024-06-30",
    estado: false,
    rationale: "Desenvolver o gateway que fará a comunicação entre os sensores e a plataforma cloud, incluindo firmware e configurações de rede."
  },
  
  // WP3: Desenvolvimento de Software (Projeto 1)
  {
    id: 5,
    workpackageId: 3,
    nome: "API de integração",
    inicio: "2024-04-01",
    fim: "2024-06-15",
    estado: false,
    rationale: "Desenvolver a API RESTful que receberá os dados dos sensores e disponibilizará endpoints para consumo pelo frontend."
  },
  {
    id: 6,
    workpackageId: 3,
    nome: "Dashboard analítico",
    inicio: "2024-06-01",
    fim: "2024-08-15",
    estado: false,
    rationale: "Criar um dashboard web interativo para visualização e análise dos dados coletados, incluindo gráficos e alertas."
  },
  
  // WP1: Análise e Design (Projeto 2)
  {
    id: 7,
    workpackageId: 5,
    nome: "Levantamento de processos",
    inicio: "2024-03-01",
    fim: "2024-03-31",
    estado: false,
    rationale: "Mapear os processos atuais de gestão de projetos e identificar oportunidades de melhoria através da nova plataforma."
  },
  {
    id: 8,
    workpackageId: 5,
    nome: "Design UX/UI",
    inicio: "2024-04-01",
    fim: "2024-04-30",
    estado: false,
    rationale: "Criar wireframes e protótipos de alta fidelidade da interface da plataforma, seguindo princípios de usabilidade e experiência do utilizador."
  }
];

// Formatação para uso nos componentes do frontend

// Recursos para o componente Resources
export const mockResources: Resource[] = recursosHumanos.map(rh => ({
  id: rh.id,
  name: rh.nome,
  role: rh.atividade || "",
  profile: rh.perfil || "",
  joinDate: rh.contratacao || "",
  allocation: Array(12).fill(0).map((_, idx) => {
    const alocacao = alocacoes.find(a => a.rhId === rh.id && a.mes === idx + 1 && a.ano === 2024);
    return alocacao ? Number(alocacao.ocupacao) : 0;
  })
}));

// Orçamento para o componente Budget
export const mockBudget: Budget = {
  total: 350000,
  spent: 125000,
  remaining: 225000,
  categories: [
    { name: "Recursos Humanos", allocated: 200000, spent: 80000 },
    { name: "Equipamento", allocated: 100000, spent: 35000 },
    { name: "Software", allocated: 30000, spent: 10000 },
    { name: "Viagens", allocated: 20000, spent: 0 }
  ]
};

// Projeto para o componente Overview
export const mockProject: Project = {
  id: projetos[0].id,
  name: projetos[0].nome,
  description: projetos[0].descricao || "",
  startDate: projetos[0].inicio || "",
  endDate: projetos[0].fim || "",
  status: projetos[0].estado ? "completed" : "in-progress",
  fundingType: tiposFinanciamento.find(t => t.id === projetos[0].tipoFinanciamentoId)?.nome || "",
  fundingDetails: projetos[0].detalhesFinanciamento,
  workPackages: workpackages
    .filter(wp => wp.projetoId === projetos[0].id)
    .map(wp => ({
      id: wp.id,
      name: wp.nome,
      startDate: wp.inicio || "",
      endDate: wp.fim || "",
      status: wp.estado ? "completed" : "in-progress",
      tasks: tarefas
        .filter(t => t.workpackageId === wp.id)
        .map(t => {
          const tarefaRHs = recursosHumanos.filter(rh => 
            alocacoes.some(a => a.tarefaId === t.id && a.rhId === rh.id)
          );
          
          const resources = tarefaRHs.map(rh => ({
            id: rh.id,
            name: rh.nome,
            role: rh.atividade || "",
            profile: rh.perfil || "",
            joinDate: rh.contratacao || "",
            allocation: Array(12).fill(0).map((_, idx) => {
              const alocacao = alocacoes.find(a => 
                a.tarefaId === t.id && a.rhId === rh.id && a.mes === idx + 1 && a.ano === 2024
              );
              return alocacao ? Number(alocacao.ocupacao) : 0;
            })
          }));

          return {
            id: t.id,
            name: t.nome,
            type: "development" as TaskType,
            description: t.rationale || "",
            startDate: t.inicio || "",
            endDate: t.fim || "",
            status: t.estado ? "completed" : "in-progress",
            rationale: t.rationale || "",
            assignedTo: resources[0]?.name || "",
            resources,
            materials: []
          };
        }),
      materials: [] // Add the missing materials property
    })),
  progress: projetos[0].progress || 0
};

// Work Packages e Tarefas para o componente Timeline
export const mockWorkPackages: WorkPackage[] = workpackages
  .filter(wp => wp.projetoId === 1)
  .map(wp => {
    const wpTarefas = tarefas.filter(t => t.workpackageId === wp.id);
    
    return {
      id: wp.id,
      name: wp.nome,
      startDate: wp.inicio || "",
      endDate: wp.fim || "",
      status: wp.estado ? "completed" : "in-progress",
      tasks: wpTarefas.map(t => {
        // Encontrar recursos associados a esta tarefa
        const tarefaRHs = recursosHumanos.filter(rh => 
          alocacoes.some(a => a.tarefaId === t.id && a.rhId === rh.id)
        );
        
        // Para cada recurso, pegar sua alocação mensal
        const resources = tarefaRHs.map(rh => ({
          id: rh.id,
          name: rh.nome,
          role: rh.atividade || "",
          profile: rh.perfil || "",
          joinDate: rh.contratacao || "",
          allocation: Array(12).fill(0).map((_, idx) => {
            const alocacao = alocacoes.find(a => 
              a.tarefaId === t.id && a.rhId === rh.id && a.mes === idx + 1 && a.ano === 2024
            );
            return alocacao ? Number(alocacao.ocupacao) : 0;
          })
        }));
        
        // Gerar materiais fictícios para a tarefa
        const numMaterials = Math.floor(Math.random() * 3) + 1;
        const materials = materiais
          .slice(0, numMaterials)
          .map((m, idx) => ({
            id: idx + 1,
            name: m.nome,
            units: Math.floor(Math.random() * 5) + 1,
            unitPrice: Number(m.preco)
          }));
        
        return {
          id: t.id,
          name: t.nome,
          type: "development" as TaskType,
          description: t.rationale || "",
          startDate: t.inicio || "",
          endDate: t.fim || "",
          status: t.estado ? "completed" : "in-progress",
          rationale: t.rationale || "",
          assignedTo: resources[0]?.name || "",
          resources,
          materials
        };
      }),
      materials: [] // Add the missing materials property
    };
  });
