/**
 * Created by michal.svancar on 08.06.2017.
 */

export const typeDefs = `
    type Author {
        id: Int
        firstName: String
        lastName: String
        email: String
        posts: [Post]
    }
    type Post {
        id: Int
        title: String
        content: String
        author: Author
    }
    type Query {
        author(id: Int): Author
        authors: [Author]
    }
    type Mutation {
        createAuthor(
            firstName: String!
            lastName: String!
            email: String!
        ): Author,
        updateAuthor(
            id: Int!
            firstName: String
            lastName: String
            email: String
        ): Author,
         deleteAuthor(
            id: Int!
        ): Author
    }
`;
