require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes =
require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send(
        "File Upload & Cloudinary API Running"
    );
});

app.use("/api", uploadRoutes);

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running on Port ${PORT}`
    );
});
