const User = require("../../models/User")
const Order = require("../../models/Order")
const {
     createHash,
     comparePassword,
     createToken,
     verifyToken
    } = require("../../services/utils")

const resolvers = {

    Query : {
        getUser: async (_,{},ctx) =>{
            return ctx.user.user
        },
        bestSeller: async() =>{
            const seller = await Order.aggregate([
                {$match:{state: "COMPLETADO"}},
                {$group:{
                    _id:'$seller',
                    total:{$sum: '$total'}
                }},
                {
                    $lookup:{
                        from:'users',
                        localField:"_id",
                        foreignField:"_id",
                        as:"seller"
                    }
                },
                {
                    $limit:3
                },
                {
                    $sort:{total:-1}
                }
            ])
            return seller
        }
    },

    Mutation: {
        newUser: async (_,{input}) => {
           const {email, password} = input

            const user = await User.findOne({email})
            if(user) throw new Error("El usuario ya existe")

           await createHash(input, password)

            try {
              const  user = new User(input)
              user.save()
              return user
            } catch (error) {
                console.log(error);
            }

        },

        AuthUser: async (_,{input}) =>{
            const {email, password} = input
            const isUser = await User.findOne({email})
            if(!isUser) throw new Error("El usuario no existe");
    
            const pass = await comparePassword(isUser, password)
            if(!pass)  throw new Error("Contraseña incorrecta");
    
           const token = createToken(isUser)
           return {token}
    
        }
    }

   
}

module.exports = resolvers