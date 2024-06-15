const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
const generateRandomUsername = require('./sampleData');

describe('Authentication Endpoints', () => {
  let token;
  let refreshToken;

  const user = {
    username: generateRandomUsername(),
    password: 'test_password',
  };

  it('should register a new user', done => {
    request(app)
      .post('/auth/register')
      .send(user)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('should log in an existing user', done => {
    request(app)
      .post('/auth/login')
      .send(user)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('user');
        token = res.body.token;
        refreshToken = res.body.refreshToken;
        done();
      });
  });

  it('should refresh the access token', done => {
    request(app)
      .post('/auth/refresh/token')
      .set('Cookie', [`token=${token}`, `token.refresh=${refreshToken}`])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('result', 'Success');
        done();
      });
  });
});

describe('Social Authentication Endpoints', () => {
  it('should initiate Google OAuth authentication', done => {
    request(app)
      .get('/auth/google')
      .expect(302) // Expect a redirect to Google
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header.location).to.include('accounts.google.com');
        done();
      });
  });

  it('should initiate Facebook OAuth authentication', done => {
    request(app)
      .get('/auth/facebook')
      .expect(302) // Expect a redirect to Facebook
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header.location).to.include('facebook.com');
        done();
      });
  });
});
