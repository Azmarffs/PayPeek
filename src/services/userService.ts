import clientPromise from '../lib/mongodb';
import User from '../models/User';
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
 * Creates a new user in the database
 * @param {Object} userData - User data from Firebase Auth
 * @returns {Promise<Object>} - The created user
 */
export const createUser = async (userData: {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}) => {
  await connectDB();
  
  const newUser = new User({
    uid: userData.uid,
    email: userData.email,
    displayName: userData.displayName,
    photoURL: userData.photoURL || null
  });
  
  return await newUser.save();
};

/**
 * Gets a user by their Firebase UID
 * @param {string} uid - Firebase UID
 * @returns {Promise<Object|null>} - The user or null if not found
 */
export const getUserByUid = async (uid: string) => {
  await connectDB();
  return await User.findOne({ uid });
};

/**
 * Updates a user in the database
 * @param {string} uid - Firebase UID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object|null>} - The updated user or null if not found
 */
export const updateUser = async (uid: string, updateData: {
  displayName?: string;
  photoURL?: string;
  email?: string;
}) => {
  await connectDB();
  return await User.findOneAndUpdate(
    { uid },
    { ...updateData, updatedAt: new Date() },
    { new: true }
  );
};

/**
 * Deletes a user from the database
 * @param {string} uid - Firebase UID
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
export const deleteUser = async (uid: string) => {
  await connectDB();
  const result = await User.deleteOne({ uid });
  return result.deletedCount > 0;
};

export default {
  createUser,
  getUserByUid,
  updateUser,
  deleteUser
};