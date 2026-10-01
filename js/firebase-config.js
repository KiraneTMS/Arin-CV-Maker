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
    apiKey: "AIzaSyBhvOa6ZIZVrWnIO6SKngYRYkX8iUKPmNk",
    authDomain: "arin-cv-maker.firebaseapp.com",
    projectId: "arin-cv-maker",
    storageBucket: "arin-cv-maker.firebasestorage.app",
    messagingSenderId: "746549928528",
    appId: "1:746549928528:web:d13e9699714a12194a6755",
    measurementId: "G-30T39SQPC8"
  };

// Initialize only if real keys are present
let db = null;
try {
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "AIzaSyBhvOa6ZIZVrWnIO6SKngYRYkX8iUKPmNk") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  }
} catch (e) {
  console.warn("Firebase not configured – Web CV publish will be simulated.", e);
}
