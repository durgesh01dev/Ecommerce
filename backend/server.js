const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


//configuring details will be config file
//first dotenv file is configured here
dotenv.config({ path: "backend/config/config.env" });

//now calling the connect function for databse
connectDatabase();

//listening server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

/**
 * Handling Promise Rejection scenarios
 * => works on unhandled Promise Rejection event
 * => Example, when mongodb url is incorrect
 */
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled Promise Rejection");

  //closing the server now
  server.close(() => {
    //as soon as server close, close all the processes and terminate
    process.exit(1);
  });
});
