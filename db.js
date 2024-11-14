
const mongoose = require("mongoose");
const db = (async () => {
   try {
   
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected")
    
   } catch (error) {
    console.log("Database failed to connect")
    console.log(error)
   }
})();

module.exports = db;





















