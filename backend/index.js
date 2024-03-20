const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors())
app.use(express.json());
//data base connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Project_db'
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
})
//student delete
app.get('/studentDelete/:id', (req, res) => {
  const sqlQuery = 'DELETE FROM student_details WHERE regno=?';
  const id = req.params.id;
  const values = [id];
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//staff details delete
app.get('/staffDelete/:id', (req, res) => {
  const sqlQuery = 'DELETE FROM staff_details WHERE staff_id=?';
  const id = req.params.id;
  const values = [id];
  
  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// student data fetch
app.get('/studentData', (req, res) => {
  const sqlQuery = 'SELECT * FROM student_details'; 
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
//staff details fetch
app.get('/staffData', (req, res) => {
  const sqlQuery = 'SELECT * FROM staff_details';
  // const staff_mail = req.params.staff_mail;
  // const values = [staff_mail];
  
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
// student add
app.put('/studentAdd', (req, res) => {
  console.log(req.body)
   const name = req.body.name;
   const id = req.body.Regno;
   const department = req.body.department;
   const year = req.body.year;
   const domain = req.body.domain;
   const sqlQuery = 'INSERT INTO student_details (name,regno,department,year,Domain,college_name) values(?,?,?,?,?,?)';
   const values = [name, id, department, year, domain,"MKCE"];

   db.query(sqlQuery, values, (err, results) => {
     if (err) {
       console.log(err);
       return res.status(500).json({ error: 'Internal server error' });
     }
     return res.json(results);
   });
});
//staff details add
app.put('/staffAdd', (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const DOJ = req.body.DOJ;
  const email = req.body.email;
  const domain = req.body.domain;
  const department = req.body.department;
  const number = req.body.number;
  console.log(req.body);
  const sqlQuery = 'INSERT INTO staff_details (staff_name,staff_id,staff_phone,staff_email,Domain,DOJ,college_name) values(?,?,?,?,?,?,?)';
  const values = [name, id, number, email, domain, DOJ, "MKCE"];

  db.query(sqlQuery, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});
app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
