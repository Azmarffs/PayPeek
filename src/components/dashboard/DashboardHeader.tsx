import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Plus, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ChevronDown,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Bell
} from 'lucide-react';
import { User, SortOption, SortDirection, ViewMode } from '../../types';

interface DashboardHeaderProps {
  user: User | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateCollection: () => void;
  sortOption: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption, direction: SortDirection) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeTab?: 'overview' | 'collections' | 'sales' | 'settings';
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  searchQuery,
  onSearchChange,
  onCreateCollection,
  sortOption,
  sortDirection,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeTab = 'overview'
}) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const handleSortOptionClick = (option: SortOption) => {
    // If clicking the same option, toggle direction, otherwise set new option with asc direction
    const newDirection = option === sortOption && sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(option, newDirection);
    setShowSortOptions(false);
  };
  
  const getSortIcon = (option: SortOption) => {
    if (option !== sortOption) {
      return <ArrowUpDown className="h-4 w-4 ml-1.5" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-4 w-4 ml-1.5" /> : 
      <ArrowDown className="h-4 w-4 ml-1.5" />;
  };

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New sale: Summer Photography Collection', time: '5 minutes ago', read: false },
    { id: 2, message: 'Your collection "Digital Art Masterclass" is trending', time: '1 hour ago', read: false },
    { id: 3, message: 'Payment of $49.99 received', time: '3 hours ago', read: true },
    { id: 4, message: 'New comment on your collection', time: '1 day ago', read: true }
  ];

  return (
    <div className="mb-8 space-y-6">
      {/* Welcome message */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Creator'}!
          </h1>
          <p className="text-secondary-300 mt-1">
            Manage your content collections and track your earnings
          </p>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3 mt-4 md:mt-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Notifications bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-white" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-primary-500 rounded-full border border-secondary-900"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-secondary-800 border border-white/10 rounded-lg shadow-lg z-10 py-1 backdrop-blur-sm">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 hover:bg-white/5 transition-colors ${notification.read ? '' : 'bg-white/5'}`}
                    >
                      <p className="text-sm text-white">{notification.message}</p>
                      <p className="text-xs text-secondary-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-white/10">
                  <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Create collection button */}
          <button
            onClick={onCreateCollection}
            className="flex items-center space-x-1 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg px-4 py-2.5 text-white hover:from-primary-500 hover:to-primary-600 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-1.5" />
            <span className="font-medium">Create Collection</span>
          </button>
        </motion.div>
      </div>
      
      {/* Search and actions bar - Only show for collections tab */}
      {activeTab === 'collections' && (
        <motion.div 
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-secondary-400" />
            </div>
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View mode toggle */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 flex items-center border border-white/20">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-secondary-300 hover:text-white'} transition-colors`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-secondary-300 hover:text-white'} transition-colors`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-colors"
              >
                <SlidersHorizontal className="h-5 w-5 mr-1.5" />
                <span>Sort</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-secondary-800 border border-white/10 rounded-lg shadow-lg z-10 py-1 backdrop-blur-sm">
                  <button
                    onClick={() => handleSortOptionClick('name')}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Name</span>
                    {getSortIcon('name')}
                  </button>
                  <button
                    onClick={() => handleSortOptionClick('date')}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Date</span>
                    {getSortIcon('date')}
                  </button>
                  <button
                    onClick={() => handleSortOptionClick('price')}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    <span>Price</span>
                    {getSortIcon('price')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHeader;