import pool from "../db/pool.js";

const insertMessage = async (userId, title, text, createdAt = new Date()) => {
  await pool.query(
    "INSERT INTO messages (user_id, title, text, created_at) VALUES ($1, $2, $3, $4)",
    [userId, title, text, createdAt],
  );
};

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
};

const deleteMessage = async (messageId, userId) => {
  await pool.query("DELETE FROM messages WHERE id = $1 AND user_id = $2", [messageId, userId])
}

export default { insertMessage, getAllMessages, deleteMessage };