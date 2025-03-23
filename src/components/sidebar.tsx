
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
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

// Menu items for main navigation
const menuItems = [
  { icon: Home, label: "Início", href: "/" },
  { icon: FolderKanban, label: "Projetos", href: "/projects" },
  { icon: Users, label: "Utilizadores", href: "/users" },
];

// Management section items
const managementItems = [
  { icon: Settings, label: "Validações", href: "/validations" },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
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
  const MenuItem = ({ item, className = "" }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 group",
        "text-gray-500 hover:text-gray-900",
        location.pathname === item.href && "text-customBlue",
        className
      )}
    >
      <motion.div 
        className={cn(
          "p-2 rounded-xl transition-all duration-300",
          location.pathname === item.href 
            ? "bg-customBlue text-white shadow-md shadow-customBlue/20" 
            : "bg-gray-50 text-gray-500 group-hover:bg-customBlue group-hover:text-white"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <item.icon size={18} />
      </motion.div>
      <motion.span 
        className={cn(
          "transition-all duration-300",
          collapsed ? "opacity-0 w-0 absolute" : "opacity-100 w-auto"
        )}
        initial={collapsed ? { opacity: 0, width: 0 } : { opacity: 1 }}
        animate={collapsed ? { opacity: 0, width: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
      </motion.span>
    </Link>
  );

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: "16rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    collapsed: {
      width: "4.5rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const logoVariants = {
    expanded: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    collapsed: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.1, ease: "easeInOut" }
    }
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 z-40 p-4 h-screen pointer-events-none">
      <motion.div
        ref={sidebarRef}
        className={cn(
          "h-full glass-card pointer-events-auto",
          "flex flex-col backdrop-blur-xl",
          "border border-white/30 shadow-xl",
          "relative overflow-hidden"
        )}
        initial="collapsed"
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 px-4 mt-5">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="full-logo"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={logoVariants}
                className="flex items-center justify-center w-full"
              >
                <img
                  src="/lovable-uploads/28745dc3-1b1b-490b-8612-41cb26f8c61d.png"
                  alt="STAR Institute"
                  className="h-8 transition-all duration-200"
                />
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={iconVariants}
                className="h-10 w-10 rounded-xl bg-customBlue flex items-center justify-center shadow-md shadow-customBlue/20"
              >
                <span className="text-white font-bold text-lg">S</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Navigation Content */}
        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="space-y-6">
            {/* Main Menu Items */}
            <motion.div 
              className="space-y-2"
              variants={{
                expanded: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                collapsed: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {menuItems.map((item, index) => (
                <motion.div 
                  key={item.href}
                  variants={{
                    expanded: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.05, duration: 0.2 } 
                    },
                    collapsed: { 
                      opacity: collapsed ? 1 : 0, 
                      x: collapsed ? 0 : -20,
                      transition: { duration: 0.2 } 
                    }
                  }}
                >
                  <MenuItem item={item} />
                </motion.div>
              ))}
            </motion.div>

            {/* Separator with animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: collapsed ? 0 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {!collapsed && <Separator className="my-4 opacity-30" />}
            </motion.div>

            {/* Management Section */}
            <motion.div 
              className="space-y-2"
              variants={{
                expanded: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                collapsed: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {!collapsed && (
                <motion.p 
                  className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Gestão
                </motion.p>
              )}
              {managementItems.map((item, index) => (
                <motion.div 
                  key={item.href}
                  variants={{
                    expanded: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.2 + index * 0.05, duration: 0.2 } 
                    },
                    collapsed: { 
                      opacity: collapsed ? 1 : 0, 
                      x: collapsed ? 0 : -20,
                      transition: { duration: 0.2 } 
                    }
                  }}
                >
                  <MenuItem item={item} />
                </motion.div>
              ))}
            </motion.div>
          </nav>
        </ScrollArea>

        {/* Footer Section with Collapse Button and Profile */}
        <div className="p-3 mt-auto border-t border-white/10">
          {/* Collapse Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={cn(
              "w-full rounded-xl hover:bg-white/10 transition-all duration-300",
              collapsed ? "justify-center" : "justify-between",
              "text-gray-500 hover:text-customBlue"
            )}
          >
            {collapsed ? (
              <motion.div 
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.div>
            ) : (
              <>
                <span className="text-sm">Recolher</span>
                <motion.div 
                  whileHover={{ scale: 1.2, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.div>
              </>
            )}
          </Button>

          {/* Profile Section */}
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-3 p-2 mt-3 rounded-xl transition-all duration-300",
              "hover:bg-white/10",
              location.pathname === "/profile" && "bg-white/5"
            )}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-9 h-9 rounded-xl bg-customBlue-subtle flex items-center justify-center shadow-sm">
                <User size={18} className="text-customBlue" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border-2 border-white" />
            </motion.div>
            
            <AnimatePresence>
              {!collapsed && (
                <motion.div 
                  className="min-w-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Vasco Fernandes
                  </p>
                  <p className="text-xs text-gray-500">Project Manager</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {hovered && !collapsed && (
              <motion.div 
                className="ml-auto"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-500" 
                  title="Logout"
                >
                  <LogOut size={16} className="text-gray-400" />
                </Button>
              </motion.div>
            )}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
