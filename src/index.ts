import * as express from "express";
import * as cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

import routes from './routes';

const PORT = process.env.PORT || 3001;

const app = express() 
app.use(express.json()) 
app.use(cors()) 

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

app.use(routes);