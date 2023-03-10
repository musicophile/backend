const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ObjectId } = mongoose.Types;
// require database connection
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const Task = require("./db/taskModel");
const Invite = require("./db/inviteModel");
const auth = require("./auth");

// execute database connection
dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        name: request.body.name,
        mobile: request.body.mobile,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

//task endpoint
app.post("/registertTask", (request, response) => {
  
 
      // create a new task instance and collect the data
      const task = new Task({
        taskname: request.body.taskname,
        description: request.body.description,
        priority: request.body.priority,
        status: "Incomplete",
        id: request.body.id,
        email: request.body.email,
      });

      // save the new task
      task
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "Task Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating Task",
            error,
          });
        });
    
    
});


//task endpoint
app.post("/updateTask", (request, response) => {
  

  
 
  // save the new task
  Task
    .updateOne({"id":request.body.taskId, "email":request.body.taskemail}, {"description": request.body.taskDescription})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task Updated Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

app.post("/updateTaskStatus", (request, response) => {
  

  
 
  // save the new task
  Task
    .updateOne({"id":request.body.taskId, "email":request.body.taskemail}, {"status": request.body.newstatus})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task Updated Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

app.post("/editTask", (request, response) => {
  

  
 
  // save the new task
  Task
    .updateOne({"id":request.body.taskId, "email":request.body.taskemail}, {"description": request.body.description,
    "taskname":request.body.taskname, "status":request.body.status,"priority":request.body.priority})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task Updated Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

//invite endpoint
app.post("/invite", (request, response) => {
  




  // create a new task instance and collect the data
  const invite = new Invite({
    taskId: request.body.taskId,
    c_email: request.body.c_email,
    email: request.body.email,
    id: request.body.id,
    taskname: request.body.taskname,
  });

  // save the new task
  invite
    .save()
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Collaborator Created Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});


//fetch task endpoint
app.post("/fetchTask", ( request, response) => {
  
 

  
  Task
    .find({"email":request.body.email})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task fetched Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

//fetch task endpoint
app.post("/fetchTaskBysearch", ( request, response) => {
  
 

  
  Task
    .find({"email":request.body.email, taskname: "/"+request.body.search+"/i"})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task fetched Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

app.post("/fetchInviteTaskBysearch", ( request, response) => {
  
 

  
  Invite
    .find({"email":request.body.email, taskname: "/"+request.body.search+"/i"})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Invite fetched Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

app.post("/fetchInviteTask", ( request, response) => {
  
 

  
  Invite
    .find({"email":request.body.email})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Invite fetched Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
      });
    });


});

//fetch task endpoint
app.post("/fetchTaskById", ( request, response) => {
  
 
  // // create a new task instance and collect the data
  // const task = new Task({
  //   taskname: request.body.taskname,
  //   description: request.body.description,
  //   priority: request.body.priority,
  // });

  // save the new task
 Task
    .find({"id":request.body.taskId, "email":request.body.taskemail})
    // return success if the new user is added to the database successfully
    .then((result) => {
      response.status(201).send({
        message: "Task fetched Successfully",
        result,
      });
    })
    // catch erroe if the new user wasn't added successfully to the database
    .catch((error) => {
      response.status(500).send({
        message: "Error creating Task",
        error,
        request,
      });
    });


});


// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {

          // check if password matches
          if(!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
            name : user.name,

          });
        })
        // catch error if password do not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
