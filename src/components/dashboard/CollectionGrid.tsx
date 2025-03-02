import React from 'react';
import { motion } from 'framer-motion';
import { Collection, ViewMode } from '../../types';
import CollectionCard from './CollectionCard';
import CollectionSkeleton from './CollectionSkeleton';

interface CollectionGridProps {
  collections: Collection[];
  isLoading: boolean;
  viewMode: ViewMode;
  onCollectionClick: (collection: Collection) => void;
  onDeleteCollection: (id: string) => void;
  onEditCollection: (collection: Collection) => void;
}

const CollectionGrid: React.FC<CollectionGridProps> = ({
  collections,
  isLoading,
  viewMode,
  onCollectionClick,
  onDeleteCollection,
  onEditCollection
}) => {
  // Generate skeleton cards for loading state
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
      <CollectionSkeleton key={`skeleton-${index}`} />
    ));
  };

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div 
      className={`grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
        viewMode === 'list' ? 'grid-cols-1 !sm:grid-cols-1 !lg:grid-cols-1 !xl:grid-cols-1' : ''
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading ? (
        renderSkeletons()
      ) : collections.length > 0 ? (
        collections.map(collection => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onClick={onCollectionClick}
            onDelete={onDeleteCollection}
            onEdit={onEditCollection}
          />
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-60">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 inline-flex mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-medium mb-2">No collections yet</h3>
            <p className="text-secondary-300 max-w-md">
              Create your first collection to start monetizing your content
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CollectionGrid;