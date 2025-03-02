import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Calendar, DollarSign, FileText, Image } from 'lucide-react';
import { Collection } from '../../types';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collection: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editCollection: Collection | null;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editCollection
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState<'active' | 'expired'>('active');
  const [itemCount, setItemCount] = useState('');
  
  // Reset form or populate with edit data when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editCollection) {
        setTitle(editCollection.title);
        setDescription(editCollection.description || '');
        setPrice(editCollection.price.toString());
        
        // Format date for input
        const date = new Date(editCollection.expiryDate);
        const formattedDate = date.toISOString().split('T')[0];
        setExpiryDate(formattedDate);
        
        setThumbnailUrl(editCollection.thumbnailUrl || '');
        setStatus(editCollection.status);
        setItemCount(editCollection.itemCount?.toString() || '');
      } else {
        // Set default values for new collection
        resetForm();
      }
    }
  }, [isOpen, editCollection]);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setExpiryDate('');
    setThumbnailUrl('');
    setStatus('active');
    setItemCount('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCollection = {
      title,
      description,
      price: parseFloat(price),
      expiryDate: new Date(expiryDate).toISOString(),
      thumbnailUrl: thumbnailUrl || undefined,
      status,
      itemCount: itemCount ? parseInt(itemCount) : undefined,
      views: 0,
      earnings: 0
    };
    
    onSave(newCollection);
    onClose();
  };
  
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div 
              className="w-full max-w-2xl bg-gradient-to-br from-secondary-900 to-primary-950 rounded-xl shadow-2xl border border-white/20 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-secondary-300 hover:text-white transition-colors z-10 bg-secondary-800/50 p-1.5 rounded-full backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {editCollection ? 'Edit Collection' : 'Create New Collection'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-secondary-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                      placeholder="Collection title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-secondary-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                      placeholder="Describe your collection"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-secondary-300 mb-1">
                        Price ($)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-secondary-400" />
                        </div>
                        <input
                          type="number"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                          min="0"
                          step="0.01"
                          className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                          placeholder="9.99"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-secondary-300 mb-1">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-secondary-400" />
                        </div>
                        <input
                          type="date"
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-secondary-300 mb-1">
                        Thumbnail URL
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Image className="h-5 w-5 text-secondary-400" />
                        </div>
                        <input
                          type="url"
                          id="thumbnailUrl"
                          value={thumbnailUrl}
                          onChange={(e) => setThumbnailUrl(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="itemCount" className="block text-sm font-medium text-secondary-300 mb-1">
                        Number of Items
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FileText className="h-5 w-5 text-secondary-400" />
                        </div>
                        <input
                          type="number"
                          id="itemCount"
                          value={itemCount}
                          onChange={(e) => setItemCount(e.target.value)}
                          min="0"
                          className="w-full pl-10 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                          placeholder="10"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-300 mb-1">
                      Status
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="active"
                          checked={status === 'active'}
                          onChange={() => setStatus('active')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-500 bg-secondary-800/50"
                        />
                        <span className="ml-2 text-white">Active</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          value="expired"
                          checked={status === 'expired'}
                          onChange={() => setStatus('expired')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-500 bg-secondary-800/50"
                        />
                        <span className="ml-2 text-white">Expired</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 transition-colors rounded-lg text-white shadow-md hover:shadow-lg"
                    >
                      {editCollection ? 'Update Collection' : 'Create Collection'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateCollectionModal;