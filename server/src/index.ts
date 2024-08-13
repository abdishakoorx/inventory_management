import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// route imports
import dashboardRoutes from './routes/dashboardRoutes';
import productRoutes from './routes/productRoutes';
import expenseRoutes from './routes/expenseRoutes';
import userRoutes from './routes/userRoutes';



// configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// routes
app.use("/dashboard", dashboardRoutes); // dashboard routes
app.use('/products', productRoutes); // product routes
app.use('/expenses', expenseRoutes); // expenses routes
app.use('/users', userRoutes); // users routes


// server
const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});