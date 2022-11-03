const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`MongoDB is connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

//exporting the function
module.exports = connectDatabase;
