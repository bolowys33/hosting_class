require("dotenv").config();
const express = require("express");
const router = require("./routes/routes");
const { connectDb } = require("./db");
const swaggerUi = require("swagger-ui-express");
const { swaggerDoc } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use("/api", router);

app.listen(PORT, async () => {
  console.log("Server is running on port 3001");
  await connectDb();
});

module.exports = app;
