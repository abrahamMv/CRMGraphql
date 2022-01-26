const Cliente = require("../../models/Cliente")
const Order = require("../../models/Order")

const resolvers = {

    Query: {
        getClientes: async()=>{
            try {
                const clientes = await Cliente.find({})
                if(!clientes) throw new Error("No hay clientes")
                return clientes
            } catch (error) {
                console.log(error);
            }
        },

        getClientesbySeller: async(_,{},ctx)=>{
            try {
                const clientes = await Cliente.find({seller:ctx.user.user.id.toString()})
                if(!clientes) throw new Error("No hay clientes")
                return clientes
            } catch (error) {
                console.log(error);
            }
        },

        getCliente: async (_,{id},ctx)=>{
            try {
                const cliente = await Cliente.findById(id);
                if(!cliente) throw new Error("Cliente no encontrado");
                if(cliente.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")
                return cliente
            } catch (error) {
                console.log(error);
            }
        },
        bestCliente: async() =>{
            const clientes = await Order.aggregate([
                {$match: {state: "COMPLETADO"}},
                {$group: {
                    _id:'$cliente',
                    total:{$sum: '$total'}
                }},
                {
                    $lookup:{
                        from:'clientes',
                        localField:'_id',
                        foreignField:"_id",
                        as:"cliente"
                    }
                },
                {
                    $limit:10
                },
                {
                    $sort:{total:-1}
                }
            ])
            return clientes
        }
    },

    Mutation: {
        newCliente: async (_,{input},ctx) =>{
            const {email} = input
            const cliente = await Cliente.findOne({email});
            if(cliente) throw new Error("El cliente ya existe")
            const newCliente = new Cliente(input);
            newCliente.seller = ctx.user.user.id

            try {
               
                const res = await newCliente.save()
                return res
            } catch (error) {
                console.log(error);
            }
        },
        updateCliente: async (_,{id,input}, ctx) =>{
            
                let cliente = await Cliente.findById(id);
                if(!cliente) throw new Error("Cliente no encontrado");
                if(cliente.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")
                try{
                cliente = await Cliente.findOneAndUpdate(
                    {_id:id},
                    input,
                    {new: true}
                )
                return cliente

            } catch (error) {
                console.log(error);
            }
        },

        deleteCliente: async (_,{id}, ctx) =>{
            let cliente = await Cliente.findById(id);
            if(!cliente) throw new Error("Cliente no encontrado");
            if(cliente.seller.toString()!==ctx.user.user.id) throw new Error("No tienes las credenciales")
            await Cliente.findOneAndDelete({_id:id})
            return "Cliente Eliminado"
        }
    }
}

module.exports = resolvers