var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./data/schema');

var fakeDatabase = {Person: {
  id: 1,
  firstName: "Johny",
  lastName: "Boy",
  age: 16,
  married: false
}};


// The root provides a resolver function for each API endpoint
var root = {
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: () => {
   return fakeDatabase.message;
  }

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
