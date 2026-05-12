import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/api/hello", (req, res) => {
    res.status(200).json({ message: "hello, World" });
});

app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Bharat" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];

    res.status(200).json(users);
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
