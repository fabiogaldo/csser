// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db';
import templatesRouter from './routes/templates';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/templates', templatesRouter);

// 404 - rota não encontrada
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Rota não encontrada');
  // @ts-expect-error adicionando status manualmente
  error.status = 404;
  next(error);
});

// Middleware global de tratamento de erros
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
  ) => {
    const statusCode = err.status || 500;

    // Log mais detalhado no servidor
    console.error('[Error]', {
      message: err.message,
      stack: err.stack,
      statusCode,
      path: req.path,
      method: req.method,
    });

    res.status(statusCode).json({
      error: true,
      message:
        statusCode === 500
          ? 'Erro interno no servidor. Tente novamente mais tarde.'
          : err.message,
      // Em dev, opcionalmente devolve mais detalhes
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
      }),
    });
  }
);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error('MONGO_URI não definido no .env');
  process.exit(1);
}

// Tratamento de erros globais do Node
process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
  // Idealmente encerra o processo para evitar estado inconsistente
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('[unhandledRejection]', reason);
  process.exit(1);
});

connectDb(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Server] Rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB', err);
    process.exit(1);
  });
