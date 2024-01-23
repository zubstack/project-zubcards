const supertest = require('supertest');
const app = require('../app');
const { syncAndSeed } = require('./helper');

const api = supertest(app);
const url = '/api/v1/cards';

const model = {
  question: 'Jhin',
  answer: 'Curtain Call',
  deck_id: 1,
};

const modelUpdate = {
  question: 'Yasuo',
  answer: 'Last Breath',
  domain: 2,
};

const badModel = {
  queston: 'Julio Cesar',
};

let seed;
beforeAll(async () => (seed = await syncAndSeed()));
describe('Cards: Getters', () => {
  test('cards are returned as json', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two cards', async () => {
    const response = await api.get(url);
    expect(response.body).toHaveLength(2);
  });

  test('get an specific card', async () => {
    const id = seed.cards.foo.id;
    const { body } = await api.get(`${url}/${id}`);
    expect(body.card.question).toBe('Mordekaiser');
  });
});
describe('Cards: Setters', () => {
  test('update a card', async () => {
    const id = 1;
    await api.patch(`${url}/${id}`).send(modelUpdate).expect(201);

    const { body } = await api.get(`${url}/${id}`);
    expect(body.card.question).toBe('Yasuo');
  });

  test('post a card', async () => {
    await api.post(url).send(model).expect(201);
    const response = await api.get(url);
    expect(response.body).toHaveLength(3);
  });

  test('delete one card', async () => {
    const { body: currentCards } = await api.get(url);
    const currenLen = currentCards.length;
    const id = currentCards[currenLen - 1].id;
    await api.delete(`${url}/${id}`);
    const { body: endCards } = await api.get(url);
    expect(endCards).toHaveLength(currenLen - 1);
  });

  test('fails with 404 with a non exsting id', async () => {
    const non_existing_id = 999;
    await api.get(`${url}/${non_existing_id}`).expect(404);
    await api.delete(`${url}/${non_existing_id}`).expect(404);
    await api.patch(`${url}/${non_existing_id}`).send(modelUpdate).expect(404);
  });

  test('fails with 400 with no content', async () => {
    const id = 1;
    await api.patch(`${url}/${id}`).expect(400);
    await api.post(url).expect(400);
  });

  test('fails with 400 with bad model', async () => {
    const id = 1;
    await api.patch(`${url}/${id}`).send(badModel).expect(400);
    await api.post(url).send(badModel).expect(400);
  });
});
