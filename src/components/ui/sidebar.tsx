import React, { useState, useEffect, useRef } from "react";
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

const menuItems = [
  { icon: Home, label: "Início", href: "/" },
  { icon: FolderKanban, label: "Projetos", href: "/projects" },
  { icon: FileBarChart2, label: "Relatórios", href: "/reports" },
  { icon: Users, label: "Utilizadores", href: "/users" },
];

const managementItems = [
  { icon: Settings, label: "Validações", href: "/validations" },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (!collapsed) {
          setCollapsed(true);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, collapsed]);

  const MenuItem = ({ item }: { item: { icon: any; label: string; href: string } }) => (
    <Link
      to={item.href}
      className={cn(
        "group flex items-center w-full rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 transition-all duration-300",
        location.pathname === item.href && "text-customBlue"
      )}
    >
      <div className="min-w-[3.5rem] flex items-center justify-center">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300",
          "group-hover:bg-customBlue group-hover:text-white",
          location.pathname === item.href && "bg-customBlue text-white"
        )}>
          <item.icon size={18} className="h-5 w-5 shrink-0" />
        </div>
      </div>
      <span
        className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          collapsed ? "w-0 opacity-0" : "w-auto opacity-100 ml-2"
        )}
      >
        {item.label}
      </span>
    </Link>
  );

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "h-screen bg-white shadow-lg border-r border-gray-100 transition-all duration-300 flex flex-col",
        collapsed ? "w-[4.5rem]" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center h-16 border-b border-gray-100">
        <div className={cn(
          "transition-all duration-300 overflow-hidden flex items-center",
          collapsed ? "w-10" : "w-full px-4"
        )}>
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <img
                src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
                alt="STAR Institute"
                className="h-8"
              />
              <span className="text-lg font-semibold text-gray-900">STAR Institute</span>
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <img
                src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
                alt="STAR Institute"
                className="h-6 w-6"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
              Gestão
            </p>
          )}
          {managementItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-3 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapse}
          className={cn(
            "w-full rounded-md hover:bg-gray-100 transition-all duration-300",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </Button>

        {/* Profile Section */}
        <Link
          to="/profile"
          className={cn(
            "mt-3 flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300",
            location.pathname === "/profile" && "bg-blue-50"
          )}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-blue-100">
              <User size={20} className="text-gray-600" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div className={cn(
            "min-w-0 transition-all duration-300 overflow-hidden",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <p className="text-sm font-medium text-gray-900 truncate">Vasco Fernandes</p>
            <p className="text-xs text-gray-500">Project Manager</p>
          </div>
        </Link>
      </div>
    </div>
  );
};