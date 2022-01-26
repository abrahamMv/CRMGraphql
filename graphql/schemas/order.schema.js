const {gql} = require("apollo-server")

const OrderSchema = gql`

type Cliente {
        id:ID
        name:String
        lastName:String
        business:String
        email:String
        phone:String
        seller:ID
    }

    type Order{
        id:ID
        order: [orderGroup]
        total:Float
        cliente:Cliente
        seller:ID
        created:String
        state: stateOrder
    }
   type orderGroup{
        id:ID
        cantidad:Int 
        name:String,
        price:Float
    }

    input orderProduct{
        id:ID
        cantidad:Int 
        name:String,
        price:Float
    }

    input orderInput{
        order: [orderProduct]
        total: Float
        cliente: ID
        state: stateOrder
    }

    enum stateOrder{
        PENDIENTE
        COMPLETADO
        CANCELADO
    }


    type Query{
        getOrders: [Order]
        getOrderBySeller:[Order]
        getOrderById(id:ID!): Order
        getOrderByState(state:String!): [Order]
    }
    type Mutation{
       newOrder(input:orderInput ): Order
       updateOrder(id:ID!, input:orderInput): Order
       deleteOrder(id:ID!) :String
    }
`
module.exports = OrderSchema
  