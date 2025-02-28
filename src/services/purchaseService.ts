import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
  try {
    const response = await axios.post(`${API_URL}/purchases`, purchaseData);
    return response.data;
  } catch (error) {
    console.error('Error creating purchase:', error);
    throw error;
  }
};

/**
 * Gets purchases by user ID
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of purchases
 */
export const getPurchasesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/purchases/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting purchases:', error);
    throw error;
  }
};

/**
 * Checks if a user has access to a collection
 * @param {string} userId - User ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<boolean>} - True if user has access
 */
export const hasAccessToCollection = async (userId: string, collectionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/purchases/access`, {
      params: { userId, collectionId }
    });
    return response.data.hasAccess;
  } catch (error) {
    console.error('Error checking access:', error);
    throw error;
  }
};

/**
 * Decrements the remaining views for a view-based purchase
 * @param {string} userId - User ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<number|null>} - Remaining views or null if not applicable
 */
export const decrementRemainingViews = async (userId: string, collectionId: string) => {
  try {
    const response = await axios.post(`${API_URL}/purchases/decrement-views`, {
      userId,
      collectionId
    });
    return response.data.viewsRemaining;
  } catch (error) {
    console.error('Error decrementing views:', error);
    throw error;
  }
};

/**
 * Updates a purchase status
 * @param {string} id - Purchase ID
 * @param {string} status - New status
 * @returns {Promise<Object|null>} - The updated purchase or null if not found
 */
export const updatePurchaseStatus = async (id: string, status: 'pending' | 'completed' | 'failed' | 'refunded') => {
  try {
    const response = await axios.put(`${API_URL}/purchases/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating purchase status:', error);
    throw error;
  }
};

export default {
  createPurchase,
  getPurchasesByUserId,
  hasAccessToCollection,
  decrementRemainingViews,
  updatePurchaseStatus
};