import { expect } from 'chai';
import sinon from 'sinon';
import paperController from '../../controllers/paper.controller';
import paperService from '../../services/paper.service';

describe('Paper Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: 'Test Paper',
        abstract: 'This is a test abstract.',
        authors: ['testuser'],
        keywords: ['test', 'paper']
      },
      params: {
        id: '1'
      },
      user: {
        role: 'teacher'
      }
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
    const createStub = sinon.stub(paperService, 'createPaper').resolves({ message: 'Paper submitted successfully' });

    await paperController.createPaper(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ message: 'Paper submitted successfully' })).to.be.true;
    expect(createStub.calledOnce).to.be.true;
  });

  it('should retrieve a paper submission', async () => {
    const paper = { id: '1', title: 'Test Paper' };
    const findStub = sinon.stub(paperService, 'getPaperById').resolves(paper);

    await paperController.getPaper(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(paper)).to.be.true;
    expect(findStub.calledOnce).to.be.true;
  });

  it('should return 404 if paper not found', async () => {
    const findStub = sinon.stub(paperService, 'getPaperById').resolves(null);

    await paperController.getPaper(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith('Paper not found')).to.be.true;
    expect(findStub.calledOnce).to.be.true;
  });

  it('should delete a paper submission', async () => {
    const deleteStub = sinon.stub(paperService, 'deletePaper').resolves({ message: 'Paper deleted successfully' });

    await paperController.deletePaper(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Paper deleted successfully' })).to.be.true;
    expect(deleteStub.calledOnce).to.be.true;
  });

  it('should return 404 if trying to delete a non-existent paper', async () => {
    const deleteStub = sinon.stub(paperService, 'deletePaper').resolves(null);

    await paperController.deletePaper(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.calledWith('Paper not found')).to.be.true;
    expect(deleteStub.calledOnce).to.be.true;
  });
});