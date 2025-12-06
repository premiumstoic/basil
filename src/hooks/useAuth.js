// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { initAuth, getCurrentUser, signIn as authSignIn, signUp as authSignUp, signOut as authSignOut, onAuthStateChange } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Netlify Identity
    initAuth();

    // Get initial user
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // Listen for auth changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(getCurrentUser());
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    const user = await authSignUp(email, password);
    return user;
  };

  const signIn = async (email, password) => {
    const user = await authSignIn(email, password);
    return user;
  };

  const signOut = async () => {
    await authSignOut();
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};
