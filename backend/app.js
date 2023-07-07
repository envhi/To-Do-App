const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.json())

const todoRoutes = require("./routes/todo");

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

app.use("/todos", todoRoutes);

app.listen(port, () => {




  
  console.log(`backend started on port ${port}`);
});
