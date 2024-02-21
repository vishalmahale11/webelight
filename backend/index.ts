import express from 'express';
const cors = require('cors');
const databseConnect = require("./config/database");
const homePageRouter = require("./src/routes/home-route/home-route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/", homePageRouter)

app.listen(PORT, async() => {
    try {
        await databseConnect();
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.error(error)
    }
});
