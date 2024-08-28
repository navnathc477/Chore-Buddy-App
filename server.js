// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Navnath@773',
//     database: 'mydb'
//   });
  
//   db.connect(err => {
//     if (err) {
//       throw err;
//     }
//     console.log('MySQL connected...');
//   });
  
//   db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE IF NOT EXIST tasks (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL)";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

// app.get('/api/tasks', (req, res) => {
//   const sql = 'SELECT * FROM tasks';
//   db.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//   });
// });

// app.post('/api/tasks', (req, res) => {
//   const newTask = req.body.name;
//   const sql = 'INSERT INTO tasks (name) VALUES (?)';
//   db.query(sql, [newTask], (err, result) => {
//     if (err) throw err;
//     res.json({ id: result.insertId, name: newTask });
//   });
// });

// app.delete('/api/tasks/:id', (req, res) => {
//   const sql = 'DELETE FROM tasks WHERE id = ?';
//   db.query(sql, [req.params.id], (err, result) => {
//     if (err) throw err;
//     res.sendStatus(204);
//   });
// });

// app.listen(5000, () => {
//   console.log('Server started on port 5000');
// });


const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Navnath@773',
  database: 'mydb'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});


    

app.get('/api/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/tasks', (req, res) => {
  const newTask = req.body.name;
  const sql = 'INSERT INTO tasks (name, assigned) VALUES (?, ?)';
  db.query(sql, [newTask, false], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name: newTask, assigned: false });
  });
});

app.put('/api/tasks/assign/:id', (req, res) => {
  const sql = 'UPDATE tasks SET assigned = ? WHERE id = ?';
  db.query(sql, [true, req.params.id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.sendStatus(204);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
