const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(express.json());
// middleware
//routes//
//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO TODO (description) VALUES($1)",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(err.message);
  }
});
//get all todos
//get a todo
//update a todo
//delete a todo
app.use(cors());
app.listen(5000, () => {
  console.log(`server running on port 5000`);
});
