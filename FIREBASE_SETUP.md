// Firebase initialization instructions for pnz-gear-sale2025-consumables-tracker
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (e.g., pnz-gear-sale2025)
// 3. Add a web app to the project
// 4. Copy the Firebase config snippet below into your HTML file before any Firebase usage
// 5. Install Firebase via CDN or npm if needed

// Example Firebase config snippet:
/*
<!-- Firebase App (the core SDK) -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<!-- Analytics (optional) -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js"></script>
<!-- Add other Firebase services as needed, e.g., database, firestore, auth -->
<script>
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
</script>
*/

// Replace the placeholders with your actual Firebase project values.
// You can now use db.ref(), db.set(), db.get(), etc. for inventory sync.

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyCRVz52BgmZ6QMHuzjntnxhznc7hf3mK7Q",
    authDomain: "pnz-gear-sale-tracker-improved.firebaseapp.com",
    projectId: "pnz-gear-sale-tracker-improved",
    storageBucket: "pnz-gear-sale-tracker-improved.firebasestorage.app",
    messagingSenderId: "95568490073",
    appId: "1:95568490073:web:4e67817c7c4ee9ac680b48",
    measurementId: "G-2ZLE078RYR"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics(app);
</script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>
<script>
  const db = firebase.firestore();
  // Now you can use db.collection(...), db.doc(...), etc.
</script>
