
import { useState } from "react";
import { Home, FolderKanban, ChevronLeft, Menu, Users, FileBarChart2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: Home,
    label: "Início",
    href: "/",
  },
  {
    icon: FolderKanban,
    label: "Projetos",
    href: "/projects",
  },
  {
    icon: FileBarChart2,
    label: "Relatórios",
    href: "/reports",
  },
];

const managementItems = [
  {
    icon: Users,
    label: "Utilizadores",
    href: "/users",
  },
  {
    icon: Settings,
    label: "Validações",
    href: "/validations",
  },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-border transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-center p-4 h-16 border-b border-border">
        <img 
          src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png" 
          alt="STAR Institute"
          className={cn(
            "h-8 transition-all duration-300",
            collapsed ? "w-8 object-cover object-left" : "w-auto"
          )}
        />
      </div>

      <nav className="p-2 space-y-6">
        <div>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A1F2C]/5 transition-colors",
                "text-[#1A1F2C]/70 hover:text-[#1A1F2C]",
                window.location.pathname === item.href && "bg-[#1A1F2C]/5 text-[#1A1F2C]"
              )}
            >
              <item.icon size={20} className="text-[#9b87f5]" />
              <span
                className={cn(
                  "transition-opacity duration-300 font-medium",
                  collapsed && "opacity-0"
                )}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className={cn(
            "px-3 text-sm font-medium text-[#1A1F2C]/50 mb-2",
            collapsed && "opacity-0"
          )}>
            Gestão
          </p>
          {managementItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg hover:bg-[#1A1F2C]/5 transition-colors",
                "text-[#1A1F2C]/70 hover:text-[#1A1F2C]",
                window.location.pathname === item.href && "bg-[#1A1F2C]/5 text-[#1A1F2C]"
              )}
            >
              <item.icon size={20} className="text-[#9b87f5]" />
              <span
                className={cn(
                  "transition-opacity duration-300 font-medium",
                  collapsed && "opacity-0"
                )}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <div className={cn(
            "flex items-center gap-3 p-3 text-[#1A1F2C]/70",
            collapsed && "justify-center"
          )}>
            <Users size={20} className="text-[#9b87f5]" />
            <span className={cn(
              "font-medium transition-opacity duration-300",
              collapsed && "opacity-0"
            )}>
              Vasco Fernandes
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};
