const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const socket = require("socket.io");
const path = require("path");

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.set("port", process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (request, response) => {
  response.send("hello");
});

app.get("/api/v1/collections", (request, response) => {
  database("collection").select()
    .then((collection) => {
      response.status(200).json(collection);
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

server = app.listen(app.get("port"), () => {
  console.log(`Running on ${app.get("port")}.`);
});

io = socket(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("SEND_COMMENT", (data) => {
    io.emit("RECEIVE_MESSAGES", data);
  });

  socket.on("disconnect", () => {
    console.log("user has disconnected", socket.id);
  });
});

module.exports = server;