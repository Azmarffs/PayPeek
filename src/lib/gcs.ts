import { Storage } from '@google-cloud/storage';

// Create a storage client
const storage = new Storage({
  projectId: import.meta.env.VITE_GCS_PROJECT_ID,
  credentials: {
    client_email: import.meta.env.VITE_GCS_CLIENT_EMAIL,
    private_key: import.meta.env.VITE_GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = import.meta.env.VITE_GCS_BUCKET_NAME;
const bucket = storage.bucket(bucketName);

/**
 * Uploads a file to Google Cloud Storage
 * @param {File} file - The file to upload
 * @param {string} userId - The user ID to associate with the file
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file: File, userId: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${userId}/${timestamp}-${file.name}`;
    
    // Create a file in the bucket
    const blob = bucket.file(filename);
    
    // Create a write stream
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.type,
      },
    });
    
    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    
    // Return a promise that resolves with the public URL
    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });
      
      blobStream.on('finish', async () => {
        // Make the file public
        await blob.makePublic();
        
        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        resolve(publicUrl);
      });
      
      // Write the buffer to the stream
      blobStream.end(Buffer.from(buffer));
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Deletes a file from Google Cloud Storage
 * @param {string} fileUrl - The public URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (fileUrl: string): Promise<void> => {
  try {
    // Extract the filename from the URL
    const filename = fileUrl.split(`https://storage.googleapis.com/${bucketName}/`)[1];
    
    // Delete the file
    await bucket.file(filename).delete();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export default {
  uploadFile,
  deleteFile,
  bucket
};