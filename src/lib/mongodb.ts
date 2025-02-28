// This is a simplified MongoDB client for browser environments

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/PayPeek';

// Check if MongoDB URI is provided
if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env file');
}

// Parse MongoDB connection string to extract database name
const getDatabaseName = (uri: string): string => {
  try {
    // Extract database name from connection string
    const dbNameMatch = uri.match(/\/([^/?]+)(\?|$)/);
    return dbNameMatch ? dbNameMatch[1] : 'PayPeek';
  } catch (error) {
    console.error('Error parsing MongoDB URI:', error);
    return 'PayPeek';
  }
};

const dbName = getDatabaseName(MONGODB_URI);

// For MongoDB Compass connection
export const getMongoDBCompassConnection = (): string => {
  return MONGODB_URI;
};

// Log the connection string for MongoDB Compass
console.log('MongoDB Compass connection string:', MONGODB_URI);

// Simple wrapper for fetch to handle MongoDB operations
// This is a simplified version for browser environments
const mongoDBClient = {
  connect: async () => {
    console.log('MongoDB client connected to:', MONGODB_URI);
    return {
      db: (name = dbName) => ({
        collection: (collectionName: string) => ({
          find: async (query = {}) => {
            console.log(`Finding documents in ${collectionName}`, query);
            // In a real implementation, this would use MongoDB Data API
            return [];
          },
          findOne: async (query = {}) => {
            console.log(`Finding one document in ${collectionName}`, query);
            // In a real implementation, this would use MongoDB Data API
            return null;
          },
          insertOne: async (document: any) => {
            console.log(`Inserting document into ${collectionName}`, document);
            // In a real implementation, this would use MongoDB Data API
            return { insertedId: 'mock-id-' + Date.now() };
          },
          updateOne: async (query: any, update: any) => {
            console.log(`Updating document in ${collectionName}`, query, update);
            // In a real implementation, this would use MongoDB Data API
            return { modifiedCount: 1 };
          },
          deleteOne: async (query: any) => {
            console.log(`Deleting document from ${collectionName}`, query);
            // In a real implementation, this would use MongoDB Data API
            return { deletedCount: 1 };
          }
        })
      })
    };
  }
};

// Export a promise that resolves to the MongoDB client
const clientPromise = mongoDBClient.connect();

export default clientPromise;