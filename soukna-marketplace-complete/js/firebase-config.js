// Firebase Web config is public. Security is enforced by Firestore Rules.
// 1) Create a Firebase project and register a Web app.
// 2) Enable Authentication > Email/Password and Firestore.
export const firebaseConfig = {
  apiKey: "AIzaSyDujlGSU4D6oDUkRA4fcxewmvPvNczLzX8",
  authDomain: "soukna-2c69a.firebaseapp.com",
  projectId: "soukna-2c69a",
  storageBucket: "soukna-2c69a.firebasestorage.app",
  messagingSenderId: "267139205456",
  appId: "1:267139205456:web:77f2bd16de1666821fc455"
};

// Cloudinary direct unsigned uploads. These values are intended to be public.
export const CLOUDINARY_CLOUD_NAME = "vjq9mwnh";
export const CLOUDINARY_UPLOAD_PRESET = "soukna-upload";

// UI visibility only. Add your Firebase Authentication UID here.
// IMPORTANT: this list does NOT grant admin rights by itself.
// Add the same UID to ADMIN_UIDS in firestore.rules and deploy those rules.
export const ADMIN_UIDS = [
  "odDrCkEPJoaRYYzAYsc52DBU4hf1"
];
