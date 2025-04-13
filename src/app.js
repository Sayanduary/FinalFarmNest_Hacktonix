import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js'
import cropRoute from './routes/cropRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
  origin: "http://localhost:5173",  // your frontend origin
  credentials: true,                // allow cookies / auth headers
}));


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});



app.use('/api/v1/auth', authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('/api/v1/crops', cropRoute);

export { app };

import translatedProductRoutes from './routes/translatedProductRoutes.js';

app.use('/api/products', productRoutes);
app.use('/api/products', translatedProductRoutes);



