# Zubcards project

## API DOCS

Main url: **http://localhost:4000/api/v1**

### Decks

Request:

```bash
GET /decks
```

Response:

```json
[
  {
    "id": 1,
    "topic": "ultimates",
    "createdAt": "2024-01-18T10:43:22.802Z",
    "updatedAt": "2024-01-18T10:43:22.802Z",
    "new": 3,
    "learn": 0,
    "due": 0
  }
]
```

Request:

```bash
GET /decks/:id
```

Response:

```json
  {
    "id": :id,
    "topic": "ultimates",
    "createdAt": "2024-01-18T10:43:22.802Z",
    "updatedAt": "2024-01-18T10:43:22.802Z",

  }
```

Request:

```bash
GET /decks/cards/:id
```

Response:

```json
{
  "deck": {
    "id": :id,
    "topic": "ultimates"
  },
  "cards": [
    {
      "id": 1,
      "question": "Mordekaiser",
      "answer": "Realm of Death",
      "domain": 1,
      "deck_id": :id,
      "createdAt": "2024-01-18T10:43:47.791Z",
      "updatedAt": "2024-01-18T10:43:47.791Z",
      "deckId": :id
    },
    {
      "id": 2,
      "question": "Garen",
      "answer": "Demacian Justice",
      "domain": 1,
      "deck_id": :id,
      "createdAt": "2024-01-18T10:44:16.022Z",
      "updatedAt": "2024-01-18T10:44:16.022Z",
      "deckId": :id
    },
    {
      "id": 3,
      "question": "Yasuo",
      "answer": "Last breath",
      "domain": 1,
      "deck_id": :id,
      "createdAt": "2024-01-18T10:44:32.259Z",
      "updatedAt": "2024-01-18T10:44:32.259Z",
      "deckId": :id
    }
  ]
}
```

Request:

```bash
POST /decks
Content-Type: application/json

{
  "topic": "fruits"
}
```

Response:

```json
{
  "message": "created"
}
```

Request:

```bash
DELETE  /decks/:Id
```

Response:

```json
{
  "message": "destroyed"
}
```

Request:

```bash
PATCH /decks/:id
Content-Type: application/json

{
  "topic": "fruits"
}
```

Response:

```json
{
  "message": "updated"
}
```

### Cards

Request:

```bash
GET /cards
```

Response:

```json
[
  {
    "id": 1,
    "question": "mango",
    "answer": "yellow",
    "domain": 1,
    "deck_id": 1,
    "createdAt": "2024-01-18T10:43:47.791Z",
    "updatedAt": "2024-01-18T10:43:47.791Z",
    "deckId": 1
  },
  {
    "id": 2,
    "question": "Mordekaiser",
    "answer": "Realm of Death",
    "domain": 2,
    "deck_id": 1,
    "createdAt": "2024-01-11T14:55:43.147Z",
    "updatedAt": "2024-01-11T14:55:43.147Z",
    "deckId": 2
  },
  {
    "id": 3,
    "question": "Garen",
    "answer": "Demacian Justice",
    "domain": 2,
    "deck_id": 2,
    "createdAt": "2024-01-18T10:44:16.022Z",
    "updatedAt": "2024-01-18T10:44:16.022Z",
    "deckId": 2
  },
  {
    "id": 4,
    "question": "Yasuo",
    "answer": "Last breath",
    "domain": 2,
    "deck_id": 3,
    "createdAt": "2024-01-18T10:44:32.259Z",
    "updatedAt": "2024-01-18T10:44:32.259Z",
    "deckId": 2
  }
]
```

Request:

```bash
GET /cards/:id
```

Response:

```json

{
  "card": {
    "id": :id,
    "question": "mango",
    "answer": "yellow",
    "domain": 1,
    "deck_id": 2,
    "createdAt": "2024-01-18T10:43:47.791Z",
    "updatedAt": "2024-01-18T10:43:47.791Z",
    "deckId": 2
  }
}

```

Request:

```bash
POST /cards
content-type: application/json

{
  "question": "Ezreal",
  "answer": "Trueshot Barrage",
  "deck_id":2
}
```

Response:

```json
{
  "message": "created"
}
```

Request:

```bash
DELETE /cards/:id
```

Response:

```json
{
  "message": "destroyed"
}
```

Request:

```bash
PATCH  /cards/:id
content-type: application/json

{
  "question": "Jhin",
  "answer": "Curtain Call"
}
```

Response:

```json
{
  "message": "updated"
}
```
