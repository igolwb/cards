import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "./jogadorRoutes.js";
import { sql } from "./db.js";

dotenv.config();                                    

const app = express();
const PORT = process.env.PORT;

app.use(express.json());                       
app.use(cors());


app.use("/api/cards", cardRoutes);

async function startdb() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS cards (
      id SERIAL PRIMARY KEY,
      nomejogador VARCHAR(255) NOT NULL,
      numero INT NOT NULL,
      posicao VARCHAR(255) NOT NULL,
      selecao VARCHAR(255) NOT NULL,
      imagem VARCHAR(255) NOT NULL
    )
    `;

    console.log("banco de dados conectado com sucesso"); // Loga a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error); // Loga o erro caso a conexão falhe
  }
}

startdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`); // Loga a porta em que o servidor está rodando
  });
});
