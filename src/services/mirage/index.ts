import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}) // Partial representa que nem todos os campos são obrigatórios, ou seja, recebem dados parciais
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10); // O número representa quantos dias atrás teve uma última atualizaçaõ
        },
      })
    },

    seeds(server) {
      server.createList('user', 10); // O número representa a quantidade de registros que vão ser gerados automaticamente
    },
    
    routes() {
      this.namespace = 'api'; // Definindo namespace
      this.timing = 750; // Aplicando um delay na requisição

      this.get('/users');
      this.post('/users');

      this.namespace = ''; // Resetando namespace para evitar conflito com next.js
      this.passthrough(); // Faz com que uma chamada a api passe adiante caso não tenha a rota no miragejs
    }
  });

  return server;
}