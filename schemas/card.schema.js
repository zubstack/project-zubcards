const Joi = require('joi');

const id = Joi.number();
const question = Joi.string().max(25);
const answer = Joi.string().max(100);
const deck_id = Joi.number();
const domain = Joi.number().max(3).min(0);

const createCardSchema = Joi.object({
  question: question.required(),
  answer: answer.required(),
  deck_id: deck_id.required(),
});

const updateCardSchema = Joi.object({
  question: question,
  answer: answer,
  domain: domain,
});

const getCardSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCardSchema, getCardSchema, updateCardSchema };
