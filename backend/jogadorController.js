import { sql } from "./db.js";

export const buscarCards = async (res) => { // função para buscar todos os cards
  try {
    const cards = await sql`
        SELECT * FROM cards
        ORDER BY id DESC
        `;

    res.status(200).json({ success: true, data: cards });
  } catch (error) {
    console.error("Erro ao buscar cards:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const buscarCardId = async (req, res) => {  // função para buscar um card pelo id
  const { id } = req.params;

  try {
    const aluno = await sql`
        SELECT * FROM cards WHERE id =${id}
        `;

    res.status(200).json({ success: true, data: card[0] });
  } catch (error) {
    console.error("Erro ao buscar card:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const adicionarCard = async (req, res) => { // função para adicionar um card
  const { nomejogador, numero, posicao, selecao, imagem } = req.body;

  if (!nomejogador || !numero || !posicao || !selecao || !imagem) {
    return res
      .status(400)
      .json({ success: false, message: "Preencha todos os campos!" });
  }

  try {
    const novoCard = await sql`
        INSERT INTO cards (nomejogador, numero, posicao, selecao, imagem)
        VALUES (${nomejogador}, ${numero}, ${posicao}, ${selecao}, ${imagem})
        RETURNING *;
        `;
    res.status(201).json({ success: true, data: novoCard[0] });
  } catch (error) {
    console.error("Erro ao adicionar card:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const atualizarCard = async (req, res) => { // função para atualizar um card
  const { id } = req.params;
  const { nomejogador, numero, posicao, selecao, imagem } = req.body;

  try {
    const cardAtualizado = await sql`
        UPDATE  alunos SET nomejogador = ${nomejogador}, numero = ${numero}, posicao = ${posicao}, selecao = ${selecao}, imagem = ${imagem}
        WHERE id = ${id} 
        RETURNING *
        `;

    if (cardAtualizado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Card não encontrado" });
    }

    res.status(200).json({ success: true, data: cardAtualizado[0] });
  } catch (error) {
    console.error("Erro ao atualizar card:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};

export const deletarCard = async (req, res) => { // função para deletar um card
  const { id } = req.params;

  try {
    const cardDeletado = await sql`
        DELETE FROM cards WHERE id = ${id}
        RETURNING *;
        `;

    if (cardDeletado.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "card não encontrado" });
    }

    res.status(200).json({
      success: true,
      data: cardDeletado[0],
    });
  } catch (error) {
    console.error("Erro ao deletar card:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno no servidor" });
  }
};
