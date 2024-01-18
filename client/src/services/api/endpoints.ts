const API_URL = "http://localhost:4000/api/v1/";

const endpoints = {
  getDecks: `${API_URL}/decks`,
  createDeck: `${API_URL}/decks`,
  deleteDeck: (id) => `${API_URL}/decks/${id}`,
};

export default endpoints;
