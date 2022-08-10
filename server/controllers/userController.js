const mysql = require("mysql2");
const db = require('../models/db.js');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  createUser: async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const sqlInsert = 'INSERT INTO userTable (username, email, ign, api, password) VALUES (?,?,?,?,?)'
    const sqlSearch = 'SELECT * FROM userTable WHERE username = ? OR email = ? OR ign = ?'
    const insert_query = mysql.format(sqlInsert,
      [
        req.body.username, 
        req.body.email, 
        req.body.ign, 
        req.body.apiKEY, 
        hashedPassword
      ]``
    )
    console.log(insert_query);
    db.connect(function(errors) {
      if (errors) return next(errors);
      console.log("Connected!");
      db.query (sqlSearch, [req.body.username, req.body.email, req.body.ign,], (err, result) => {
        if (err) return next(err);
        if (result.length != 0) {
          console.log("------> User already exists")
          res.locals.exists = true;
          res.locals.message = "Username/Email/IGN Already Used"
          return next();
        }
        else {
          db.query (insert_query, [ req.body.username, req.body.email, req.body.ign, req.body.api, hashedPassword,],
            (err, result) => {
              if(err) return next(err);
              else {
                console.log('USER ADDED', result)
                res.locals.exists = false;
                res.locals.message = "USER Created"
                return next();
              } 
            })
        }
      });
    });
  },
  resetPasswordSendEmail: async (req, res, next) => {
    const sqlSearch = 'SELECT * FROM userTable WHERE email = ?';
    db.connect(function(errors) {
      if (errors) return next(errors);
      console.log("Connected!");
      db.query (sqlSearch, [req.body.email], (err, result) => {
        if (err) return next(err);
        if (result.length != 0) {
          console.log("Email Found In DB")
          crypto.randomBytes(48, function(err, buffer) {
            var token = buffer.toString('hex');
            const sqlToken = 'UPDATE userTable SET token = ? WHERE email = ?;';
            db.query (sqlToken, [token, req.body.email], (err, result) => {
              if (err) return next(err);
              var mail = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL, // Your email id
                    pass: process.env.EMAIL_PASS // Your password
                }
              });
              
              var mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'GW2 Fashion Password Reset Link',
                html: '<p>A request to reset you password has been sent. Reset it with this link: <a href="http://localhost:8080/reset-password?token=' + token + '">link</a></p>'
        
              };
              
              mail.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(info)
                }
              });
              
              res.locals.exists = true;
              res.locals.message = "Email Sent";
              return next();
            })
          });
        }
        else{
          res.locals.exists = false;
          res.locals.message = `There is no account with this email: ${req.body.email}`;
          return next()
        }
      });
    });
  },

  resetPassword: async (req, res, next) => {
    const sqlSearch = 'SELECT * FROM userTable WHERE token = ?';
    const sqlUpdate = 'UPDATE userTable SET password = ? WHERE token = ?;';
    const newHashedPassword = await bcrypt.hash(req.body.password,10);
    db.connect(function(errors) {
      if (errors) return next(errors);
      console.log("resetPassword - DB Connected!");
      db.query (sqlSearch, [req.body.token], (err, result) => {
        if (err) return next(err);
        if (result.length != 0) {
          console.log("Email Found In DB")
          db.query (sqlUpdate, [newHashedPassword, req.body.token], (err, result) => {
            if (err) return next(err);
            res.locals.passChanged = true;
            res.locals.message = "Password Changed";
            return next();
          })
        }
        else{
          res.locals.exists = false;
          res.locals.message = `Error`;
          return next()
        }
      });
    });
  }
}


// module.exports = {
//   createUser: async (req, res, next) => {
//     username, password, ign, api_key
//     const username = req.body.username;
//     const ign = req.body.ign;
//     const apiKey = req.body.apiKey;
//     const hashedPassword = await bcrypt.hash(req.body.password,10);

//     db.connected( async (err, connection) => {
//       if (err) throw (err);
//       const sqlSearchUsername = "SELECT * FROM userTable WHERE username = ?"
//       const search_username_query = mysql.format(sqlSearch,[username])
//       const sqlSearchIgn = "SELECT * FROM userTable WHERE ign = ?"
//       const search_ign_query = mysql.format(sqlSearch,[username])
//       const sqlInsert = "INSERT INTO userTable VALUES (0,?,?,?,?)"
//       const insert_query = mysql.format(sqlInsert,[username, hashedPassword,ign, apiKey])
//       // ? will be replaced by values
//       // ?? will be replaced by string
//       await connection.query (search_query, async (err, result) => {
//         if (err) throw (err)
//         console.log("------> Search Results")
//         console.log(result.length)
//         if (result.length != 0) {
//           connection.release()
//           console.log("------> User already exists")
//           res.sendStatus(409) 
//         }
//         else {
//           await connection.query (insert_query, (err, result)=> {
//           connection.release()
//           if (err) throw (err)
//           console.log ("--------> Created new User")
//           console.log(result.insertId)
//           res.sendStatus(201)
//          })
//         }
//       });
//     });
//   }
// };

// module.exports = {
//   createUser: (req,res) => {
//     db.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected as id ' + connection.threadId);
//         connection.query('SELECT * from users LIMIT 1', (err, rows) => {
//             connection.release(); // return the connection to pool
//             if(err) throw err;
//             console.log('The data from users table are: \n', rows);
//         });
//     });
//   }
// }


// createUser: async (req, res, next) => {
//   const username = req.body.username;
//   const ign = req.body.ign;
//   const apiKey = req.body.apiKey;
//   const hashedPassword = await bcrypt.hash(req.body.password,10);

//   db.getConnection( async (err, connection) => {
//     if (err) throw (err);
//     const sqlSearchUsername = "SELECT * FROM userTable WHERE username = ?"
//     const search_username_query = mysql.format(sqlSearch,[username])
//     const sqlSearchIgn = "SELECT * FROM userTable WHERE ign = ?"
//     const search_ign_query = mysql.format(sqlSearch,[username])
//     const sqlInsert = "INSERT INTO userTable VALUES (0,?,?,?,?)"
//     const insert_query = mysql.format(sqlInsert,[username, hashedPassword,ign, apiKey])


//     await connection.query(search_query, async (err, result) => {
//       //check for errors
//       if (err) throw (err)
//       console.log("------> Search Results")
//       console.log(result.length)
//       //if exist then length is not eqal to 0
//       if (result.length != 0) {
//         connection.release()
//         console.log("------> User already exists")
//         res.status(309)
//         return next(); 
//       }
//       //if not exist then insert to table
//       else {
//         await connection.query (insert_query, (err, result)=> {
//           connection.release()
//           if (err) throw (err)
//           console.log ("--------> Created new User")
//           console.log(result.insertId)
//           res.locals.data = {
//             "username":username,
//             "password":req.body.password,
//             "hashedPassword": hashedPassword,
//             "ign":ign,
//             "apiKey":apiKey
//           }
//           return next();
//         })
//       }
//     });
//   })
// }