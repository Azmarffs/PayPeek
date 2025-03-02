import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collection } from '../../types';
import { 
  X, 
  DollarSign, 
  Clock, 
  Eye, 
  FileText, 
  Link, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface CollectionDetailModalProps {
  collection: Collection | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (collection: Collection) => void;
  onDelete: (id: string) => void;
}

const CollectionDetailModal: React.FC<CollectionDetailModalProps> = ({
  collection,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!collection) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://paypeek.com/c/${collection.id}`);
    // Could add a toast notification here
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
              className="w-full max-w-3xl bg-gradient-to-br from-secondary-900 to-primary-950 rounded-xl shadow-2xl border border-white/20 overflow-hidden relative"
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
              
              <div className="flex flex-col md:flex-row">
                {/* Collection image/preview */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-secondary-800 to-primary-900 relative">
                  {collection.thumbnailUrl ? (
                    <img 
                      src={collection.thumbnailUrl} 
                      alt={collection.title}
                      className="w-full h-full object-cover md:h-96"
                    />
                  ) : (
                    <div className="w-full h-60 md:h-96 flex items-center justify-center">
                      <FileText className="h-16 w-16 text-primary-400" />
                    </div>
                  )}
                  
                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    {collection.status === 'active' ? (
                      <div className="flex items-center bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium border border-green-500/30">
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Active
                      </div>
                    ) : (
                      <div className="flex items-center bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium border border-red-500/30">
                        <XCircle className="h-4 w-4 mr-1.5" />
                        Expired
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Collection details */}
                <div className="w-full md:w-3/5 p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">{collection.title}</h2>
                  
                  {collection.description && (
                    <p className="text-secondary-200 mb-6">{collection.description}</p>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                        <DollarSign className="h-5 w-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-secondary-300 text-sm">Price</p>
                        <p className="text-white font-medium">${collection.price.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-secondary-300 text-sm">Expiry Date</p>
                        <p className="text-white font-medium">{formatDate(collection.expiryDate)}</p>
                      </div>
                    </div>
                    
                    {collection.itemCount !== undefined && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                          <FileText className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-secondary-300 text-sm">Items</p>
                          <p className="text-white font-medium">{collection.itemCount} items</p>
                        </div>
                      </div>
                    )}
                    
                    {collection.views !== undefined && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                          <Eye className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-secondary-300 text-sm">Views</p>
                          <p className="text-white font-medium">{collection.views} views</p>
                        </div>
                      </div>
                    )}
                    
                    {collection.earnings !== undefined && (
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="text-secondary-300 text-sm">Earnings</p>
                          <p className="text-white font-medium">${collection.earnings.toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-8 flex space-x-3">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white"
                    >
                      <Link className="h-5 w-5 mr-1.5" />
                      Copy Link
                    </button>
                    <button
                      onClick={() => onEdit(collection)}
                      className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-500 transition-colors rounded-lg text-white"
                    >
                      <Edit className="h-5 w-5 mr-1.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onDelete(collection.id);
                      }}
                      className="flex items-center px-4 py-2 bg-red-600/70 hover:bg-red-600 transition-colors rounded-lg text-white"
                    >
                      <Trash2 className="h-5 w-5 mr-1.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CollectionDetailModal;