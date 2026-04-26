const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://roudainanouri270_db_user:YBZ7zCQILz2L1fm8@cluster0.fqkjueu.mongodb.net/test")
  .then(() => console.log("✅ Connected"))
  .catch(err => console.log("❌ Error:", err));