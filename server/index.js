import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;

// Check if MongoDB URI is available
if (!uri) {
  console.error('MongoDB URI is not defined. Please check your .env file.');
  process.exit(1);
}

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB Atlas');
    
    // Create indexes for better performance
    await createIndexes();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    
    // Instead of exiting, we'll continue running the server
    // This allows the frontend to still function even if DB is unavailable
    console.log('Running in limited mode without database connection');
  }
}

async function createIndexes() {
  try {
    // Create indexes for collections that will be frequently queried
    await db.collection('users').createIndex({ uid: 1 }, { unique: true });
    await db.collection('collections').createIndex({ userId: 1 });
    await db.collection('contents').createIndex({ collectionId: 1 });
    await db.collection('purchases').createIndex({ userId: 1 });
    await db.collection('purchases').createIndex({ collectionId: 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: db ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Users
app.post('/api/users', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const user = req.body;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ uid: user.uid });
    if (existingUser) {
      return res.status(200).json(existingUser); // Return existing user instead of creating duplicate
    }
    
    const result = await db.collection('users').insertOne({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ ...user, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:uid', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { uid } = req.params;
    const user = await db.collection('users').findOne({ uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:uid', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { uid } = req.params;
    const updateData = req.body;
    const result = await db.collection('users').updateOne(
      { uid },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await db.collection('users').findOne({ uid });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Collections
app.post('/api/collections', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const collection = req.body;
    const result = await db.collection('collections').insertOne({
      ...collection,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ ...collection, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/collections/user/:userId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { userId } = req.params;
    const collections = await db.collection('collections')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/collections/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const collection = await db.collection('collections').findOne({ _id: new ObjectId(id) });
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/collections/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const updateData = req.body;
    const result = await db.collection('collections').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    const updatedCollection = await db.collection('collections').findOne({ _id: new ObjectId(id) });
    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/collections/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    // Delete all content in the collection
    await db.collection('contents').deleteMany({ collectionId: id });
    // Delete the collection
    const result = await db.collection('collections').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get published collections
app.get('/api/collections/published', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const limit = parseInt(req.query.limit) || 10;
    const collections = await db.collection('collections')
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contents
app.post('/api/contents', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const content = req.body;
    // Get the highest order in the collection
    const highestOrder = await db.collection('contents')
      .find({ collectionId: content.collectionId })
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    
    const newOrder = highestOrder.length > 0 ? highestOrder[0].order + 1 : 0;
    
    const result = await db.collection('contents').insertOne({
      ...content,
      order: content.order !== undefined ? content.order : newOrder,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ ...content, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contents/collection/:collectionId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { collectionId } = req.params;
    const contents = await db.collection('contents')
      .find({ collectionId })
      .sort({ order: 1 })
      .toArray();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contents/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const content = await db.collection('contents').findOne({ _id: new ObjectId(id) });
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/contents/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const updateData = req.body;
    const result = await db.collection('contents').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    const updatedContent = await db.collection('contents').findOne({ _id: new ObjectId(id) });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/contents/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const result = await db.collection('contents').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reorder content
app.put('/api/contents/reorder', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { collectionId, contentOrder } = req.body;
    
    const updatePromises = contentOrder.map((contentId, index) => {
      return db.collection('contents').updateOne(
        { _id: new ObjectId(contentId) },
        { $set: { order: index, updatedAt: new Date() } }
      );
    });
    
    await Promise.all(updatePromises);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchases
app.post('/api/purchases', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const purchaseData = req.body;
    
    // Get the collection to determine access type and limits
    const collection = await db.collection('collections').findOne({ _id: new ObjectId(purchaseData.collectionId) });
    
    if (!collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    
    let accessExpires = undefined;
    let viewsRemaining = undefined;
    
    // Set access limits based on collection type
    if (collection.accessType === 'time-based' && collection.accessLimit) {
      // Calculate expiration date (accessLimit is in days)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + collection.accessLimit);
      accessExpires = expirationDate;
    } else if (collection.accessType === 'view-based' && collection.accessLimit) {
      viewsRemaining = collection.accessLimit;
    }
    
    const result = await db.collection('purchases').insertOne({
      ...purchaseData,
      accessExpires,
      viewsRemaining,
      status: purchaseData.status || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    res.status(201).json({ 
      ...purchaseData, 
      accessExpires, 
      viewsRemaining, 
      _id: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/purchases/user/:userId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { userId } = req.params;
    const purchases = await db.collection('purchases')
      .find({ userId, status: 'completed' })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Populate collection data for each purchase
    const populatedPurchases = await Promise.all(purchases.map(async (purchase) => {
      const collection = await db.collection('collections').findOne({ _id: new ObjectId(purchase.collectionId) });
      return { ...purchase, collection };
    }));
    
    res.json(populatedPurchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if user has access to collection
app.get('/api/purchases/access', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { userId, collectionId } = req.query;
    
    if (!userId || !collectionId) {
      return res.status(400).json({ error: 'userId and collectionId are required' });
    }
    
    const purchase = await db.collection('purchases').findOne({
      userId,
      collectionId,
      status: 'completed'
    });
    
    if (!purchase) {
      return res.json({ hasAccess: false });
    }
    
    // Check if access has expired for time-based collections
    if (purchase.accessExpires && new Date() > purchase.accessExpires) {
      return res.json({ hasAccess: false });
    }
    
    // Check if views are remaining for view-based collections
    if (purchase.viewsRemaining !== undefined && purchase.viewsRemaining <= 0) {
      return res.json({ hasAccess: false });
    }
    
    res.json({ hasAccess: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrement remaining views
app.post('/api/purchases/decrement-views', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { userId, collectionId } = req.body;
    
    if (!userId || !collectionId) {
      return res.status(400).json({ error: 'userId and collectionId are required' });
    }
    
    const purchase = await db.collection('purchases').findOne({
      userId,
      collectionId,
      status: 'completed'
    });
    
    if (!purchase || purchase.viewsRemaining === undefined) {
      return res.json({ viewsRemaining: null });
    }
    
    if (purchase.viewsRemaining > 0) {
      const result = await db.collection('purchases').updateOne(
        { _id: purchase._id },
        { $set: { viewsRemaining: purchase.viewsRemaining - 1, updatedAt: new Date() } }
      );
      
      if (result.modifiedCount === 0) {
        return res.status(500).json({ error: 'Failed to update views remaining' });
      }
      
      return res.json({ viewsRemaining: purchase.viewsRemaining - 1 });
    }
    
    res.json({ viewsRemaining: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/purchases/:id/status', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database connection not available' });
    
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.collection('purchases').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    const updatedPurchase = await db.collection('purchases').findOne({ _id: new ObjectId(id) });
    res.json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});