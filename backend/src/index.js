import express from 'express';
import pool from './db.js';
import './wsServer.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/messages', async (req, res) => {
    const result = await pool.query('SELECT * FROM messages ORDER BY id ASC');
    res.json(result.rows);
});

app.post('/messages', async (req, res) => {
    const { author, content } = req.body;
    const result = await pool.query(
        'INSERT INTO messages (author, content) VALUES ($1, $2) RETURNING *',
        [author, content]
    );
    res.json(result.rows[0]);
});

app.listen(process.env.PORT, () => console.log('Backend running on port ' + process.env.PORT));
