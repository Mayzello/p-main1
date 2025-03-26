import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-database.js";

// Your web app's Firebase configuration
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

// Signup button event listener
let signupbutton = document.getElementById("signup-btn");

signupbutton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission
  
  console.log("Button clicked!"); // Check if button click is detected
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;

  // Check if password and confirm_password match
  if (password !== confirm_password) {
    alert("Password dan Confirm Password tidak cocok!");
    return; // Stop further processing
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data to Firebase Realtime Database
      set(ref(database, "users/" + user.uid), {
        email: email,
        password: password
      })
      .then(() => {
        console.log("Data Saved Successfully");
        alert("User Telah Sukses Dibuat");
        
        // Redirect to login.html after successful signup
        window.location.href = 'login.html'; // This will redirect to login.html
      })
      .catch((error) => {
        console.log("The Write Failed", error);
        alert("Error");
      });
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);  
    });
});
signOut(auth)
.then(() => {})
.catch((error) => {});