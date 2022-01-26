const Order = require("../../models/Order")
const Cliente = require("../../models/Cliente")
const Product = require("../../models/Product")

const resolvers = {

    Query:{
        getOrders: async() =>{
            try {
                const order = Order.find({})
                if(!order) throw new Error("No hay pedidos");
                return order
            } catch (error) {
                console.log(error);
            }
        },
        getOrderBySeller: async(_,{},ctx) =>{
            try {
                const order = await Order.find({seller: ctx.user.user.id}).populate('cliente')
                if(!order) throw new Error("No hay pedidos")
                return order
            } catch (error) {
                console.log(error);
            }

        },
        getOrderById: async(_,{id},ctx) =>{
            const order = await Order.findById(id);
            if(!order) throw new Error("Pedido no encontrado");
            if(order.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")
            return order
        },
        getOrderByState: async(_,{state}, ctx) =>{
            const order = await Order.find({seller: ctx.user.user.id, state})
            return order
        }
    },

    Mutation: {
        newOrder: async (_, { input }, ctx) => {
            const { cliente } = input
           
                const cli = await Cliente.findById(cliente);
                if (!cli) throw new Error("Cliente no encontrado");
                if (cli.seller.toString() !== ctx.user.user.id) throw new Error("No tienes las credenciales")

                for await (const order of input.order) {
                    const { id, cantidad } = order
                    const product = await Product.findById(id);

                    if (cantidad > product.existence){
                        throw new Error(`El articulo ${product.name} excede la cantidad disponible`)
                    }else{
                        product.existence = product.existence - cantidad
                        product.save()
                    }
                }
                try{
            

                const newOrder = new Order(input)

                newOrder.seller = ctx.user.user.id
                const res = await newOrder.save()
                return res
            } catch (error) {
                console.log(error);
            }
        },

        updateOrder: async(_,{id,input}, ctx) =>{
            
                const {cliente} = input
                const order = await Order.findById(id);
                if(!order) throw new Error("Pedido no encontrado");

                const cli = await Cliente.findById(cliente);
                if (!cli) throw new Error("Cliente no encontrado");

                if(order.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")

                if(input.order){
                    for await (const ord of input.order) {
                        const { id, cantidad } = ord
                        const product = await Product.findById(id);
    
                        if (cantidad > product.existence){
                            throw new Error(`El articulo ${product.name} excede la cantidad disponible`)
                        }else{
                            product.existence = product.existence - cantidad
                          await  product.save()
                        }
                    }
                }
                try{
                const res = await Order.findOneAndUpdate(
                    {_id:id},
                    input,
                    {new:true}
                )
                return res 

            } catch (error) {
                console.log(error);
            }
        },
        deleteOrder: async (_,{id}, ctx) =>{
            const order = await Order.findById(id);
            if(!order) throw new Error("Pedido no encontrado");

            if(order.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")

            await Order.findOneAndDelete({_id:id})
            return "Pedido Eliminado"

        }

    }
}

module.exports = resolvers