const { buildSchema } =require('graphql')

// the ! makes the return to required i.e it must return that  
module.exports= buildSchema(`#graphql

type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
}

input UserInputData {
    email: String!
    name: String!
    password: String!
}

type RootQuery {
    hello: String
}

type RootMutation {
    createUser(userInput: UserInputData): User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)
