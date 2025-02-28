// Simplified Collection model for browser environment
export interface ICollection {
  _id?: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  userId: string;
  accessType: 'time-based' | 'view-based' | 'permanent';
  accessLimit?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create a mock Collection model for browser environment
const Collection = {
  // Mock methods that would normally interact with MongoDB
  find: async (query: any) => {
    console.log('Mock Collection.find called with:', query);
    return [];
  },
  findById: async (id: string) => {
    console.log('Mock Collection.findById called with:', id);
    return null;
  },
  findByIdAndUpdate: async (id: string, update: any, options: any) => {
    console.log('Mock Collection.findByIdAndUpdate called with:', id, update, options);
    return null;
  },
  deleteOne: async (query: any) => {
    console.log('Mock Collection.deleteOne called with:', query);
    return { deletedCount: 1 };
  }
};

export default Collection;