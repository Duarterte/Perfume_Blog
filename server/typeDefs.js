import { gql } from 'apollo-server-express';
export const typeDefs = gql`
    type Query {
        getBlogs: [Blog!]
        getPerfs(categ:[String]): [Perfs!]
    }

    type Blog {
        id : ID! 
        blogTitle: String!
        blogBody: String!
    }

    type Perfs {
        id: ID!
        perfTitle: String!
        perfBody: String!
        calification: Float!
        categories: [String]!
    }
`;