import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Clock, 
  Archive, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';
import { Collection } from '../../types';

interface AnalyticsData {
  totalEarnings: number;
  totalViews: number;
  activeCollections: number;
  expiredCollections: number;
  recentSales: {
    id: string;
    collection: string;
    amount: number;
    date: string;
    buyer: string;
  }[];
  monthlyEarnings: {
    month: string;
    earnings: number;
  }[];
  topCollections: {
    id: string;
    title: string;
    earnings: number;
    views: number;
  }[];
}

interface DashboardAnalyticsProps {
  isLoading: boolean;
  analyticsData: AnalyticsData;
  collections: Collection[];
  onCollectionClick: (collection: Collection) => void;
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({
  isLoading,
  analyticsData,
  collections,
  onCollectionClick
}) => {
  // Find the collection by id
  const getCollectionById = (id: string) => {
    return collections.find(collection => collection.id === id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Calculate the highest value in monthly earnings for chart scaling
  const maxEarnings = Math.max(...analyticsData.monthlyEarnings.map(item => item.earnings));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md animate-pulse">
            <div className="h-8 bg-secondary-700/50 rounded-md w-1/2 mb-4"></div>
            <div className="h-10 bg-secondary-700/50 rounded-md w-3/4 mb-2"></div>
            <div className="h-4 bg-secondary-700/50 rounded-md w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-300 font-medium">Total Earnings</h3>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">${analyticsData.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>12.5% from last month</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-300 font-medium">Total Views</h3>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Eye className="h-5 w-5 text-primary-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analyticsData.totalViews.toLocaleString()}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>8.2% from last month</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-300 font-medium">Active Collections</h3>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Clock className="h-5 w-5 text-primary-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analyticsData.activeCollections}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>2 new this month</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-secondary-300 font-medium">Expired Collections</h3>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Archive className="h-5 w-5 text-primary-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analyticsData.expiredCollections}</p>
          <div className="flex items-center text-red-400 text-sm">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            <span>1 expired this month</span>
          </div>
        </motion.div>
      </div>
      
      {/* Charts and tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly earnings chart */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Earnings</h3>
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <BarChart3 className="h-5 w-5 text-primary-400" />
            </div>
          </div>
          
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {analyticsData.monthlyEarnings.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div 
                    className="w-full max-w-[30px] bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md relative group"
                    style={{ 
                      height: item.earnings > 0 ? `${(item.earnings / maxEarnings) * 100}%` : '0%',
                      minHeight: item.earnings > 0 ? '4px' : '0px'
                    }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-secondary-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        ${item.earnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-secondary-400 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
            
            {/* Horizontal grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index} 
                  className="w-full h-px bg-white/10"
                  style={{ bottom: `${index * 25}%` }}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Top collections */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Top Collections</h3>
          <div className="space-y-4">
            {analyticsData.topCollections.map((collection, index) => {
              const fullCollection = getCollectionById(collection.id);
              return fullCollection ? (
                <div 
                  key={collection.id}
                  className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => onCollectionClick(fullCollection)}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary-800 rounded-md overflow-hidden mr-3">
                    {fullCollection.thumbnailUrl ? (
                      <img 
                        src={fullCollection.thumbnailUrl} 
                        alt={fullCollection.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-primary-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{fullCollection.title}</p>
                    <p className="text-secondary-300 text-sm">${collection.earnings.toLocaleString()} • {collection.views} views</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-secondary-400" />
                </div>
              ) : null;
            })}
          </div>
          <button
            className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-primary-400 text-sm font-medium"
          >
            View All Collections
          </button>
        </motion.div>
      </div>
      
      {/* Recent sales */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Sales</h3>
          <div className="p-2 bg-primary-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary-400" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-300 uppercase tracking-wider">Collection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-300 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {analyticsData.recentSales.map((sale, index) => (
                <tr key={sale.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{sale.collection}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-200">{sale.buyer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-200">${sale.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-200">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
            View All Sales
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardAnalytics;