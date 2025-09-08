import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import fareRoutes from './routes/fareRoutes.js';
import ridesRoutes from './routes/ridesRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/fare', fareRoutes);
app.use("/", ridesRoutes);
app.use("/payment", paymentRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost/${port}`);
});