import React from 'react';

const CollectionSkeleton: React.FC = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-md animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="h-40 bg-secondary-800/50"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-secondary-700/50 rounded-md w-3/4 mb-4"></div>
        
        {/* Details skeleton */}
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="h-4 w-4 bg-secondary-700/50 rounded-full mr-2"></div>
            <div className="h-4 bg-secondary-700/50 rounded-md w-1/2"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-secondary-700/50 rounded-full mr-2"></div>
            <div className="h-4 bg-secondary-700/50 rounded-md w-2/3"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-secondary-700/50 rounded-full mr-2"></div>
            <div className="h-4 bg-secondary-700/50 rounded-md w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionSkeleton;