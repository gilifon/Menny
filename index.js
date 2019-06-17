const express = require("express"); //easy routing
const path = require("path");
const http = require("http");
const logger = require("./middleware/logger");
const cors = require("./middleware/cors");

const app = express();

/************************************* Middlewares *********************************/
//use Middleware
app.use(logger); //log every requst
app.use(cors); //allow cors
app.use(express.json()); //accept json body
app.use(express.urlencoded({ extended: false }));
/***********************************************************************************/

//bring the api router
app.use("/", require("./routes/app_api"));

const httpServer = http.createServer(app);

const HTTP_PORT = process.env.PORT || 5000;
httpServer.listen(HTTP_PORT, () => {
  console.log(`server running on ${HTTP_PORT}`);
});
