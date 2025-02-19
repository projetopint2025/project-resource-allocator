
import { useState } from "react";
import { Home, FolderKanban, ChevronLeft, Menu, Users, FileBarChart2, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const MenuItem = ({ item, className = "" }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
        "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
        location.pathname === item.href && "bg-indigo-50 text-indigo-600",
        className
      )}
    >
      <item.icon 
        size={20} 
        className={cn(
          "transition-transform duration-300",
          location.pathname === item.href ? "text-indigo-600" : "text-gray-400",
          collapsed && "transform scale-110"
        )} 
      />
      <span
        className={cn(
          "font-medium transition-all duration-300",
          collapsed && "opacity-0 w-0"
        )}
      >
        {item.label}
      </span>
    </Link>
  );

  return (
    <div
      className={cn(
        "h-screen bg-white transition-all duration-300 relative flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-center p-6 h-16">
        <img 
          src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png" 
          alt="STAR Institute"
          className={cn(
            "h-8 transition-all duration-300",
            collapsed ? "w-8 object-cover object-left" : "w-auto"
          )}
        />
      </div>

      <nav className="flex-1 px-3 py-6 space-y-8">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>

        <div className="space-y-1">
          <p className={cn(
            "px-3 text-xs font-medium text-gray-400 uppercase tracking-wider mb-2",
            collapsed && "opacity-0"
          )}>
            Gestão
          </p>
          {managementItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      <div className="p-3">
        <Link
          to="/profile"
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all",
            "hover:bg-gray-50",
            location.pathname === "/profile" && "bg-indigo-50"
          )}
        >
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={20} className="text-indigo-600" />
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
          </div>
          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              collapsed && "w-0 opacity-0"
            )}
          >
            <p className="font-medium text-gray-900">Vasco Fernandes</p>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
