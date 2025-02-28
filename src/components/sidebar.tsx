
import { useState, useEffect, useRef } from "react";
import {
  Home,
  FolderKanban,
  FileBarChart2,
  Users,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

// Menu items for main navigation
const menuItems: MenuItem[] = [
  { icon: Home, label: "Início", href: "/" },
  { icon: FolderKanban, label: "Projetos", href: "/projects" },
  { icon: Users, label: "Utilizadores", href: "/users" },
  { icon: Settings, label: "Validações", href: "/validations" },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  const toggleCollapse = () => setCollapsed(!collapsed);

  // Click outside handler to collapse sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (!collapsed) setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarRef, collapsed]);

  // Reusable menu item component
  const MenuItem = ({ item, className = "" }: { item: MenuItem; className?: string }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
        "text-gray-500 hover:text-gray-900",
        location.pathname === item.href && "text-customBlue bg-blue-50",
        className
      )}
    >
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200",
        location.pathname === item.href 
          ? "bg-customBlue text-white" 
          : "text-gray-500 group-hover:bg-customBlue group-hover:text-white"
      )}>
        <item.icon size={20} />
      </div>
      <span className={cn(
        "transition-all duration-200",
        collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
      )}>
        {item.label}
      </span>
    </Link>
  );

  return (
    <div className="fixed top-0 left-0 h-screen z-50">
      <div
        ref={sidebarRef}
        className={cn(
          "h-full bg-white shadow-lg transition-all duration-200 flex flex-col",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="h-32 flex items-center justify-center px-4">
          {!collapsed ? (
            <img
              src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
              alt="STAR Institute"
              className="h-8 transition-all duration-200"
            />
          ) : (
            <div className="h-10 w-10 rounded-lg bg-customBlue flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          )}
        </div>

        {/* Main Navigation Content */}
        <div className="flex-1 px-3 space-y-6">
          <nav className="space-y-6">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <MenuItem key={item.href} item={item} />
              ))}
            </div>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-3 border-t border-gray-100">
          {/* Collapse Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={cn(
              "w-full rounded-lg hover:bg-gray-50 transition-colors duration-200",
              collapsed ? "justify-center" : "justify-between"
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <>
                <span className="text-sm text-gray-500">Recolher menu</span>
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </>
            )}
          </Button>

          {/* Profile Section */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 p-2 mt-3 rounded-lg transition-colors duration-200",
              "hover:bg-gray-50",
              location.pathname === "/profile" && "bg-gray-50"
            )}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  João Silva
                </p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
