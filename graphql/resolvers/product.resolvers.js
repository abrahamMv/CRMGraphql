const Product = require("../../models/Product")


const resolvers = {

    Query: {
        getProducts: async () => {
            try {
                const products = await Product.find({})
                return products
            } catch (error) {
                console.log(error);
            }

        },
        getProduct: async (_,{id}) =>{
            try {
                const product = await Product.findById(id);
                if(!product) throw new Error("Producto no econtrado")
                return product
            } catch (error) {
                console.log(error);
            }
        },
        findProduct: async(_,{text}) =>{
            const products = await Product.find({$text:{$search: text}})
            return products
        }
    },

    Mutation: {

        newProduct: async (_, { input }) => {
            try {
                const product = new Product(input)

                const res = await product.save()
                return res
            } catch (error) {
                console.log(error);
            }
        },

        updateProduct: async (_,{id, input})=>{
            let product = await Product.findById(id);
            if(!product) throw new Error("Producto no econtrado")

            product = await Product.findByIdAndUpdate(
                {_id:id},
                input,
                {new: true}
            )
            return product
        },

        deleteProduct: async (_,{id})=>{
            
                let product = await Product.findById(id);
                if(!product) throw new Error("Producto no econtrado")
                try{

                product = await Product.findByIdAndDelete({_id:id})

                return "Producto Eliminado"
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers