const jsonServer = require('json-server');
const fetch = require('node-fetch');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route to fetch data from external API and save it to server
server.post('/users/fetch', async (req, res) => {
  try {
    const response = await fetch('https://randomuser.me/api?results=20');
    const data = await response.json();
    const users = data.results || [];

    router.db.setState({ users });
    router.db.write();

    res.json({ success: true });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Custom route for handling adding new users
server.post('/users', (req, res) => {
  const newUser = req.body;

  router.db.read()
    .then((data) => {
      const users = data.users || [];
      const userId = users.length + 1;
      const user = { id: userId, ...newUser };
      users.push(user);

      router.db.setState({ users });
      router.db.write()
        .then(() => {
          res.json(user);
        })
        .catch(() => {
          res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(() => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Use the JSON Server router middleware
server.use(router);

// Start the server
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
