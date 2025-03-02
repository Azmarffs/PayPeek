import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Collection, SortOption, SortDirection, ViewMode } from '../../types';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import CollectionGrid from '../../components/dashboard/CollectionGrid';
import CollectionDetailModal from '../../components/dashboard/CollectionDetailModal';
import CreateCollectionModal from '../../components/dashboard/CreateCollectionModal';
import DashboardAnalytics from '../../components/dashboard/DashboardAnalytics';
import DashboardTabs from '../../components/dashboard/DashboardTabs';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for collections
const mockCollections: Collection[] = [
  {
    id: '1',
    title: 'Summer Photography Collection',
    price: 19.99,
    expiryDate: '2025-12-31T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'active',
    createdAt: '2023-06-15T10:30:00.000Z',
    updatedAt: '2023-06-15T10:30:00.000Z',
    description: 'A collection of stunning summer landscapes and beach photography from around the world.',
    itemCount: 25,
    views: 342,
    earnings: 1245.67
  },
  {
    id: '2',
    title: 'Digital Art Masterclass',
    price: 49.99,
    expiryDate: '2025-10-15T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'active',
    createdAt: '2023-05-20T14:45:00.000Z',
    updatedAt: '2023-05-20T14:45:00.000Z',
    description: 'Learn digital art techniques from professional artists with over 50 hours of video content.',
    itemCount: 42,
    views: 189,
    earnings: 899.82
  },
  {
    id: '3',
    title: 'Fitness Workout Videos',
    price: 29.99,
    expiryDate: '2023-08-01T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'expired',
    createdAt: '2023-02-10T09:15:00.000Z',
    updatedAt: '2023-02-10T09:15:00.000Z',
    description: 'Complete home workout routines for all fitness levels with professional trainers.',
    itemCount: 30,
    views: 521,
    earnings: 1567.29
  },
  {
    id: '4',
    title: 'Cooking Recipes eBook',
    price: 14.99,
    expiryDate: '2025-11-20T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'active',
    createdAt: '2023-07-05T16:20:00.000Z',
    updatedAt: '2023-07-05T16:20:00.000Z',
    description: 'Over 100 delicious recipes from around the world with step-by-step instructions.',
    itemCount: 112,
    views: 276,
    earnings: 419.72
  },
  {
    id: '5',
    title: 'Web Development Course',
    price: 79.99,
    expiryDate: '2025-09-30T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'active',
    createdAt: '2023-04-12T11:10:00.000Z',
    updatedAt: '2023-04-12T11:10:00.000Z',
    description: 'Comprehensive web development course covering HTML, CSS, JavaScript, React, and Node.js.',
    itemCount: 85,
    views: 412,
    earnings: 3299.59
  },
  {
    id: '6',
    title: 'Stock Photo Bundle',
    price: 39.99,
    expiryDate: '2025-08-15T00:00:00.000Z',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80',
    status: 'active',
    createdAt: '2023-03-25T13:40:00.000Z',
    updatedAt: '2023-03-25T13:40:00.000Z',
    description: 'High-quality stock photos for commercial use, including nature, business, and lifestyle images.',
    itemCount: 200,
    views: 156,
    earnings: 623.84
  }
];

// Analytics data
const analyticsData = {
  totalEarnings: 8056.93,
  totalViews: 1896,
  activeCollections: 5,
  expiredCollections: 1,
  recentSales: [
    { id: 'sale1', collection: 'Summer Photography Collection', amount: 19.99, date: '2023-07-15T10:30:00.000Z', buyer: 'john.doe@example.com' },
    { id: 'sale2', collection: 'Digital Art Masterclass', amount: 49.99, date: '2023-07-14T14:45:00.000Z', buyer: 'jane.smith@example.com' },
    { id: 'sale3', collection: 'Web Development Course', amount: 79.99, date: '2023-07-13T11:10:00.000Z', buyer: 'mike.johnson@example.com' },
    { id: 'sale4', collection: 'Cooking Recipes eBook', amount: 14.99, date: '2023-07-12T16:20:00.000Z', buyer: 'sarah.williams@example.com' },
  ],
  monthlyEarnings: [
    { month: 'Jan', earnings: 450 },
    { month: 'Feb', earnings: 650 },
    { month: 'Mar', earnings: 850 },
    { month: 'Apr', earnings: 1050 },
    { month: 'May', earnings: 950 },
    { month: 'Jun', earnings: 1250 },
    { month: 'Jul', earnings: 1450 },
    { month: 'Aug', earnings: 1650 },
    { month: 'Sep', earnings: 0 },
    { month: 'Oct', earnings: 0 },
    { month: 'Nov', earnings: 0 },
    { month: 'Dec', earnings: 0 }
  ],
  topCollections: [
    { id: '5', title: 'Web Development Course', earnings: 3299.59, views: 412 },
    { id: '3', title: 'Fitness Workout Videos', earnings: 1567.29, views: 521 },
    { id: '1', title: 'Summer Photography Collection', earnings: 1245.67, views: 342 }
  ]
};

type DashboardTab = 'overview' | 'collections' | 'sales' | 'settings';

const Dashboard: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filteredCollections, setFilteredCollections] = useState<Collection[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editCollection, setEditCollection] = useState<Collection | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollections(mockCollections);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort collections when dependencies change
  useEffect(() => {
    let result = [...collections];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(collection => 
        collection.title.toLowerCase().includes(query) || 
        (collection.description && collection.description.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortOption) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'date':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredCollections(result);
  }, [collections, searchQuery, sortOption, sortDirection]);

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to home page
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option: SortOption, direction: SortDirection) => {
    setSortOption(option);
    setSortDirection(direction);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handleCollectionClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setShowDetailModal(true);
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(collection => collection.id !== id));
  };

  const handleEditCollection = (collection: Collection) => {
    setEditCollection(collection);
    setShowCreateModal(true);
    setShowDetailModal(false);
  };

  const handleCreateCollection = () => {
    setEditCollection(null);
    setShowCreateModal(true);
  };

  const handleSaveCollection = (collectionData: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    
    if (editCollection) {
      // Update existing collection
      const updatedCollections = collections.map(collection => 
        collection.id === editCollection.id 
          ? { 
              ...collection, 
              ...collectionData, 
              updatedAt: now 
            } 
          : collection
      );
      setCollections(updatedCollections);
    } else {
      // Create new collection
      const newCollection: Collection = {
        id: uuidv4(),
        ...collectionData,
        createdAt: now,
        updatedAt: now
      };
      setCollections([...collections, newCollection]);
    }
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  // Calculate total earnings from collections
  const totalEarnings = collections.reduce((sum, collection) => sum + (collection.earnings || 0), 0);
  
  // Calculate total views from collections
  const totalViews = collections.reduce((sum, collection) => sum + (collection.views || 0), 0);
  
  // Count active and expired collections
  const activeCollectionsCount = collections.filter(c => c.status === 'active').length;
  const expiredCollectionsCount = collections.filter(c => c.status === 'expired').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <DashboardHeader
          user={currentUser}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onCreateCollection={handleCreateCollection}
          sortOption={sortOption}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          activeTab={activeTab}
        />
        
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {activeTab === 'overview' && (
              <DashboardAnalytics 
                isLoading={isLoading}
                analyticsData={analyticsData}
                collections={collections}
                onCollectionClick={handleCollectionClick}
              />
            )}
            
            {activeTab === 'collections' && (
              <CollectionGrid
                collections={filteredCollections}
                isLoading={isLoading}
                viewMode={viewMode}
                onCollectionClick={handleCollectionClick}
                onDeleteCollection={handleDeleteCollection}
                onEditCollection={handleEditCollection}
              />
            )}
            
            {activeTab === 'sales' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Sales</h2>
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
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-secondary-300 mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          id="displayName"
                          defaultValue={currentUser?.user_metadata?.display_name || ''}
                          className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue={currentUser?.email || ''}
                          disabled
                          className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-secondary-300 focus:outline-none transition-all duration-200 backdrop-blur-sm cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Payment Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-secondary-300 mb-1">
                          Default Payment Method
                        </label>
                        <select
                          id="paymentMethod"
                          className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                        >
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="crypto">Cryptocurrency</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-secondary-300 mb-1">
                          Currency
                        </label>
                        <select
                          id="currency"
                          className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                        >
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                          <option value="gbp">GBP (£)</option>
                          <option value="jpy">JPY (¥)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Notification Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-500 rounded bg-secondary-800/50"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-secondary-200">
                          Email notifications for new sales
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="marketingEmails"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-500 rounded bg-secondary-800/50"
                        />
                        <label htmlFor="marketingEmails" className="ml-2 block text-sm text-secondary-200">
                          Marketing emails and updates
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 transition-colors rounded-lg text-white shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Collection Detail Modal */}
      <CollectionDetailModal
        collection={selectedCollection}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onEdit={handleEditCollection}
        onDelete={handleDeleteCollection}
      />
      
      {/* Create/Edit Collection Modal */}
      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveCollection}
        editCollection={editCollection}
      />
    </div>
  );
};

export default Dashboard;