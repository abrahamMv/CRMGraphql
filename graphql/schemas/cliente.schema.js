const {gql} = require("apollo-server");

const clienteShema = gql`
    type Cliente {
        id:ID
        name:String
        lastName:String
        business:String
        email:String
        phone:String
        seller:ID
    }

    type TopCliente{
        total: Float
        cliente:[Cliente]
    }

    input ClienteInput{
        name:String!
        lastName:String!
        business:String!
        email:String!
        phone:String!
    }

    type Query{
        getClientes: [Cliente]
        getClientesbySeller: [Cliente]
        getCliente(id:ID!): Cliente
        bestCliente:[TopCliente]
    }

    type Mutation{
        newCliente(input:ClienteInput):Cliente
        updateCliente(id:ID!,input:ClienteInput):Cliente
        deleteCliente(id:ID!): String
    }
`

module.exports = clienteShema