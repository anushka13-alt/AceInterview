const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:anushka123@cluster0.ubbjmvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("✅ Mongo Connected");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });