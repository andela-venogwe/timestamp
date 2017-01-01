process.env.NODE_ENV = 'test';
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('TimeStamp', () => {
  /*
   * Test the /GET route
   */
  describe('Home Page', () => {
    it('should return a json message ', () => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.json;
          res.body.should.be.eql({ "message": "welcome to our time stamp api" });
        });
    });
  });

  describe('API call with string', () => {
    it('should return an json object', () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.json.should.be.json;
          res.body.should.be.eql({ unix: null, natural: null });
        });
      chai.request(app)
        .get('/December%2015,%202015')
        .end((err, res) => {
          res.should.have.status(200);
          res.json.should.be.json;
          res.body.should.be.eql({ "unix": 1450137600, "natural": "December 15, 2015" });
        });
      chai.request(app)
        .get('/1450137600')
        .end((err, res) => {
          res.should.have.status(200);
          res.json.should.be.json;
          res.body.should.be.eql({ "unix": 1450137600, "natural": "December 15, 2015" });
        });
    });

    it(`should check to see whether that string contains
    either a unix timestamp or a natural language date`, () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.unix.should.be.eql(null);
          res.body.natural.should.be.eql(null);
        });
      chai.request(app)
        .get('/December%2015,%202015')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.unix.should.be.eql(1450137600);
          res.body.natural.should.be.eql("December 15, 2015");
        });
      chai.request(app)
        .get('/1450137600')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.unix.should.be.eql(1450137600);
          res.body.natural.should.be.eql("December 15, 2015");
        });
    });

    it(`should return both the Unix timestamp 
    and the natural language form of that date`, () => {
      chai.request(app)
        .get('/1450137600')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          Object.keys(res.body).should.be.eql(['unix', 'natural']);
          res.body.unix.should.be.eql(1450137600);
          res.body.natural.should.be.eql("December 15, 2015");
        });
    });

    it(`should return null for each properties, 
    If it does not contain a date or Unix timestamp`, () => {
      chai.request(app)
        .get('/hello world')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.unix.should.be.eql(null);
          res.body.natural.should.be.eql(null);
        });
    });
  });

});
