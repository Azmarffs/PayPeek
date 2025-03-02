import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, FolderOpen, DollarSign, Settings } from 'lucide-react';

interface DashboardTabsProps {
  activeTab: 'overview' | 'collections' | 'sales' | 'settings';
  onTabChange: (tab: 'overview' | 'collections' | 'sales' | 'settings') => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'collections', label: 'Collections', icon: FolderOpen },
    { id: 'sales', label: 'Sales', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-xl p-1 flex flex-wrap md:flex-nowrap border border-white/10 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`flex items-center justify-center md:justify-start flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-secondary-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <tab.icon className="h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">{tab.label}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default DashboardTabs;