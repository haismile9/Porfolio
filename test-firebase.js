const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, child, push, serverTimestamp } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyBh5lSQfuwR_3hhO-L0V3o9MHzjOQez6n4",
  authDomain: "porfolio-chat-c82a5.firebaseapp.com",
  databaseURL: "https://porfolio-chat-c82a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "porfolio-chat-c82a5",
  storageBucket: "porfolio-chat-c82a5.firebasestorage.app",
  messagingSenderId: "507200571215",
  appId: "1:507200571215:web:ac4cb4247977775590273a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');

push(messagesRef, {
  username: "System",
  text: "Hello! The chat database is now successfully connected.",
  createdAt: serverTimestamp()
}).then(() => {
  console.log("Test message pushed successfully!");
  process.exit(0);
}).catch((error) => {
  console.error("Error pushing message:", error);
  process.exit(1);
});
