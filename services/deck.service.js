const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Deck } = models;

function formatDate(date) {
  function zeroPad(d) {
    return ('0' + d).slice(-2);
  }
  let parsed = new Date(date);
  return [
    parsed.getUTCFullYear(),
    '-',
    zeroPad(parsed.getMonth() + 1),
    '-',
    zeroPad(parsed.getDate()),
  ].join('');
}

class DeckService {
  constructor() {}
  async find() {
    const data = await Deck.findAll({
      include: 'cards',
      order: [['createdAt', 'DESC']],
    });
    const decks = data.map((deck) => deck.get({ plain: true }));

    decks.forEach((element) => {
      element.new = 0;
      element.learn = 0;
      element.due = 0;
      element.cards.forEach((card) => {
        if (card.domain === 1) {
          element.new += 1;
        } else if (card.domain === 2) {
          element.learn += 1;
        } else if (card.domain === 3) {
          element.due += 1;
        }
      });
      delete element.cards;
    });
    return decks;
  }
  async getCards(id) {
    const data = await Deck.findOne({
      where: { id: id },
      include: 'cards',
      order: [['cards', 'createdAt', 'DESC']],
    });
    if (!data) {
      throw boom.notFound('This deck does not exist');
    }

    const searchedDeck = data.get({ plain: true });
    searchedDeck.cards.map((card) => {
      card.createdAt = formatDate(card.createdAt);
      card.updatedAt = formatDate(card.updatedAt);
    });
    return data;
  }
  async findById(id) {
    const data = await Deck.findByPk(id);
    if (!data) {
      throw boom.notFound('This deck does not exist');
    }
    return data;
  }
  async create(body) {
    if (!Object.keys(body).length) {
      throw boom.badRequest('Missing data');
    }
    await Deck.create(body);
    return body;
  }
  async destroy(id) {
    const item = await this.findById(id);
    await item.destroy({ force: true });
    return;
  }
  async update(id, body) {
    if (!Object.keys(body).length) {
      throw boom.badRequest('Missing data');
    }
    const [response] = await Deck.update(body, {
      where: {
        id: id,
      },
    });
    if (!response) {
      throw boom.notFound('This Deck does not exist');
    }
    return;
  }
}

module.exports = DeckService;
