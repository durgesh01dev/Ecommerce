const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

//configuring details will be config file
//first dotenv file is configured here
dotenv.config({path:"backend/config/config.env"});

//now calling the connect function for databse
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

