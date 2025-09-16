import { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  Settings, 
  Shield, 
  QrCode, 
  FileText, 
  AlertTriangle,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { 
    title: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    description: 'Overview & KPIs'
  },
  { 
    title: 'Harvest Monitor', 
    href: '/harvest', 
    icon: Sprout,
    description: 'Collection Events'
  },
  { 
    title: 'Processing', 
    href: '/processing', 
    icon: Settings,
    description: 'Batch Timeline'
  },
  { 
    title: 'Compliance', 
    href: '/compliance', 
    icon: Shield,
    description: 'Regulatory Status'
  },
  { 
    title: 'QR Management', 
    href: '/qr-codes', 
    icon: QrCode,
    description: 'Batch Tracking'
  },
  { 
    title: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Insights & Trends'
  },
  { 
    title: 'Recalls', 
    href: '/recalls', 
    icon: AlertTriangle,
    description: 'Risk Management'
  },
  { 
    title: 'Reports', 
    href: '/reports', 
    icon: FileText,
    description: 'Export Data'
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export default function Sidebar({ collapsed, onToggleCollapsed }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: collapsed ? 80 : 280,
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      className="h-screen bg-card border-r border-border shadow-enterprise flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">AyurChain</h1>
              <p className="text-xs text-muted-foreground">Supply Traceability</p>
            </div>
          </motion.div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapsed}
          className="h-8 w-8 p-0 hover:bg-muted/50"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth",
                "hover:bg-muted/50 relative",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className={cn(
                    "text-xs opacity-70",
                    isActive ? "text-primary-foreground/70" : ""
                  )}>
                    {item.description}
                  </div>
                </motion.div>
              )}

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 gradient-primary rounded-lg -z-10"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className={cn(
          "text-xs text-muted-foreground text-center",
          collapsed && "px-2"
        )}>
          {collapsed ? "v2.1" : "AyurChain Platform v2.1"}
        </div>
      </div>
    </motion.aside>
  );
}