const express = require("express")
const {connection} = require("./db")

const { ownerRouter } = require("./routes/owners.route")
const { hotelRouter } = require("./routes/hotel.route")
const { auth } = require("./middleware/auth")
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
//require("dotenv").config();

const app = express()


app.use(express.json())
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel management",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4500",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.use("/", ownerRouter)
app.use("/hotels", hotelRouter)
app.use(limiter);


app.listen(process.env.port, async () => {
  try {
    console.log(`server is running on port ${process.env.port}`);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
});