import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/data", (req, res) => {
    const data = {
        message: "This is some sample data from the API.",
        timestamp: new Date(),
    };
    res.json(data);
})

app.get("/api/user", (req, res) => {
    const data = {
        message: "Bharat",
        timestamp: new Date(),
    };
    res.json(data);
})

export default app;