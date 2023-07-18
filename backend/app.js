const express = require("express");
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.json())


// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

// user router 
const userRoutes = require("./routes/user")
app.use("/users", userRoutes)

// todo router
const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);



app.listen(port, () => {




  
  console.log(`backend started on port ${port}`);
});
