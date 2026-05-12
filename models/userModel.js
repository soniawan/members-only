import pool from "../db/pool.js";

const insertUser = async (firstName, lastName, email, hashedPassword) => {
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
    [firstName, lastName, email, hashedPassword],
  );
};

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
};

const updateToMember = async (id) => {
  await pool.query(`UPDATE users SET isMember = TRUE WHERE id = $1`, [id]);
};

export default { insertUser, getUserById, getUserByEmail, updateToMember };
