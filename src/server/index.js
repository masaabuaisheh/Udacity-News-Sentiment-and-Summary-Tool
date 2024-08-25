const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyze.js");

app.use(cors());
dotenv.config();

const port = 8000;
const key = process.env.API_KEY;

app.use(express.static('dist'));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index.html");
});

app.post("/", async (req, res) => {
    console.log("Request body:", req.body);
    const { input } = req.body;
    console.log("Input:", input);
    
    try {
        // Process the data and send a response
        const analysisResult = await analyze(input, key);
        console.log("Analysis Result:", analysisResult);

        const { code, msg, sample } = analysisResult;

        // Send the response once
        res.json({ code, msg, sample });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error in analyze function:", error);
        if (!res.headersSent) {
            res.status(500).json({ msg: "Error processing request", code: '500' });
        }
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
