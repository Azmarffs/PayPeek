// Simplified Purchase model for browser environment
export interface IPurchase {
  _id?: string;
  userId: string;
  collectionId: string;
  amount: number;
  paymentMethod: string;
  paymentId: string;
  accessExpires?: Date;
  viewsRemaining?: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

// Create a mock Purchase model for browser environment
const Purchase = {
  // Mock methods that would normally interact with MongoDB
  find: async (query: any) => {
    console.log('Mock Purchase.find called with:', query);
    return [];
  },
  findOne: async (query: any) => {
    console.log('Mock Purchase.findOne called with:', query);
    return null;
  },
  findById: async (id: string) => {
    console.log('Mock Purchase.findById called with:', id);
    return null;
  },
  findByIdAndUpdate: async (id: string, update: any, options: any) => {
    console.log('Mock Purchase.findByIdAndUpdate called with:', id, update, options);
    return null;
  },
  deleteOne: async (query: any) => {
    console.log('Mock Purchase.deleteOne called with:', query);
    return { deletedCount: 1 };
  }
};

export default Purchase;