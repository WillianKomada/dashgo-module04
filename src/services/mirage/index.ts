import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },
    
    routes() {
      this.namespace = 'api'; // Definindo namespace
      this.timing = 750;

      this.get('/users');
      this.post('/users');

      this.namespace = ''; // Resetando namespace para evitar conflito com next.js
      this.passthrough(); // Faz com que uma chamada a api passe adiante caso não tenha a rota no miragejs
    }
  });

  return server;
}