
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const configuration = require('../knexfile')['test'];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client routes', () => {

  it('should return status 200', done => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('should return 404 with bad url', done => {
    chai.request(server)
      .get('/api/v1/badpath')
      .end((err, response) => {
        response.should.have.status(404);
      });
    done();
  });
});

describe('API Routes', () => {

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

  describe("should get all the collections", () => {
    it("should return all the collections from the collection table ", done => {
      chai.request(server)
        .get('/api/v1/collections')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a("array");
          response.body[0].should.be.a("object");
          response.body[0].should.have.property("title");
          response.body[0].title.should.be.a("string");
          response.body[0].should.have.property("artist");
          response.body[0].artist.should.be.a("string");
          response.body[0].should.have.property("year");
          response.body[0].year.should.be.a("string");
          response.body[0].should.have.property("category");
          response.body[0].category.should.be.a("string");
          response.body[0].should.have.property("page_link");
          response.body[0].page_link.should.be.a("string");
          response.body[0].should.have.property("image_link");
          response.body[0].image_link.should.be.a("string");
          done();
        })
    });
  });

  describe('GET /api/v1/comments', () => {
    it('should return all the comment entries in the post table', done => {
      chai.request(server)
        .get('/api/v1/comments')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('artwork_id');
          response.body[0].artwork_id.should.equal(1);
          response.body[0].should.have.property('comment');
          response.body[0].comment.should.equal('That\'s a glass!')
          done();
        });
    })
  });

  describe('POST /api/v1/comments', () => {
    it('should add comment to posts table and return message', done => {
      chai.request(server)
        .post('/api/v1/comments')
        .send({
          'artwork_id': 2,
          'author_id': 1,
          'comment': 'Beautiful!'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property('message');
          response.body.message.should.equal('Comment was added to art with id: 2');
          done();
        });
    });

    it('should return error message with invalid request body', done => {
      chai.request(server)
        .post('/api/v1/comments')
        .send({
          'comment': 'Beautiful!'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.have.property('error');
          response.body.error.should.equal('Expected format {artwork_id: <Integer>,comment: <String>,author_id: <Integer>}. You\'re missing a "artwork_id" property.')
          done();
        });
    });
  });
});
