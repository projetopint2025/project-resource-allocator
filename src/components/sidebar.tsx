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
  {
    icon: Users,
    label: "Utilizadores",
    href: "/users",
  },
];

const managementItems = [
  {
    icon: Settings,
    label: "Validações",
    href: "/validations",
  },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Function to toggle the sidebar collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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

  const MenuItem = ({ item, className = "" }) => (
    <Link
      to={item.href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200",
        location.pathname === item.href && "text-customBlue"
      )}
    >
      <div className={cn(
        "p-2 rounded-md transition-colors duration-200",
        "group-hover:bg-customBlue group-hover:text-white",
        location.pathname === item.href && "bg-customBlue text-white"
      )}>
        <item.icon size={18} className="h-5 w-5 shrink-0" />
      </div>
      <span
        className={cn(
          "transition-all duration-200",
          collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
        )}
      >
        {item.label}
      </span>
    </Link>
  );

  return (
    <div className="relative h-screen flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={cn(
          "h-screen bg-white border-r border-gray-100 transition-all duration-200 flex flex-col",
          collapsed ? "w-[4.5rem]" : "w-64"
        )}
      >
        {/* Logo and Toggle Section */}
        <div className="flex items-center mt-5 p-4 border-b border-gray-100 justify-center">
          {!collapsed && (
            <img
              src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
              alt="STAR Institute"
              className="h-8 transition-all duration-200"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-4 pt-8">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <MenuItem key={item.href} item={item} />
            ))}
          </div>

          <div className="space-y-2">
            {!collapsed && (
              <p className="px-3 mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Gestão
              </p>
            )}
            {managementItems.map((item) => (
              <MenuItem key={item.href} item={item} />
            ))}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={cn(
              "w-full rounded-md hover:bg-gray-100 transition-colors duration-200",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            {collapsed ? (
              <ChevronRight
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform duration-200",
                  collapsed && "rotate-0"
                )}
              />
            ) : (
              <ChevronLeft
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform duration-200",
                  collapsed && "rotate-180"
                )}
              />
            )}
          </Button>

          {/* Profile Section */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200 mt-3",
              location.pathname === "/profile" && "bg-gray-50"
            )}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Vasco Fernandes
                </p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};