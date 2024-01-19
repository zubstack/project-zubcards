const API_URL = "http://localhost:4000/api/v1/";

const endpoints = {
  getDecks: `${API_URL}/decks`,
  createDeck: `${API_URL}/decks`,
  deleteDeck: (id) => `${API_URL}/decks/${id}`,
  updateDeck: (id) => `${API_URL}/decks/${id}`,
  getCardsFromDeck: (id) => `${API_URL}/decks/cards/${id}`,
  createCard: `${API_URL}/cards`,
};

export default endpoints;
