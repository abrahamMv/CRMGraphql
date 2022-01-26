const {gql} = require("apollo-server") 

const UserSchema = gql`
    type User {
        id:ID
        name: String
        lastName:String
        email:String
        created:String
    }
    type topSeller{
        total:Float
        seller:[User]
    }

    type Token {
        token:String
    }

    input UserInput {
        name:String!
        lastName:String!
        email:String!
        password:String!
    }
    input AuthInput {
        email:String!
        password:String!
    }
    type Query {
        getUser: User
        bestSeller:[topSeller]
    }

    type Mutation {
        newUser(input:UserInput ): User
        AuthUser(input:AuthInput):Token
    }

`

module.exports = UserSchema