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
// college name in dashboard
app.get('/fetchCollege/:name',(req,res)=>{
  const sql ='SELECT * FROM po_table where name=?'
  const name=req.params.name;
  const values=[name];
  db.query(sql, values,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
})
// student count
app.get('/studentCount', (req, res) => {
  const sqlQuery = 'SELECT count(*) AS count FROM student_details'; // Alias the count(*) result as 'count'

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    return res.json({ count });
  });
});
// staff count
app.get('/staffCount', (req, res) => {
  const sqlQuery = 'SELECT count(*) AS count FROM staff_details'; // Alias the count(*) result as 'count'

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Access the count value from the first result object
    const count = results[0].count;

    return res.json({ count });
  });
});
//view staff
app.get('/viewStaff/:id',(req,res)=>{
  const sql ='SELECT * FROM staff_details where uid=?'
  const uid=req.params.id;
  const values=[uid];
  db.query(sql, values,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
})
//student view
app.get('/viewStudent/:regno', (req, res) => {
  const reg=req.params.regno;
  const sqlQuery = 'SELECT *  FROM student_details where regno=? ';
  const values=[reg]; 
  db.query(sqlQuery, values,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});

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
//profile data
app.get('/profileData', (req, res) => {
  const sqlQuery = 'SELECT *  FROM po_table'; 
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    console.log(results)
    return res.json(results);
  });
});
// profile update 
app.put('/profileUpdate', (req, res) => {
  console.log(req.body)
    const id = req.body.id;
    const doj = req.body.doj;
    const dob = req.body.dob;
  const email = req.body.email;
    const address = req.body.address;
    const sqlQuery = 'UPDATE po_table SET doj=?, dob=?, email=?, address=? where id=?';
    const values = [ doj,dob, email,address,"12"];

   db.query(sqlQuery, values, (err, results) => {
     if (err) {
       console.log(err);
       return res.status(500).json({ error: 'Internal server error' });
     }
     return res.json(results);
   });
});

// company data
app.get('/companyData', (req, res) => {
  const sqlQuery = 'SELECT * FROM company_offers'; 
  db.query(sqlQuery, (err, results) => {
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
// company add
app.put('/companyAdd', (req, res) => {
  const cname = req.body.cname;
  const role = req.body.role;
  const eligibility = req.body.eligibility;
  const open_date = req.body.open_date;
  const close_date = req.body.close_date;
  console.log(req.body);
  const sqlQuery = 'INSERT INTO company_offers (cname,role,eligibility,open_date,close_date) values(?,?,?,?,?)';
  const values = [cname, role, eligibility, open_date, close_date];

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
  const sqlQuery = 'INSERT INTO staff_details (staff_name,staff_id,staff_phone,staff_email,Domain,DOJ,college_name,department) values(?,?,?,?,?,?,?,?)';
  const values = [name, id, number, email, domain, DOJ, "MKCE",department];

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
