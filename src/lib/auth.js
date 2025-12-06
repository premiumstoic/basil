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
export const signUp = async () => {
  return new Promise((resolve, reject) => {
    const handleSignup = (user) => {
      netlifyIdentity.off('signup', handleSignup);
      netlifyIdentity.off('error', handleError);
      netlifyIdentity.close();
      resolve(user);
    };

    const handleError = (err) => {
      netlifyIdentity.off('signup', handleSignup);
      netlifyIdentity.off('error', handleError);
      reject(err);
    };

    netlifyIdentity.on('signup', handleSignup);
    netlifyIdentity.on('error', handleError);
    netlifyIdentity.open('signup');
  });
};

// Sign in with email and password
export const signIn = async () => {
  return new Promise((resolve, reject) => {
    const handleLogin = (user) => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('error', handleError);
      netlifyIdentity.close();
      window.location.reload(); // Force reload to ensure fresh state
      resolve(user);
    };

    const handleError = (err) => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('error', handleError);
      reject(err);
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('error', handleError);
    netlifyIdentity.open('login');
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
