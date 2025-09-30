import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../../app.js';
import config from '../../config/config.js';

describe('Integration Tests for Academic Paper Submission API', function () {
  this.timeout(10000); // aumenta timeout para evitar falhas por lentidão

  before(async () => {
    await mongoose.connect(config.db.uri, config.db.options);
    await mongoose.connection.db.dropDatabase();
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  let createdPaperId;

  it('should create a new paper submission', async () => {
    const res = await request(app)
      .post('/api/papers')
      .send({
        title: 'Integration Test Paper',
        content: 'This is a test content for integration.',
        author: new mongoose.Types.ObjectId().toString()
      })
      .expect(201);

    expect(res.body).to.have.property('message', 'Paper created successfully');
    expect(res.body).to.have.property('paper');
    expect(res.body.paper).to.have.property('_id');

    createdPaperId = res.body.paper._id; // garante que não será undefined
  });

  it('should retrieve a paper submission', async () => {
    const res = await request(app)
      .get(`/api/papers/${createdPaperId}`)
      .expect(200);

    expect(res.body).to.have.property('_id', createdPaperId);
    expect(res.body).to.have.property('title', 'Integration Test Paper');
  });

  it('should update a paper submission', async () => {
    const res = await request(app)
      .put(`/api/papers/${createdPaperId}`)
      .send({
        title: 'Updated Title',
        content: 'Updated content.'
      })
      .expect(200);

    expect(res.body).to.have.property('message', 'Paper updated successfully');
    expect(res.body.paper).to.have.property('title', 'Updated Title');
  });

  it('should return 404 if paper not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await request(app).get(`/api/papers/${fakeId}`).expect(404);
  });

  it('should delete a paper submission', async () => {
    const res = await request(app)
      .delete(`/api/papers/${createdPaperId}`)
      .expect(200);

    expect(res.body).to.have.property('message', 'Paper deleted successfully');
  });

  it('should return 404 when deleting non-existent paper', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await request(app).delete(`/api/papers/${fakeId}`).expect(404);
  });
});