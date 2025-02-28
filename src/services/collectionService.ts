import clientPromise from '../lib/mongodb';
import Collection from '../models/Collection';
import Content from '../models/Content';
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
 * Creates a new collection
 * @param {Object} collectionData - Collection data
 * @returns {Promise<Object>} - The created collection
 */
export const createCollection = async (collectionData: {
  title: string;
  description: string;
  price: number;
  coverImage: string;
  userId: string;
  accessType: 'time-based' | 'view-based' | 'permanent';
  accessLimit?: number;
  isPublished?: boolean;
}) => {
  await connectDB();
  
  const newCollection = new Collection({
    ...collectionData,
    isPublished: collectionData.isPublished || false
  });
  
  return await newCollection.save();
};

/**
 * Gets collections by user ID
 * @param {string} userId - Firebase UID
 * @returns {Promise<Array>} - Array of collections
 */
export const getCollectionsByUserId = async (userId: string) => {
  await connectDB();
  return await Collection.find({ userId }).sort({ createdAt: -1 });
};

/**
 * Gets a collection by ID
 * @param {string} id - Collection ID
 * @returns {Promise<Object|null>} - The collection or null if not found
 */
export const getCollectionById = async (id: string) => {
  await connectDB();
  return await Collection.findById(id);
};

/**
 * Updates a collection
 * @param {string} id - Collection ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object|null>} - The updated collection or null if not found
 */
export const updateCollection = async (id: string, updateData: {
  title?: string;
  description?: string;
  price?: number;
  coverImage?: string;
  accessType?: 'time-based' | 'view-based' | 'permanent';
  accessLimit?: number;
  isPublished?: boolean;
}) => {
  await connectDB();
  return await Collection.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Deletes a collection and its content
 * @param {string} id - Collection ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export const deleteCollection = async (id: string) => {
  await connectDB();
  
  // Delete all content in the collection
  await Content.deleteMany({ collectionId: id });
  
  // Delete the collection
  const result = await Collection.deleteOne({ _id: id });
  return result.deletedCount > 0;
};

/**
 * Gets published collections
 * @param {number} limit - Number of collections to return
 * @returns {Promise<Array>} - Array of published collections
 */
export const getPublishedCollections = async (limit = 10) => {
  await connectDB();
  return await Collection.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export default {
  createCollection,
  getCollectionsByUserId,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getPublishedCollections
};