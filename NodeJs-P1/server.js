const express = require('express');
const mysql = require('mysql');
const port = 3000;

const app = express();
app.use(express.json());

// MySQL Connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql_nodejs'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to MySQL');
})

// CREATE Routes
app.post('/create', async (req, res) => {
    const { name, email, password } = req.body;
    const sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
    try {
        conn.query(
            sql,
            (err, result) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send()
                }
                return res.status(201).json({ message: "New user successfully created!" })
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// READ
app.get('/read', async (req, res) => {
    const sql = `SELECT * FROM users`;
    try {
        conn.query(
            sql,
            (err, result) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// DELETE

app.delete('/delete/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const sql = `DELETE FROM users WHERE email = '${email}'`;
        conn.query(
            sql,
            (err, result) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// READ single users from db
app.get('/users/single/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
        conn.query(
            sql,
            (err, result) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})

// UPDATE data
app.patch('/users/single/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const { name, password } = req.body;
        const sql = `UPDATE users SET name = '${name}', password = '${password}' WHERE email = '${email}'`;
        conn.query(
            sql,
            (err, result) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send()
                }
                return res.status(200).json(result)
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send()
    }
})
app.listen(port, () => console.log(`Server listening on ${port}`));