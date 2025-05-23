
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem = ({ icon, label, path, active, collapsed }: SidebarItemProps) => {
  return (
    <Link to={path} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 transition-colors duration-150",
          collapsed ? "justify-center" : "",
          active ? "bg-techstock-purple/10 text-techstock-purple-light" : "text-white hover:bg-techstock-purple hover:text-techstock-gold" // Always visible text, invert on hover
        )}
        style={{
          color: active ? '#B794F4' : undefined, // techstock-purple-light
          background: active ? 'rgba(183, 148, 244, 0.1)' : undefined
        }}
      >
        <div className="flex h-5 w-5 items-center justify-center">
          {icon}
        </div>
        {!collapsed && <span className="font-bold" data-component-name="SidebarItem">{label}</span>}
      </Button>
    </Link>
  );
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const location = useLocation();
  
  const sidebarItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Lucide LayoutDashboard icon */}
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
        </svg>
      ),
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: "Course Overview",
      path: "/dashboard/course",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h8M12 8v8" />
        </svg>
      ),
      label: "My Portfolio",
      path: "/dashboard/portfolio",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      label: "Knowledge Test",
      path: "/dashboard/test",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 3a4.5 4.5 0 0 1 4.5 4.5v7a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 12 14.5v-7A4.5 4.5 0 0 1 16.5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "AI Assistant",
      path: "/dashboard/ai-assistant",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12h20M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Stock Analyzer",
      path: "/dashboard/stock-analyzer",
    },
  ];

  return (
    <div 
      className={cn(
        "bg-[#0D0D18] border-r border-techstock-gray/30 h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      {/* Header del sidebar */}
      <div className={cn(
        "h-16 flex items-center px-4 border-b border-techstock-gray/30 mb-8",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-techstock-purple-light">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12.4306 9.70695C12.742 9.33317 13.2633 9.30058 13.6052 9.62118L19.1798 14.8165C19.4894 15.1054 19.4894 15.5841 19.1798 15.873L13.6052 21.0683C13.2633 21.3889 12.742 21.3563 12.4306 19.9991V9.70695Z" fill="currentColor" />
            </svg>
            <span className="font-bold text-white">TechStock</span>
          </Link>
        )}

        {collapsed && (
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-techstock-purple-light">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12.4306 9.70695C12.742 9.33317 13.2633 9.30058 13.6052 9.62118L19.1798 14.8165C19.4894 15.1054 19.4894 15.5841 19.1798 15.873L13.6052 21.0683C13.2633 21.3889 12.742 21.3563 12.4306 19.9991V9.70695Z" fill="currentColor" />
          </svg>
        )}
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white p-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7M19 19l-7-7 7-7"} />
          </svg>
        </button>
      </div>
      
      {/* Navegación */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={location.pathname === item.path}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>
      
      {/* Footer del sidebar */}
      <div className="p-4 border-t border-techstock-gray/30">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-start gap-3"
        )}>
          <div className="w-8 h-8 rounded-full bg-techstock-purple-light flex items-center justify-center text-white">
            U
          </div>
          {!collapsed && (
            <div className="text-sm">
              <p className="font-medium text-white">Usuario Demo</p>
              <p className="text-gray-400 text-xs">demo@techstock.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
