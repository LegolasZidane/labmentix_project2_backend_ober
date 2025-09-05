import express from "express";
import dotenv from '.dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost/${port}`);
});