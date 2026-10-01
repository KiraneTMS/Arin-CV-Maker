/**
 * Firebase configuration
 * -------------------------------------------------
 * 1. Go to https://console.firebase.google.com
 * 2. Create a project (or use existing)
 * 3. Add a Web app → copy the config object below
 * 4. Enable Firestore Database (start in test mode for demo)
 * 5. (Optional but recommended) Add a Cloud Function or
 *    scheduled job that deletes documents older than 30 days.
 *    See README for the TTL cleanup example.
 */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize only if real keys are present
let db = null;
try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase not configured – Web CV publish will be simulated.", e);
}
