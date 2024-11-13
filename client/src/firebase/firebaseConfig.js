// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCmp4BXDYq9uz1IhEqoEjVYhjnv_EHLrIc",
  authDomain: "transferhub-f4238.firebaseapp.com",
  projectId: "transferhub-f4238",
  storageBucket: "transferhub-f4238.firebasestorage.app",
  messagingSenderId: "702845284105",
  appId: "1:702845284105:web:ce6573774461e65d146dd8",
  measurementId: "G-SRECPRNG3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication instance
const provider = new GoogleAuthProvider(); // Google Auth provider

// Function to handle Google login
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider); // Trigger Google login popup
    const user = result.user; // Get the signed-in user details
    console.log("User logged in:", user); // Handle user details as needed
    return user;
  } catch (error) {
    console.error("Google login error:", error.message);
    alert("Login failed. Please try again.");
    throw error;
  }
};

// Function to handle Google logout
const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out successfully");
    })
    .catch((error) => {
      console.error("Error logging out:", error.message);
    });
};

// Function to monitor authentication state changes
const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, callback); // Listen to authentication state changes
};

// Export Firebase authentication methods
export { auth, provider, handleGoogleLogin, handleLogout, onAuthStateChange };
