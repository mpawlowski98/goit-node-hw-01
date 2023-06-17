// POST register
// POST login
// GET tasks

// Mongo + Mongoose
// Password: secret + hash
// Access token

const express = require(`express`);
const cors = require(`cors`);
const mongoose = require("mongoose");

require("dotenv").config();
connectMongo();

const app = express();

// Midlleware

app.use(express.json());
app.use(cors());

// app.use('/api', routerApi)

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "You need to use api route",
    data: "Nothing found",
  });
});

app.use((err, _, res, __) => {
  console.error(err.stack);

  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Error Server",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
