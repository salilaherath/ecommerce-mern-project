import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import AWS from 'aws-sdk';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();

const region = 'ap-south-1';
const myCredentials = {
	accessKeyId: process.env.ACCESSKEYIDS3BUCKET,
	secretAccessKey: process.env.SECRETKEYS3BUCKET,
};
export const s3 = new AWS.S3({
	credentials: myCredentials,
	region: region,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/category', categoryRoutes);

app.get('/api/config/paypal', (req, res) => {
	res.json(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
