
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  FolderKanban, 
  Users, 
  Settings, 
  ChevronRight, 
  Calendar,
  BarChart3, 
  Clock, 
  FileBarChart2
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const featureCards = [
    { 
      id: "dashboard", 
      title: "Painel de Controlo", 
      description: "Aceda a uma visão geral da sua atividade, projetos e entregas pendentes.", 
      icon: Home,
      path: "/",
      color: "bg-customBlue/10 text-customBlue",
      features: [
        "Visão rápida dos projetos ativos",
        "Monitore as entregas próximas",
        "Acompanhe a sua ocupação semanal",
        "Visualize as tarefas pendentes"
      ]
    },
    { 
      id: "projects", 
      title: "Gestão de Projetos", 
      description: "Organize e acompanhe todos os projetos, pacotes de trabalho e tarefas.", 
      icon: FolderKanban,
      path: "/projects",
      color: "bg-emerald-100/80 text-emerald-700",
      features: [
        "Lista completa de projetos",
        "Detalhes e métricas dos projetos",
        "Cronograma e entregas",
        "Documentação e recursos"
      ]
    },
    { 
      id: "users", 
      title: "Gestão de Recursos", 
      description: "Gerencie a equipa, alocações e gere relatórios de desempenho.", 
      icon: Users,
      path: "/users",
      color: "bg-amber-100/80 text-amber-700",
      features: [
        "Visão geral da equipa",
        "Perfis de utilizadores",
        "Relatórios de alocação",
        "Gerar relatórios personalizados"
      ]
    },
    { 
      id: "validations", 
      title: "Validações", 
      description: "Configure e gerencie as regras de validação de dados e processos.", 
      icon: Settings,
      path: "/validations",
      color: "bg-rose-100/80 text-rose-700",
      features: [
        "Configurações de validação",
        "Regras e parâmetros",
        "Histórico de alterações",
        "Validação de dados"
      ]
    }
  ];

  // Interface screenshots for each section
  const screenshotUrls = {
    dashboard: "/lovable-uploads/931ba173-61e4-4816-9deb-8a37b93e964b.png",
    projects: "/lovable-uploads/95c2b3a8-d072-4daa-92c4-1b3d740429fb.png",
    users: "/lovable-uploads/95c2b3a8-d072-4daa-92c4-1b3d740429fb.png",
    validations: "/lovable-uploads/95c2b3a8-d072-4daa-92c4-1b3d740429fb.png"
  };

  const getSelectedFeature = () => {
    return featureCards.find(card => card.id === activeSection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-6 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              className="h-16 w-16 rounded-2xl bg-customBlue flex items-center justify-center shadow-lg shadow-customBlue/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <span className="text-white font-bold text-3xl">S</span>
            </motion.div>
          </div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Project Resource Allocator
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Uma plataforma completa para gestão de projetos, recursos e alocações. 
            Descubra como navegar e utilizar todas as funcionalidades da aplicação.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <Button asChild size="lg" className="rounded-xl bg-customBlue hover:bg-customBlue/90 shadow-md shadow-customBlue/20">
              <Link to="/">
                Começar <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl border-customBlue/20 text-customBlue hover:bg-customBlue/5">
              <a href="#features">
                Ver recursos
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section 
          id="features"
          className="py-16 space-y-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.div className="text-center mb-12" variants={item}>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Explore as Funcionalidades</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Conheça as principais áreas da aplicação e como utilizá-las para maximizar a sua produtividade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => (
              <motion.div 
                key={card.id}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card 
                  className={`border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-full ${activeSection === card.id ? 'ring-2 ring-customBlue/20' : ''}`}
                  onClick={() => setActiveSection(card.id)}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`p-3 rounded-xl ${card.color} w-fit mb-4`}>
                      <card.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">{card.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 flex-grow">{card.description}</p>
                    <Button asChild variant="ghost" size="sm" className="justify-start p-0 hover:bg-transparent hover:text-customBlue">
                      <Link to={card.path} className="flex items-center text-customBlue">
                        <span>Explorar</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Feature Details */}
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            variants={fadeIn}
          >
            <div className="order-2 md:order-1">
              <motion.h3 
                className="text-2xl font-bold mb-4 text-slate-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeSection + "-title"}
              >
                {getSelectedFeature()?.title}
              </motion.h3>
              <motion.p 
                className="text-slate-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeSection + "-desc"}
              >
                {getSelectedFeature()?.description}
              </motion.p>
              
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={activeSection + "-features"}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {getSelectedFeature()?.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`p-2 rounded-full ${getSelectedFeature()?.color}`}>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + index * 0.1 }}
                      >
                        {activeSection === "dashboard" && <BarChart3 className="h-4 w-4" />}
                        {activeSection === "projects" && <FolderKanban className="h-4 w-4" />}
                        {activeSection === "users" && <Users className="h-4 w-4" />}
                        {activeSection === "validations" && <Settings className="h-4 w-4" />}
                      </motion.div>
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button asChild className="rounded-xl bg-customBlue hover:bg-customBlue/90 shadow-md shadow-customBlue/20">
                  <Link to={getSelectedFeature()?.path || "/"}>
                    Ir para {getSelectedFeature()?.title} <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="order-1 md:order-2"
              key={activeSection + "-image"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/50 aspect-[16/9]">
                <img 
                  src={screenshotUrls[activeSection as keyof typeof screenshotUrls]} 
                  alt={`${getSelectedFeature()?.title} Screenshot`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Quick Navigation Guide */}
        <motion.section 
          className="py-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.div className="text-center mb-12" variants={item}>
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Guia Rápido de Navegação</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Aprenda como navegar na interface e utilize todos os recursos disponíveis.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={container}>
            <motion.div variants={item}>
              <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-xl bg-customBlue/10 text-customBlue w-fit">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Sidebar de Navegação</h3>
                  <p className="text-slate-600 mb-4">
                    Utilize a barra lateral para alternar rapidamente entre as várias secções da aplicação. 
                    Pode minimizá-la através do botão na parte inferior.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-customBlue/10 text-customBlue">
                        <Home className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-slate-700">Página principal</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                        <FolderKanban className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-slate-700">Projetos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-500">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-slate-700">Utilizadores</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-xl bg-emerald-100/80 text-emerald-700 w-fit">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Painéis de Estatísticas</h3>
                  <p className="text-slate-600 mb-4">
                    Cada secção apresenta painéis de estatísticas relevantes. 
                    Passe o rato por cima para ver detalhes adicionais e clique para aceder a informações mais específicas.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-white border border-slate-100 text-center">
                        <Clock className="h-4 w-4 mx-auto mb-1 text-customBlue" />
                        <span className="text-xl font-semibold block">75%</span>
                        <span className="text-xs text-slate-500">Ocupação</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-slate-100 text-center">
                        <FolderKanban className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
                        <span className="text-xl font-semibold block">4</span>
                        <span className="text-xs text-slate-500">Projetos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-md rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 rounded-xl bg-amber-100/80 text-amber-700 w-fit">
                    <FileBarChart2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">Relatórios</h3>
                  <p className="text-slate-600 mb-4">
                    Gere relatórios personalizados de alocação de recursos e desempenho de projetos 
                    através da secção de utilizadores e projetos.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-amber-100/80 text-amber-700">
                        <FileBarChart2 className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm text-slate-700 block">Relatório Mensal</span>
                        <span className="text-xs text-slate-500">PDF, Excel</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-rose-100/80 text-rose-700">
                        <FileBarChart2 className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-sm text-slate-700 block">Relatório Anual</span>
                        <span className="text-xs text-slate-500">PDF, Excel</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="mt-12 py-8 text-center"
          variants={fadeIn}
        >
          <p className="text-sm text-slate-500">
            Project Resource Allocator | STAR Institute
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Landing;
