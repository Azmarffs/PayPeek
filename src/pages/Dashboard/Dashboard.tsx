import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getCollectionsByUserId } from '../../services/collectionService';
import { getPurchasesByUserId } from '../../services/purchaseService';
import { Link } from 'react-router-dom';
import { PlusCircle, ShoppingBag, Settings, AlertCircle } from 'lucide-react';

interface Collection {
  _id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  userId: string;
  accessType: 'time-based' | 'view-based' | 'permanent';
  accessLimit?: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Purchase {
  _id: string;
  userId: string;
  collectionId: string;
  amount: number;
  paymentMethod: string;
  paymentId: string;
  accessExpires?: string;
  viewsRemaining?: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
  collection?: Collection;
}

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          setError(null);
          
          // Fetch user's collections
          const userCollections = await getCollectionsByUserId(currentUser.uid);
          setCollections(userCollections);
          
          // Fetch user's purchases
          const userPurchases = await getPurchasesByUserId(currentUser.uid);
          setPurchases(userPurchases);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setError('Failed to load dashboard data. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/20"
          >
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="h-24 w-24 rounded-full object-cover border-4 border-primary-500/30"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                    {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                  Welcome, {currentUser?.displayName || 'User'}!
                </h1>
                <p className="text-secondary-300 mt-1">{currentUser?.email}</p>
                <p className="text-primary-400 mt-4">
                  This is your dashboard. You can manage your content, view analytics, and more from here.
                </p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-600/30 flex items-center justify-center mr-3">
                    <PlusCircle className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Your Collections</h3>
                </div>
                {collections.length > 0 ? (
                  <p className="text-secondary-300">You have {collections.length} collection(s).</p>
                ) : (
                  <p className="text-secondary-300">You haven't created any collections yet.</p>
                )}
                <Link to="/collections/create" className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Create Collection
                </Link>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-600/30 flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Recent Purchases</h3>
                </div>
                {purchases.length > 0 ? (
                  <p className="text-secondary-300">You have purchased {purchases.length} collection(s).</p>
                ) : (
                  <p className="text-secondary-300">No purchases to display yet.</p>
                )}
                <Link to="/browse" className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Browse Collections
                </Link>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-600/30 flex items-center justify-center mr-3">
                    <Settings className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Account Settings</h3>
                </div>
                <p className="text-secondary-300">Manage your profile and preferences.</p>
                <Link to="/profile" className="mt-4 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Edit Profile
                </Link>
              </div>
            </div>
            
            {collections.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-white mb-6">Your Recent Collections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.slice(0, 3).map((collection) => (
                    <div key={collection._id} className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={collection.coverImage || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=500&q=80'} 
                          alt={collection.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">{collection.title}</h3>
                        <p className="text-secondary-300 text-sm mt-1 line-clamp-2">{collection.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-primary-400 font-semibold">${collection.price.toFixed(2)}</span>
                          <span className={`px-2 py-1 rounded text-xs ${collection.isPublished ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                            {collection.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {collections.length > 3 && (
                  <div className="mt-6 text-center">
                    <Link to="/collections" className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors">
                      View All Collections
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;