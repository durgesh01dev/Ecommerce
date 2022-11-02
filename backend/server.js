const app = require("./app");
const dotenv = require('dotenv');

//configuring details will be config file
dotenv.config({path:"backend/config/config.env"});

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});
