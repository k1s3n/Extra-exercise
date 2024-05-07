import express from "express";

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

const port = 3000;

app.use(express.static("www"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});