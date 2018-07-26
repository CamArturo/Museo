const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const socket = require('socket.io');

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.set("port", process.env.PORT || 4000);

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request, response) => {
  response.send("hello");
});

// get all collections
app.get("/api/v1/collections", (request, response) => {
  database("collection").select()
    .then((collection) => {
      response.status(200).json(collection);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

// get specific collection
app.get("/api/v1/collections/:category", (request, response) => {
  const {category} = request.params;

  database("collection").where("category", category).select()
    .then((collection) => {
      if (collection.length) {
        response.status(200).json(collection);
      } else {
        response.status(404).json({
          error: `Could not find a collection with category name ${request.params.id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({error});
    });

});

app.get("/api/v1/art/:id", (request, response) => {
  const {id} = request.params;

  database("collection").where("id", id).select()
    .then(artPiece => {
      if (artPiece) {
        response.status(200).json(artPiece);
      } else {
        response.status(404).json({
          error: `Could not find art piece with category of id: ${id}`
        });
      }
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.get("/api/v1/comments", (request, response) => {
  database("posts").select()
    .then((comments) => {
      response.status(200).json(comments);
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.post("/api/v1/comments", (request, response) => {
  const {artwork_id} = request.body;

  for (let requiredParameter of ["artwork_id", "author_id", "comment"]) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format {artwork_id: <Integer>,comment: <String>,author_id: <Integer>}. You're missing a "${requiredParameter}" property.`
      });
    }
  }

  database("posts").insert(request.body)
    .then(item => {
      response.status(201).json({
        message: `Comment was added to art with id: ${artwork_id}`
      });
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.delete("/api/v1/comments/:id", (request, response) => {
  const {id} = request.params;

  database("posts").where("id", id).select()
    .then(post => {
      if (!post.length) {
        response.status(404).json({error: `Could not find post ${id}`})
      } else {
        database("posts").where("id", id).del()
          .then(() =>
            response.sendStatus(204)
          )
          .catch((error) => {
            response.status(500).json({error});
          });
      }
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.post("/api/v1/users/", (request, response) => {
  const {name, email} = request.body;

  for (let requiredParameter of ["name", "email"]) {
    if (!request.body[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format {name: <String>,email: <String>}. You're missing a "${requiredParameter}" property.`
      });
    }
  }

  database("users").insert(request.body)

    .then(user => {
      response.status(201).json({
        message: `User was added to users table with email: ${email} name: ${name}`
      });
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

app.delete("/api/v1/users/:id", (request, response) => {
  const {id} = request.params;

  database("users").where("id", id).select()
    .then(user => {
      if (!user.length) {
        response.status(404).json({error: `Could not find user with id: ${id}`})
      } else {
        database("users").where("id", id).del()
          .then(() =>
            response.sendStatus(204)
          )
          .catch((error) => {
            response.status(500).json({error});
          });
      }
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});



server = app.listen(app.get("port"), () => {
  console.log(`Running on ${app.get("port")}.`);
});

io = socket(server);

io.on('connection', (socket) => {
  console.log('user connected', socket.id)

  socket.on('SEND_COMMENT', (data) => {
    io.emit('RECEIVE_MESSAGES', data);
  });

  socket.on('disconnect', () => {
    console.log('user has disconnected', socket.id);
  });
});