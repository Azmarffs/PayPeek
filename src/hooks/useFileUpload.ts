import { useState } from 'react';
import { uploadFile, deleteFile } from '../lib/gcs';
import { useAuth } from '../context/AuthContext';

interface FileUploadHook {
  uploading: boolean;
  progress: number;
  error: string | null;
  uploadFile: (file: File) => Promise<string>;
  deleteFile: (fileUrl: string) => Promise<void>;
}

export const useFileUpload = (): FileUploadHook => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  const handleUpload = async (file: File): Promise<string> => {
    if (!currentUser) {
      throw new Error('User must be logged in to upload files');
    }

    try {
      setUploading(true);
      setProgress(0);
      setError(null);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);

      // Upload file to Google Cloud Storage
      const fileUrl = await uploadFile(file, currentUser.uid);

      // Clear interval and set progress to 100%
      clearInterval(progressInterval);
      setProgress(100);

      return fileUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileUrl: string): Promise<void> => {
    try {
      await deleteFile(fileUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to delete file');
      throw err;
    }
  };

  return {
    uploading,
    progress,
    error,
    uploadFile: handleUpload,
    deleteFile: handleDelete
  };
};

export default useFileUpload;