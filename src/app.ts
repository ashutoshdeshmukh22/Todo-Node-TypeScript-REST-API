import express from 'express';
import bodyParser from 'body-parser';

import toDosRoutes from './routes/todos';

const app = express();

app.use(bodyParser.json());

app.use(toDosRoutes);

app.listen(3000);
