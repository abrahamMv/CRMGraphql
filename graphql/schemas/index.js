const {mergeTypeDefs} = require("@graphql-tools/merge") 
const UserSchema = require("./user.schema") 
const productSchema = require("./product.schema")
const clienteShema = require("./cliente.schema")
const OrderSchema = require("./order.schema")

module.exports = mergeTypeDefs([
    UserSchema,
    productSchema,
    clienteShema,
    OrderSchema
])

