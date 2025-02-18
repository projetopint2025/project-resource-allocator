
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
        "h-screen bg-background border-r border-border transition-all duration-300 relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center p-4 h-16 border-b border-border">
        <img 
          src="/lovable-uploads/931ba173-61e4-4816-9deb-8a37b93e964b.png" 
          alt="STAR Institute"
          className={cn(
            "h-8 transition-all duration-300",
            collapsed ? "w-8" : "w-auto"
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
                "flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors",
                "text-muted-foreground hover:text-foreground",
                window.location.pathname === item.href && "bg-accent text-foreground"
              )}
            >
              <item.icon size={20} />
              <span
                className={cn(
                  "transition-opacity duration-300",
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
            "px-3 text-xs font-medium text-muted-foreground mb-2",
            collapsed && "opacity-0"
          )}>
            Gestão
          </p>
          {managementItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors",
                "text-muted-foreground hover:text-foreground",
                window.location.pathname === item.href && "bg-accent text-foreground"
              )}
            >
              <item.icon size={20} />
              <span
                className={cn(
                  "transition-opacity duration-300",
                  collapsed && "opacity-0"
                )}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-2 rounded-lg hover:bg-accent transition-colors flex items-center gap-3 text-muted-foreground"
          >
            {collapsed ? (
              <Menu size={20} />
            ) : (
              <>
                <ChevronLeft size={20} />
                <span>Colapsar menu</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
};
