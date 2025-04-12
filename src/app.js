import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
<<<<<<< HEAD
import productRoutes from './routes/productRoute.js'
import cropRoute from './routes/cropRoutes.js'
=======
import productRoutes from './routes/productRoutes.js'

>>>>>>> 4aaaf3064192eee702d181c64bd1431c025b9961

const app = express();


app.use(cors({
  origin: "http://localhost:5173",  // your frontend origin
  credentials: true,                // allow cookies / auth headers
}));


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('/api/v1/crops', cropRoute);

export { app };

import productRoutes from './routes/productRoutes.js';
import translatedProductRoutes from './routes/translatedProductRoutes.js'; // ✅ unique name

app.use('/api/products', productRoutes);
app.use('/api/products', translatedProductRoutes);



