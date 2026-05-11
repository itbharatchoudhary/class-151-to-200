import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "hello, World" });
});

app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Bharat" },
        { id: 2, name: "bob" },
        { id: 3, name: "charlie" },

    ];
    res.status(200).json(users);
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})