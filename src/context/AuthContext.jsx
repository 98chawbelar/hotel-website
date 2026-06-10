import { createContext, useContext, useEffect, useMemo, useState } from "react";

import axios from "axios";

import { auth } from "../firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

/**
 * Custom Auth Hook
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Maps Firebase user to application user object
 */
const mapUser = (user) => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photo: user.photoURL,
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);
  /**
   * Register User
   */
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  /**
   * Login User
   */
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  /**
   * Google Sign In
   */
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  /**
   * Logout User
   */
  const logout = () => signOut(auth);

  /**
   * Upload profile image to ImgBB
   * Update Firebase Auth photoURL
   */
  const uploadProfileImage = async (file) => {
    try {
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

      const formData = new FormData();

      formData.append("image", file);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
      );

      const imageUrl = data?.data?.url;

      if (!imageUrl) {
        throw new Error("Failed to retrieve image URL");
      }

      await updateProfile(auth.currentUser, {
        photoURL: imageUrl,
      });

      setCurrentUser((prev) => ({
        ...prev,
        photo: imageUrl,
      }));

      return imageUrl;
    } catch (error) {
      console.error("Profile upload error:", error);

      throw error;
    }
  };

  /**
   * Auth State Listener
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? mapUser(user) : null);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Memoized Context Value
   */
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      registerUser,
      loginUser,
      signInWithGoogle,
      logout,
      uploadProfileImage,
    }),
    [currentUser, loading],
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
