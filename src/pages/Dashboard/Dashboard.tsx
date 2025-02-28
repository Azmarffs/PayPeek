import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getCollectionsByUserId } from '../../services/collectionService';
import { getPurchasesByUserId } from '../../services/purchaseService';
import { ICollection } from '../../models/Collection';
import { IPurchase } from '../../models/Purchase';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          // Fetch user's collections
          const userCollections = await getCollectionsByUserId(currentUser.uid);
          setCollections(userCollections);
          
          // Fetch user's purchases
          const userPurchases = await getPurchasesByUserId(currentUser.uid);
          setPurchases(userPurchases);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
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
                <h3 className="text-xl font-semibold text-white mb-2">Your Collections</h3>
                {collections.length > 0 ? (
                  <p className="text-secondary-300">You have {collections.length} collection(s).</p>
                ) : (
                  <p className="text-secondary-300">You haven't created any collections yet.</p>
                )}
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Create Collection
                </button>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Recent Purchases</h3>
                {purchases.length > 0 ? (
                  <p className="text-secondary-300">You have purchased {purchases.length} collection(s).</p>
                ) : (
                  <p className="text-secondary-300">No purchases to display yet.</p>
                )}
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Browse Collections
                </button>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Account Settings</h3>
                <p className="text-secondary-300">Manage your profile and preferences.</p>
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-500 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;