const {mergeResolvers} = require("@graphql-tools/merge") 
const userResolver = require("./user.resolvers") 
const productResolver = require("./product.resolvers")
const ClienteResolver = require("./cliente.resolvers")
const OrderResolver = require("./order.resolvers")

module.exports = mergeResolvers([
    userResolver,
    productResolver,
    ClienteResolver,
    OrderResolver
])