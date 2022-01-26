const {gql} = require("apollo-server")

const productSchema = gql`
    type Product {
        id:ID
        name:String
        existence:Int
        price:Float
        created: String
    }

    input productInput {
        name:String!
        existence:Int!
        price:Float!
    }

    type Query {
        getProducts: [Product]
        getProduct(id:ID!) :Product
        findProduct(text:String!): [Product]
    }

    type Mutation {
        newProduct(input:productInput): Product
        updateProduct(id:ID!, input: productInput): Product
        deleteProduct(id:ID!): String
    }


`

module.exports = productSchema