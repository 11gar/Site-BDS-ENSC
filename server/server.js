const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyClrWieCOlNRHE_JkjVp9a31bzFvxUnpIE",
//   authDomain: "bds-website-d9b9e.firebaseapp.com",
//   projectId: "bds-website-d9b9e",
//   storageBucket: "bds-website-d9b9e.appspot.com",
//   messagingSenderId: "1060352754993",
//   appId: "1:1060352754993:web:63d99135cf860243c3dc10",
//   measurementId: "G-2WX3BSVN8B"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("running on port 4000");
});

require("./routes/equipe.route")(app);
require("./routes/user.route")(app);
require("./routes/defi.route")(app);

module.exports = app;
