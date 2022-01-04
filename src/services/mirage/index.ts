import { createServer, Factory, Model, Response } from 'miragejs';
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
      server.createList('user', 200); // O número representa a quantidade de registros que vão ser gerados automaticamente
    },
    
    routes() {
      this.namespace = 'api'; // Definindo namespace
      this.timing = 750; // Aplicando um delay na requisição

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });
      this.get('/users/:id');
      this.post('/users');

      this.namespace = ''; // Resetando namespace para evitar conflito com next.js
      this.passthrough(); // Faz com que uma chamada a api passe adiante caso não tenha a rota no miragejs
    }
  });

  return server;
}