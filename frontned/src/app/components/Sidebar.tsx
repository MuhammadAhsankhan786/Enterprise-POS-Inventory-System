import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  FileText,
  BarChart3,
  Users,
  Settings
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products / Fabric Master', href: '/products', icon: Package },
  { name: 'Inventory / Stock', href: '/inventory', icon: Warehouse },
  { name: 'POS Billing', href: '/pos', icon: ShoppingCart },
  { name: 'FBR Invoicing', href: '/fbr', icon: FileText },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Users & Roles', href: '/users', icon: Users },
];

export function Sidebar({ className = '' }: SidebarProps) {
  const location = useLocation();

  return (
    <div className={`w-64 bg-slate-900 text-white flex flex-col ${className}`}>
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl tracking-wide">TEXTILE MILL POS</h1>
        <p className="text-xs text-slate-400 mt-1">Enterprise System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 transition-colors
                ${isActive 
                  ? 'bg-slate-800 text-white border-l-4 border-blue-500' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-400">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2026 Textile Mills</p>
        </div>
      </div>
    </div>
  );
}
