import request from 'supertest';
import { expect } from 'chai';
import app from '../../app'; // Adjust the import based on your app's structure

describe('Integration Tests for Academic Paper Submission API', () => {
  let token;

  before(async () => {
    // Register a user to obtain a token
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        role: 'teacher'
      });
    expect(res.status).to.equal(201);
    
    // Login to get the token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
    expect(loginRes.status).to.equal(200);
    token = loginRes.body.token;
  });

  it('should create a new paper submission', async () => {
    const res = await request(app)
      .post('/api/papers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Paper',
        abstract: 'This is a test abstract.',
        authors: ['testuser'],
        keywords: ['test', 'paper']
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Paper submitted successfully');
  });

  it('should retrieve all paper submissions', async () => {
    const res = await request(app)
      .get('/api/papers')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should not create a paper submission without token', async () => {
    const res = await request(app)
      .post('/api/papers')
      .send({
        title: 'Test Paper',
        abstract: 'This is a test abstract.',
        authors: ['testuser'],
        keywords: ['test', 'paper']
      });
    
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'No token provided');
  });

  it('should not create a paper submission with invalid token', async () => {
    const res = await request(app)
      .post('/api/papers')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        title: 'Test Paper',
        abstract: 'This is a test abstract.',
        authors: ['testuser'],
        keywords: ['test', 'paper']
      });
    
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('error', 'Invalid token');
  });
});