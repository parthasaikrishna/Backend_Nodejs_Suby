const mongoose = require('mongoose');

const dbConnect = ()=>{
    mongoose.connect("mongodb+srv://admin:admin@cluster0.t5vzjs6.mongodb.net/swiggy?retryWrites=true&w=majority&appName=Cluster0", {
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Database connection failed", err);
    });

}

module.exports = dbConnect;
