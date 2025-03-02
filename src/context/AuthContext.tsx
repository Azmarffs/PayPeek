import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = 'https://siktauruxrdfvgvefolq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpa3RhdXJ1eHJkZnZndmVmb2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4OTgxMzksImV4cCI6MjA1NjQ3NDEzOX0.S32Rg1jnm_sdWFYr4RYRdhBkmshvIjUa0XacvKM6Z6Q';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the shape of the context
interface AuthContextType {
  supabase: SupabaseClient;
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  authSuccess: boolean;
  setAuthSuccess: (value: boolean) => void;
  signInWithEmail: (email: string, password: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<{
    error: Error | null;
    data: any;
  }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Auth functions
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (data.user) {
        setAuthSuccess(true);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { data: null, error: error as Error };
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });
      
      if (data.user) {
        setAuthSuccess(true);
      }
      
      return { data, error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { data: null, error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    supabase,
    currentUser,
    session,
    loading,
    authSuccess,
    setAuthSuccess,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};