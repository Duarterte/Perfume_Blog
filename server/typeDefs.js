import { gql } from 'apollo-server-express';
export const typeDefs = gql`
    type Query {
        hello: String!
        getTest: [Test!]
        getBlogs: [Blog!]
        getPerfs: [Perfs!]
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
    }
    type Test {
        id : ID!
        testName: String!
        testBody: String!
    }
    type Mutation {
        createTest(testName: String!, testBody: String!): Test!
    }
`;