export interface Collection {
  id: string;
  title: string;
  price: number;
  expiryDate: string;
  thumbnailUrl?: string;
  status: 'active' | 'expired';
  createdAt: string;
  updatedAt: string;
  description?: string;
  itemCount?: number;
  views?: number;
  earnings?: number;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    display_name?: string;
    avatar_url?: string;
  };
}

export type SortOption = 'name' | 'date' | 'price';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'grid' | 'list';