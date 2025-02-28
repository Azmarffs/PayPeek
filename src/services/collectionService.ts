import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
  try {
    const response = await axios.post(`${API_URL}/collections`, collectionData);
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};

/**
 * Gets collections by user ID
 * @param {string} userId - Firebase UID
 * @returns {Promise<Array>} - Array of collections
 */
export const getCollectionsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/collections/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting collections:', error);
    throw error;
  }
};

/**
 * Gets a collection by ID
 * @param {string} id - Collection ID
 * @returns {Promise<Object|null>} - The collection or null if not found
 */
export const getCollectionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/collections/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error('Error getting collection:', error);
    throw error;
  }
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
  try {
    const response = await axios.put(`${API_URL}/collections/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating collection:', error);
    throw error;
  }
};

/**
 * Deletes a collection and its content
 * @param {string} id - Collection ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export const deleteCollection = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/collections/${id}`);
    return response.data.success;
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
};

/**
 * Gets published collections
 * @param {number} limit - Number of collections to return
 * @returns {Promise<Array>} - Array of published collections
 */
export const getPublishedCollections = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/collections/published?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error getting published collections:', error);
    throw error;
  }
};

export default {
  createCollection,
  getCollectionsByUserId,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getPublishedCollections
};