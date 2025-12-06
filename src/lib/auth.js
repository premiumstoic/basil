// src/lib/auth.js
import netlifyIdentity from 'netlify-identity-widget';

// Initialize Netlify Identity
export const initAuth = () => {
  netlifyIdentity.init();
};

// Get current user
export const getCurrentUser = () => {
  return netlifyIdentity.currentUser();
};

// Sign up with email and password
export const signUp = async (email, password) => {
  return new Promise((resolve, reject) => {
    netlifyIdentity.open('signup');
    netlifyIdentity.on('signup', (user) => {
      netlifyIdentity.close();
      resolve(user);
    });
    netlifyIdentity.on('error', (err) => {
      reject(err);
    });
  });
};

// Sign in with email and password
export const signIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    netlifyIdentity.open('login');
    netlifyIdentity.on('login', (user) => {
      netlifyIdentity.close();
      resolve(user);
    });
    netlifyIdentity.on('error', (err) => {
      reject(err);
    });
  });
};

// Sign out
export const signOut = async () => {
  netlifyIdentity.logout();
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  netlifyIdentity.on('login', callback);
  netlifyIdentity.on('logout', callback);
  netlifyIdentity.on('init', callback);
  
  // Return unsubscribe function
  return () => {
    netlifyIdentity.off('login', callback);
    netlifyIdentity.off('logout', callback);
    netlifyIdentity.off('init', callback);
  };
};
