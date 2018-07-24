process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../server");

const configuration = require("../knexfile")["test"];
const knex = require("knex")(configuration);

chai.use(chaiHttp);

describe("Client routes", () => {

});

describe("API Routes", () => {

  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              });
          });
      }).catch(error => {
      throw error;
    });
  });

});