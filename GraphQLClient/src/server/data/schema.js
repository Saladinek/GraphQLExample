var {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const Person = new GraphQLObjectType({
  name: "Author",
  description: "This is a bloody Author",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(person){
          return person.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(person){
          return person.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(person){
          return person.lastName;
        }
      },
      age: {
        type: GraphQLInt,
        resolve(person){
          return person.age;
        }
      },
      married: {
        type: GraphQLBoolean,
        resolve(person){
          return person.married;
        }
      },
    }
  }
});

const Post = new GraphQLObjectType({
  name: "Post",
  description: "This is a focken post",
  fields: () => {
    return {
      id: {
        type: GraphQLID,
        resolve(post){
          return post.id;
        }
      },
      title: {
        type: GraphQLString,
        resolve(post){
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve(post){
          return post.content;
        }
      },
    }
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  description: "This is a root Query",
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        resolve(root, args){

        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query
});

export default Schema;
