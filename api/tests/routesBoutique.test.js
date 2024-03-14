const { TestServer } = require('supertest'); // Import TestServer from supertest

const app = require('../server.js'); // Your application

const username = "leolchalot";
const mockResponse = {
  statusCode: 200,
  body: JSON.stringify({
    success: true,
    message: "Contenu du panier",
    infos: {
      panier: {
        id_panier: "6b425798-348c-49f0-aac8-b00d076fcc8e",
        pseudo: "leolchalot",
        articles: [],
      },
    },
  }),
};

describe('Test Routes /panier', () => {

  it('Récupération du panier', async () => {

    const server = new TestServer(app); // Create a TestServer instance

    const mockHandler = (req, res) => {
      res.status(200).send(mockResponse.body);
    };

    const res = await request(server) // Use request on the TestServer
      .get(`/m2l/panier/${username}`)
      .use(mockHandler);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockResponse.body);

    server.close(); // Close the TestServer after the test
  });
});