const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const connectDB = require("./db/connect");
require('dotenv').config()
const notFound = require('./middleware/not-found')
const port = 3000;

// Middleware
app.use(express.static('./public'))
app.use(express.json());

//Routes
app.use("/api/v1/tasks", taskRoutes);
app.use(notFound)

// Server setup  
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start()
