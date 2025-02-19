
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
        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
        "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80",
        location.pathname === item.href && "bg-gray-100/80 text-gray-900",
        className
      )}
    >
      <item.icon 
        size={20} 
        className={cn(
          "text-[#4338ca] transition-transform duration-300",
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
        "h-screen bg-white border-r border-gray-100 transition-all duration-300 relative flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-center p-6 h-16 border-b border-gray-100">
        <img 
          src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png" 
          alt="STAR Institute"
          className={cn(
            "h-8 transition-all duration-300",
            collapsed ? "w-8 object-cover object-left" : "w-auto"
          )}
        />
      </div>

      <nav className="flex-1 p-4 space-y-8">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>

        <div className="space-y-2">
          <p className={cn(
            "px-3 text-xs font-medium text-gray-400 uppercase tracking-wider",
            collapsed && "opacity-0"
          )}>
            Gestão
          </p>
          {managementItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link
          to="/profile"
          className={cn(
            "flex items-center gap-3 p-3 rounded-xl transition-all",
            "text-gray-500 hover:text-gray-900 hover:bg-gray-100/80",
            location.pathname === "/profile" && "bg-gray-100/80 text-gray-900"
          )}
        >
          <User size={20} className="text-[#4338ca]" />
          <div
            className={cn(
              "transition-all duration-300",
              collapsed && "opacity-0 w-0"
            )}
          >
            <p className="font-medium">Vasco Fernandes</p>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
