import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../graphql/schemas/typeDefs';
import resolvers from '../graphql/resolvers';
import { GRAPHQL_ENDPOINT, GRAPHIQL_ENDPOINT } from '../config';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default (app) => {
  app.use(bodyParser.json({ limit: '1000mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(auth);
  // app.use(session);
  // app.use(cors(corsOptions));
  // app.use(
  //   apolloUploadExpress({
  //     uploadDir: constants.tmpPath,
  //   }),
  // );
  app.use(
    GRAPHIQL_ENDPOINT,
    graphiqlExpress({
      endpointURL: GRAPHQL_ENDPOINT,
    }),
  );
  app.use(
    GRAPHQL_ENDPOINT,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user,
        sessionId: req.sessionId,
        ip: req.ip,
      },
    })),
  );
};
