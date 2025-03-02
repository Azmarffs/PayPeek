import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Collection } from '../../types';
import { 
  MoreVertical, 
  Trash2, 
  Edit, 
  Eye, 
  Link, 
  Clock, 
  DollarSign, 
  Image, 
  FileText, 
  Video, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

interface CollectionCardProps {
  collection: Collection;
  onClick: (collection: Collection) => void;
  onDelete: (id: string) => void;
  onEdit: (collection: Collection) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ 
  collection, 
  onClick, 
  onDelete, 
  onEdit 
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(collection.id);
    setShowDeleteConfirm(false);
  };
  
  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(collection);
  };
  
  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`https://paypeek.com/c/${collection.id}`);
    // Could add a toast notification here
  };
  
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Determine icon based on collection title or other properties
  const getCollectionIcon = () => {
    const title = collection.title.toLowerCase();
    if (title.includes('photo') || title.includes('image')) {
      return <Image className="h-8 w-8 text-primary-400" />;
    } else if (title.includes('video')) {
      return <Video className="h-8 w-8 text-primary-400" />;
    } else {
      return <FileText className="h-8 w-8 text-primary-400" />;
    }
  };

  return (
    <motion.div
      className="relative bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={() => onClick(collection)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      layout
    >
      {/* Status indicator */}
      <div className="absolute top-3 right-3 z-10">
        {collection.status === 'active' ? (
          <div className="flex items-center bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </div>
        ) : (
          <div className="flex items-center bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium border border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Expired
          </div>
        )}
      </div>
      
      {/* Collection thumbnail */}
      <div className="h-40 bg-gradient-to-br from-secondary-800 to-primary-900 flex items-center justify-center relative overflow-hidden">
        {collection.thumbnailUrl ? (
          <img 
            src={collection.thumbnailUrl} 
            alt={collection.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            {getCollectionIcon()}
            <span className="text-xs text-secondary-300 mt-2">No preview</span>
          </div>
        )}
        
        {/* Hover overlay with quick actions */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
        >
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClick(collection);
              }}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="View collection"
            >
              <Eye className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={handleEdit}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Edit collection"
            >
              <Edit className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={handleCopyLink}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Copy link"
            >
              <Link className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 bg-white/10 rounded-full hover:bg-red-500/30 transition-colors"
              aria-label="Delete collection"
            >
              <Trash2 className="h-5 w-5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Collection info */}
      <div className="p-4">
        <h3 className="text-white font-medium text-lg truncate">{collection.title}</h3>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-secondary-300 text-sm">
            <DollarSign className="h-4 w-4 mr-1.5 text-primary-400" />
            <span>${collection.price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center text-secondary-300 text-sm">
            <Clock className="h-4 w-4 mr-1.5 text-primary-400" />
            <span>Expires: {formatDate(collection.expiryDate)}</span>
          </div>
          
          {collection.itemCount !== undefined && (
            <div className="flex items-center text-secondary-300 text-sm">
              <FileText className="h-4 w-4 mr-1.5 text-primary-400" />
              <span>{collection.itemCount} items</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div 
          className="absolute inset-0 bg-secondary-900/95 backdrop-blur-sm flex items-center justify-center z-20 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <Trash2 className="h-10 w-10 text-red-400 mx-auto mb-3" />
            <h4 className="text-white font-medium mb-2">Delete Collection?</h4>
            <p className="text-secondary-300 text-sm mb-4">This action cannot be undone.</p>
            <div className="flex space-x-2 justify-center">
              <button
                onClick={cancelDelete}
                className="px-3 py-1.5 bg-secondary-700 text-white rounded-lg text-sm hover:bg-secondary-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CollectionCard;