// Simplified User model for browser environment
export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create a mock User model for browser environment
const User = {
  // Mock methods that would normally interact with MongoDB
  findOne: async (query: any) => {
    console.log('Mock User.findOne called with:', query);
    return null;
  },
  findOneAndUpdate: async (query: any, update: any, options: any) => {
    console.log('Mock User.findOneAndUpdate called with:', query, update, options);
    return null;
  },
  deleteOne: async (query: any) => {
    console.log('Mock User.deleteOne called with:', query);
    return { deletedCount: 1 };
  }
};

export default User;