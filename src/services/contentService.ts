import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
  try {
    const response = await axios.post(`${API_URL}/contents`, contentData);
    return response.data;
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

/**
 * Gets content by collection ID
 * @param {string} collectionId - Collection ID
 * @returns {Promise<Array>} - Array of content
 */
export const getContentByCollectionId = async (collectionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/contents/collection/${collectionId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting content:', error);
    throw error;
  }
};

/**
 * Gets content by ID
 * @param {string} id - Content ID
 * @returns {Promise<Object|null>} - The content or null if not found
 */
export const getContentById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/contents/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error('Error getting content:', error);
    throw error;
  }
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
  try {
    const response = await axios.put(`${API_URL}/contents/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

/**
 * Deletes content
 * @param {string} id - Content ID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export const deleteContent = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/contents/${id}`);
    return response.data.success;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
};

/**
 * Reorders content in a collection
 * @param {string} collectionId - Collection ID
 * @param {Array} contentOrder - Array of content IDs in the desired order
 * @returns {Promise<boolean>} - True if successful
 */
export const reorderContent = async (collectionId: string, contentOrder: string[]) => {
  try {
    const response = await axios.put(`${API_URL}/contents/reorder`, {
      collectionId,
      contentOrder
    });
    return response.data.success;
  } catch (error) {
    console.error('Error reordering content:', error);
    throw error;
  }
};

export default {
  createContent,
  getContentByCollectionId,
  getContentById,
  updateContent,
  deleteContent,
  reorderContent
};