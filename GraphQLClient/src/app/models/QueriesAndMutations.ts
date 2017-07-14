import gql from "graphql-tag";

export const authorQuery = gql`
      query author($id: Int){
        author(id: $id){
          id
          firstName
          lastName
          email
        }
      }
  `;

export const authorsQuery = gql`
  query authors{
    authors{
      id
      firstName
      lastName
      email
    }
  }
`;

export const createAuthorMutation = gql`
  mutation createAuthor($firstName: String!, $lastName: String!, $email: String!){
    createAuthor(firstName: $firstName, lastName: $lastName, email: $email){
      id
      firstName
      lastName
      email
    }
  }
`;

export const updateAuthorMutation=gql`
  mutation updateAuthor($id: Int!, $firstName: String, $lastName: String, $email: String){
    updateAuthor(id: $id, firstName: $firstName, lastName: $lastName, email: $email){
      id
      firstName
      lastName
      email
    }
  }
`;

export const deleteAuthorMutation=gql`
  mutation deleteAuthor($id: Int!){
    deleteAuthor(id: $id){
      id
      firstName
      lastName
      email
    }
  }
`;

export const authorPostsQuery = gql`
  query author($id: Int){
    author(id: $id){
      firstName
      posts {
        id
        title
        content
        author {
          firstName
        }
      }
    }
  }
`;
