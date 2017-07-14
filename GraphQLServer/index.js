import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import cors from 'cors';


// 2 Ways of using Schema:
// 1) With  import schema from './schema/schema';
// 2) Creating type Definitions and Resolvers, then makeExecutableSchema

import {typeDefs} from './schema/typeDefs';
import {resolvers} from './schema/resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();
const port = 3000;

// CORS for development
app.use(cors());

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));


app.listen(port);
console.log('Running a GraphQL API server at localhost:' + port + '/graphql');
