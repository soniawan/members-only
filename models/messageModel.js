import pool from "../db/pool.js";

const insertMessage = async (userId, title, text, createdAt = new Date()) => {
  await pool.query(
    "INSERT INTO messages (user_id, title, text, created_at) VALUES ($1, $2, $3, $4)",
    [userId, title, text, createdAt],
  );
};

const getAllMessages = async () => {
  const { rows } = await pool.query(`
    SELECT 
      messages.*, users.first_name, users.last_name, users.is_admin 
    FROM messages 
    INNER JOIN users ON messages.user_id = users.id 
    ORDER BY messages.created_at DESC
  `);
  return rows;
};

const deleteMessage = async (messageId, userId, isAdmin) => {
  if (isAdmin) {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
  } else {
    await pool.query("DELETE FROM messages WHERE id = $1 AND user_id = $2", [messageId, userId]);
  }
}

export default { insertMessage, getAllMessages, deleteMessage };