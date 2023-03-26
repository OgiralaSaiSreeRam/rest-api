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

type AuthData {
    token: String!
    userId: String!
}

type PostData {
    posts: [Post!]!
    totalPosts: Int!
}


input PostInputData {
    title: String!
    content: String!
    imageUrl: String!
}


input UserInputData {
    email: String!
    name: String!
    password: String!
}

type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts(page: Int): PostData!
}

type RootMutation {
    createUser(userInput: UserInputData): User!
    createPost(postInput: PostInputData): Post!
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`)
