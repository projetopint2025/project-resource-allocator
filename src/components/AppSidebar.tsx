
import { useState } from "react";
import { LayoutDashboard, FolderKanban, ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: FolderKanban,
    label: "Projetos",
    href: "/projects",
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
      <div className="flex items-center justify-between p-4">
        <h1
          className={cn(
            "font-semibold transition-opacity duration-300",
            collapsed && "opacity-0"
          )}
        >
          Project Hub
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <Menu size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="p-2">
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
      </nav>
    </div>
  );
};
