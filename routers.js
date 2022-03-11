const express = require("express");
const database = require("./database");

require('dotenv').config();
let router = express.Router();

const { auth, requiresAuth } = require('express-openid-connect');
const { connection } = require("./database");

router.use(
  auth({
    //auth0_domain: 'dev-8xccpmo6.us.auth0.com',
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

/*
router.get('/', (request, response) => {
    response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  });
  
  router.get('/profile', requiresAuth(), (request, response) => {
      response.send(JSON.stringify(request.oidc.user));
  });
*/

  router.get("/Workprofile/all", (request, response) => {
    connection.query("SELECT * FROM Workprofile", (errors, results) => {
        if (errors) {
            console.log(errors);
            response.status(500).send("Something went wrong...");
        } else {
            response.status(200).send(results);
        }
    });
});

router.get("/Userprofile/all", (request, response) => {
  connection.query("SELECT * FROM Userprofile", (errors, results) => {
      if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
      } else {
          response.status(200).send(results);
      }
  });
});

router.get("/Userprofile/byId", (request, response) => {
  connection.query(`SELECT * FROM Userprofile WHERE user_id=${request.query.user_id}`, 
    (errors, results) => {
      if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
      } else {
        if (results.length == 0) {
            response.status(404).send("user not found");
        } else {
            response.status(200).send(results);
        }
      }
  });
});


// can't do this. didn't do form. End point from postman works.
/*
router.post("/Userprofile/add", (request, response) => {
   connection.query(
      `INSERT INTO Userprofile (first_name, last_name,
        email, work_profile_id, monthly_income, 
        risk_appetite, retire_by,
        answer1, answer2, answer3, answer4) 
      values ("${request.body.first_name}", 
      "${request.body.last_name}", 
      "${request.body.email}",
      "${request.body.work_profile_id}",
      "${request.body.monthly_income}",
      "${request.body.risk_appetite}",
      "${request.body.retire_by}",
      "${request.body.answer1}",
      "${request.body.answer2}",
      "${request.body.answer3}",
      "${request.body.answer4}"
      )`,
      (errors,results)=>{
        if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
        } else {
          response.status(200).send("User added to the database!");
        }
      }
    );

});
*/
/*
router.get("/Userprofile/searchbyid", (request, response) => {
  connection.query(
      `SELECT * FROM Userprofile WHERE user_id=${request.query.user_id}`, 
      (errors,results)=>{
        if (errors) {
          console.log(errors);
          response.status(500).send("Something went wrong...");
        } else {
          response.status(200).send("User found!");
        }
      }
    );

});
*/


module.exports = { router };
  



