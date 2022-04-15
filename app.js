const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));

app.post("/bfhl", (req, res, next) => {
  const { data } = req.body;

  if (!data) {
    const err = new Error();
    err.message = "missing data";
    err.status = 400;
    return next(err);
  }

  if (!Array.isArray(data)) {
    const err = new Error();
    err.message = "Data is not an array";
    err.status = 400;
    return next(err);
  }

  console.log(data);

  const numbers = [];
  const alphabets = [];

  for (const value of data) {
    if (!isNaN(value)) {
      numbers.push(value);
    } else {
      alphabets.push(value);
    }
  }

  return res.json({
    is_success: true,
    user_id: "Sumit_Lovanshi_21122001",
    email: "sumit.lovanshi@cdgi.edu.in",
    roll_number: "0832CS191180",
    numbers,
    alphabets,
  });
});

app.all("*", (req, res, next) => {
  return res.status(400).json({
    is_success: false,
    message: `Cannot find this url`,
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;

  return res.status(status).json({
    is_success: false,
    err,
  });
});

module.exports = app;
