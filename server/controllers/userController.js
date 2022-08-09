const mysql = require("mysql2");
const db = require('../models/db.js');
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    const sqlInsert = 'INSERT INTO userTable (username, email, ign, api, password) VALUES (?,?,?,?,?)'
    const insert_query = mysql.format(sqlInsert,
      [
        req.body.username, 
        req.body.email, 
        req.body.ign, 
        req.body.apiKEY, 
        hashedPassword
      ]
    )
    console.log(insert_query);
    db.connect(function(err) {
      if (err) return next(err);
      console.log("Connected!");
      db.query (insert_query, [ req.body.username, req.body.email, req.body.ign, req.body.api, hashedPassword,],
        (err, res) => {
          if(err) return next(err);
          else {
            console.log('USER ADDED', res)
            return next();
          } 
        })
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