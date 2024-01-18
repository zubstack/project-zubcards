const supertest = require('supertest');
const app = require('../app');
const { syncAndSeed } = require('./helper');

const api = supertest(app);
const url = '/api/v1/decks';

const model = {
  topic: 'fruits',
};

const modelUpdate = {
  topic: 'ultis',
};

const badModel = {
  topik: 'relationships',
};

let seed;
beforeAll(async () => (seed = await syncAndSeed()));
describe('Decks: Getters', () => {
  test('Decks are returned as json', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are one Deck', async () => {
    const response = await api.get(url);
    expect(response.body).toHaveLength(1);
  });

  test('decks has learn, new and due properties', async () => {
    const { body } = await api.get(url);
    body.forEach((element) => {
      expect(element.new).toBeDefined();
      expect(element.learn).toBeDefined();
      expect(element.due).toBeDefined();
    });
  });

  test('get an specific Deck', async () => {
    const id = seed.decks.ultimates.id;
    const { body } = await api.get(`${url}/${id}`);
    expect(body.deck.topic).toBe('ultimates');
  });

  test('get an specific Deck including their cards', async () => {
    const id = seed.decks.ultimates.id;
    const { body } = await api.get(`${url}/cards/${id}`);
    const { cards } = body;
    const questions = cards.map((card) => card.question);
    expect(questions).toContain('Mordekaiser');
  });
});
describe('Decks: Setters', () => {
  test('update a Deck', async () => {
    const id = 1;
    await api.patch(`${url}/${id}`).send(modelUpdate).expect(201);
    const { body } = await api.get(`${url}/${id}`);
    expect(body.deck.topic).toBe('ultis');
  });
  test('post a Deck', async () => {
    await api.post(url).send(model).expect(201);
    const response = await api.get(url);
    expect(response.body).toHaveLength(2);
  });
  test('post a new Card inside the new Deck', async () => {
    const { body: currentDecks } = await api.get(url);
    const indexFruits = currentDecks.findIndex(
      (deck) => deck.topic === 'fruits',
    );
    await api
      .post('/api/v1/cards')
      .send({
        question: 'mango',
        answer: 'yellow',
        deck_id: currentDecks[indexFruits].id,
      })
      .expect(201);
    const { body: currentCards } = await api.get('/api/v1/cards');
    const newCard = currentCards.find(
      (card) => card.deck_id === currentDecks[indexFruits].id,
    );
    expect(newCard.question).toBe('mango');
  });
  test('delete one Deck', async () => {
    const { body: currentDecks } = await api.get(url);
    const currenLen = currentDecks.length;
    const id = currentDecks[currenLen - 1].id;
    await api.delete(`${url}/${id}`);
    const { body: endDecks } = await api.get(url);
    expect(endDecks).toHaveLength(currenLen - 1);
  });
  test('fails with 404 with a non exsting id', async () => {
    const non_existing_id = 999;
    await api.get(`${url}/${non_existing_id}`).expect(404);
    await api.delete(`${url}/${non_existing_id}`).expect(404);
    await api.patch(`${url}/${non_existing_id}`).send(model).expect(404);
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
