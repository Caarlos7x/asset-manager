import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../server.js';

dotenv.config();

// Conectar ao MongoDB de testes
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Limpar o banco após cada teste
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

// Fechar conexão após os testes
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testando rotas de pets', () => {
  it('Deve criar um novo pet', async () => {
    const res = await request(app)
      .post('/api/pets')
      .send({
        name: 'Rex',
        species: 'Cachorro',
        age: 3,
        owner: 'Carlos'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('Deve buscar todos os pets', async () => {
    const res = await request(app).get('/api/pets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});