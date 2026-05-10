import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello,World" });
});

app.get("/api/data", (req, res) => {
    const data = {
        id: 1,
        name: "sample Data",
        description: "This is a sample data response from the api."
    }
    res.status(200).json(data);
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});



