const {ApolloServer} = require("apollo-server")
const  typeDefs = require("./graphql/schemas/index") 
const resolvers = require("./graphql/resolvers") 
const conectarDB = require("./config/db")
const {sendToken} = require("./services/utils")

conectarDB()


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers:resolvers,
    context: sendToken
})

server.listen({port: process.env.PORT || 4000}).then(({url})=>{
    console.log(`server running at port ${url} `);
})