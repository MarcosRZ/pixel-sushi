import express from 'express';
import graphqlMiddleware from './middleware/graphql';
import db from './db';

const PORT = 3000;

db.start();

const app = express();
graphqlMiddleware(app);

// bodyParser is needed just for POST.
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else console.log(`API listening at localhost:${PORT}`);
});
