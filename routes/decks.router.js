const express = require('express');
const DeckService = require('../services/deck.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getDeckSchema,
  createDeckSchema,
  updateDeckSchema,
} = require('../schemas/deck.schema');

const router = express.Router();
const service = new DeckService();

router.get('/', async (request, response) => {
  response.json(await service.find());
});

router.get(
  '/:id',
  validatorHandler(getDeckSchema, 'params'),
  async (request, response) => {
    const { id } = request.params;
    const searchedDeck = await service.findById(id);
    response.json({ deck: searchedDeck });
  },
);

router.get(
  '/cards/:id',
  validatorHandler(getDeckSchema, 'params'),
  async (request, response) => {
    const { id } = request.params;
    const searchedDeck = await service.getCards(id);

    response.json({
      deck: { id: searchedDeck.id, topic: searchedDeck.topic },
      cards: searchedDeck.cards,
    });
  },
);

router.post(
  '/',
  validatorHandler(createDeckSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    await service.create(body);
    response.status(201).json({ message: 'created' });
  },
);

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await service.destroy(id);
  response.status(201).json({
    message: 'destroyed',
  });
});

router.patch(
  '/:id',
  validatorHandler(getDeckSchema, 'params'),
  validatorHandler(updateDeckSchema, 'body'),
  async (request, response) => {
    const { body } = request;
    const { id } = request.params;
    await service.update(id, body);
    response.status(201).json({ message: 'updated' });
  },
);

module.exports = router;
