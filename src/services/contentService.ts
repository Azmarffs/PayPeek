import clientPromise from '../lib/mongodb';
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
 * Creates new content
 * @param {Object} contentData - Content data
 * @returns {Promise<Object>} - The created content
 */
export const createContent = async (contentData: {
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'pdf' | 'audio' | 'other';
  collectionId: string;
  userId: string;
  order?: number;
}) => {
  await connectDB();
  
  // Get the highest order in the collection
  const highestOrder = await Content.findOne({ collectionId: contentData.collectionId })
    .sort({ order: -1 })
    .select('order');
  
  const newOrder = highestOrder ? highestOrder.order + 1 : 0;
  
  const newContent = new Content({
    ...contentData,
    order: contentData.order !== undefined ? contentData.order : newOrder
  });
  
  return await newContent.save();
};

/**
 * Gets content by collection ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<Array>} - Array of content
 */
export const getContentByCollectionId = async (collectionId: string) => {
  await connectDB();
  return await Content.find({ collectionId }).sort({ order: 1 });
};

/**
 * Gets content by ID
 * @param {string} id - Content ID
 * @returns {Promise<Object|null>} - The content or null if not found
 */
export const getContentById = async (id: string) => {
  await connectDB();
  return await Content.findById(id);
};

/**
 * Updates content
 * @param {string} id - Content ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object|null>} - The updated content or null if not found
 */
export const updateContent = async (id: string, updateData: {
  title?: string;
  description?: string;
  fileUrl?: string;
  fileType?: 'image' | 'video' | 'pdf' | 'audio' | 'other';
  order?: number;
}) => {
  await connectDB();
  return await Content.findByIdAndUpdate(
    id,
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Deletes content
 * @param {string} id - Content ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export const deleteContent = async (id: string) => {
  await connectDB();
  const result = await Content.deleteOne({ _id: id });
  return result.deletedCount > 0;
};

/**
 * Reorders content in a collection
 * @param {string} collectionId - Collection ID
 * @param {Array} contentOrder - Array of content IDs in the desired order
 * @returns {Promise<boolean>} - True if successful
 */
export const reorderContent = async (collectionId: string, contentOrder: string[]) => {
  await connectDB();
  
  const updatePromises = contentOrder.map((contentId, index) => {
    return Content.findByIdAndUpdate(contentId, { order: index });
  });
  
  await Promise.all(updatePromises);
  return true;
};

export default {
  createContent,
  getContentByCollectionId,
  getContentById,
  updateContent,
  deleteContent,
  reorderContent
};