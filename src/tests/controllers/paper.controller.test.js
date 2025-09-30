import { expect } from 'chai';
import sinon from 'sinon';
import * as paperController from '../../controllers/paper.controller.js';
import paperService from '../../services/paper.service.js';

describe('Paper Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: 'Test Paper',
        content: 'This is a test content.',
        author: '507f1f77bcf86cd799439011'
      },
      params: { id: '1' },
      user: { role: 'teacher' }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      send: sinon.stub()
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new paper submission', async () => {
    const fakePaper = { _id: '1', ...req.body };
    sinon.stub(paperService, 'createPaper').resolves(fakePaper);

    await paperController.createPaper(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Paper created successfully', paper: fakePaper })).to.be.true;
  });

  it('should list all papers', async () => {
    const fakePapers = [{ _id: '1', title: 'Paper 1' }, { _id: '2', title: 'Paper 2' }];
    sinon.stub(paperService, 'getAllPapers').resolves(fakePapers);

    await paperController.getPapers(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(fakePapers)).to.be.true;
  });

  it('should retrieve a paper submission', async () => {
    const fakePaper = { _id: '1', title: 'Test Paper', content: 'This is a test content.' };
    sinon.stub(paperService, 'getPaperById').resolves(fakePaper);

    await paperController.getPaperById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch(fakePaper)).to.be.true;
  });

  it('should return 404 if paper not found', async () => {
    sinon.stub(paperService, 'getPaperById').resolves(null);

    await paperController.getPaperById(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith('Paper not found')).to.be.true;
  });

  it('should update a paper submission', async () => {
    const updatedPaper = { _id: '1', title: 'Updated Title', content: 'Updated content.' };
    sinon.stub(paperService, 'updatePaper').resolves(updatedPaper);

    await paperController.updatePaper(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Paper updated successfully', paper: updatedPaper })).to.be.true;
  });

  it('should return 404 if trying to update a non-existent paper', async () => {
    sinon.stub(paperService, 'updatePaper').resolves(null);

    await paperController.updatePaper(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith('Paper not found')).to.be.true;
  });

  it('should delete a paper submission', async () => {
    const fakePaper = { _id: '1', title: 'Test Paper' };
    sinon.stub(paperService, 'deletePaper').resolves(fakePaper);

    await paperController.deletePaper(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Paper deleted successfully' })).to.be.true;
  });

  it('should return 404 if trying to delete a non-existent paper', async () => {
    sinon.stub(paperService, 'deletePaper').resolves(null);

    await paperController.deletePaper(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith('Paper not found')).to.be.true;
  });
});