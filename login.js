import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjLtP1VsHp35M-YUaQmNM2U5Y1caPIdjc",
  authDomain: "loginregis-ed0fc.firebaseapp.com",
  databaseURL: "https://loginregis-ed0fc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "loginregis-ed0fc",
  storageBucket: "loginregis-ed0fc.firebasestorage.app",
  messagingSenderId: "316527916691",
  appId: "1:316527916691:web:1c6f9ff798d645927c7f66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Sign In button
let signinbutton = document.getElementById("signin-btn");

signinbutton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission to avoid page reload
  console.log("Button clicked!"); // Cek apakah klik terdeteksi
  
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Sign in with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      let lgDate = new Date();

      // Update last login date in the Realtime Database
      update(ref(database, "/users/" + user.uid), {
        last_login: lgDate.toString() // Store date as a string
      })
        .then(() => {
          console.log("Data Saved Successfully");
          alert("User Telah Sukses Login");
          // Redirect to the profile page
          location.href = 'p.html'; // Redirect to the profile page
        })
        .catch((error) => {
          console.error("Error writing to database:", error);
          alert("Error saving data");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage); // Show error message from Firebase
    });
});
signOut(auth)
.then(() => {})
.catch((error) => {});
