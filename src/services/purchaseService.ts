import clientPromise from '../lib/mongodb';
import Purchase from '../models/Purchase';
import Collection from '../models/Collection';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState !== 1) {
    const client = await clientPromise;
    const db = client.db();
    return db;
  }
};

/**
 * Creates a new purchase
 * @param {Object} purchaseData - Purchase data
 * @returns {Promise<Object>} - The created purchase
 */
export const createPurchase = async (purchaseData: {
  userId: string;
  collectionId: string;
  amount: number;
  paymentMethod: string;
  paymentId: string;
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
}) => {
  await connectDB();
  
  // Get the collection to determine access type and limits
  const collection = await Collection.findById(purchaseData.collectionId);
  
  if (!collection) {
    throw new Error('Collection not found');
  }
  
  let accessExpires = undefined;
  let viewsRemaining = undefined;
  
  // Set access limits based on collection type
  if (collection.accessType === 'time-based' && collection.accessLimit) {
    // Calculate expiration date (accessLimit is in days)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + collection.accessLimit);
    accessExpires = expirationDate;
  } else if (collection.accessType === 'view-based' && collection.accessLimit) {
    viewsRemaining = collection.accessLimit;
  }
  
  const newPurchase = new Purchase({
    ...purchaseData,
    accessExpires,
    viewsRemaining,
    status: purchaseData.status || 'pending'
  });
  
  return await newPurchase.save();
};

/**
 * Gets purchases by user ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of purchases
 */
export const getPurchasesByUserId = async (userId: string) => {
  await connectDB();
  return await Purchase.find({ userId, status: 'completed' })
    .sort({ createdAt: -1 })
    .populate('collectionId');
};

/**
 * Checks if a user has access to a collection
 * @param {string} userId - User ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<boolean>} - True if user has access
 */
export const hasAccessToCollection = async (userId: string, collectionId: string) => {
  await connectDB();
  
  const purchase = await Purchase.findOne({
    userId,
    collectionId,
    status: 'completed'
  });
  
  if (!purchase) {
    return false;
  }
  
  // Check if access has expired for time-based collections
  if (purchase.accessExpires && new Date() > purchase.accessExpires) {
    return false;
  }
  
  // Check if views are remaining for view-based collections
  if (purchase.viewsRemaining !== undefined && purchase.viewsRemaining <= 0) {
    return false;
  }
  
  return true;
};

/**
 * Decrements the remaining views for a view-based purchase
 * @param {string} userId - User ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<number|null>} - Remaining views or null if not applicable
 */
export const decrementRemainingViews = async (userId: string, collectionId: string) => {
  await connectDB();
  
  const purchase = await Purchase.findOne({
    userId,
    collectionId,
    status: 'completed'
  });
  
  if (!purchase || purchase.viewsRemaining === undefined) {
    return null;
  }
  
  if (purchase.viewsRemaining > 0) {
    purchase.viewsRemaining -= 1;
    await purchase.save();
  }
  
  return purchase.viewsRemaining;
};

/**
 * Updates a purchase status
 * @param {string} id - Purchase ID
 * @param {string} status - New status
 * @returns {Promise<Object|null>} - The updated purchase or null if not found
 */
export const updatePurchaseStatus = async (id: string, status: 'pending' | 'completed' | 'failed' | 'refunded') => {
  await connectDB();
  return await Purchase.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true }
  );
};

export default {
  createPurchase,
  getPurchasesByUserId,
  hasAccessToCollection,
  decrementRemainingViews,
  updatePurchaseStatus
};