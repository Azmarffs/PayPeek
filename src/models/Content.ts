// Simplified Content model for browser environment
export interface IContent {
  _id?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'image' | 'video' | 'pdf' | 'audio' | 'other';
  collectionId: string;
  userId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Create a mock Content model for browser environment
const Content = {
  // Mock methods that would normally interact with MongoDB
  find: async (query: any) => {
    console.log('Mock Content.find called with:', query);
    return [];
  },
  findOne: async (query: any) => {
    console.log('Mock Content.findOne called with:', query);
    return null;
  },
  findById: async (id: string) => {
    console.log('Mock Content.findById called with:', id);
    return null;
  },
  findByIdAndUpdate: async (id: string, update: any, options: any) => {
    console.log('Mock Content.findByIdAndUpdate called with:', id, update, options);
    return null;
  },
  deleteOne: async (query: any) => {
    console.log('Mock Content.deleteOne called with:', query);
    return { deletedCount: 1 };
  },
  deleteMany: async (query: any) => {
    console.log('Mock Content.deleteMany called with:', query);
    return { deletedCount: 1 };
  }
};

export default Content;