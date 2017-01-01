process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('TimeStamp', () => {
  /*
   * Test the /GET route
   */
  describe('Home Page', () => {
    it('should return a ', () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.length.should.be.eql(0);
        });
    });
  });

  describe('API call with string', () => {
    it('should return an object', () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.length.should.be.eql(0);
        });
    });

    it(`should check to see whether that string contains
    either a unix timestamp or a natural language date`, () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.length.should.be.eql(0);
        });
    });

    it(`should return both the Unix timestamp 
    and the natural language form of that date`, () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.length.should.be.eql(0);
        });
    });

    it(`should return null for each properties, 
    If it does not contain a date or Unix timestamp`, () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.length.should.be.eql(0);
        });
    });
  });

});
