const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createHash = async (user,password) =>{

        const salt = await bcrypt.genSalt(10);
     return  user.password = await bcrypt.hash(password,salt)

}

const comparePassword = async (user, password) =>{

   return  result = bcrypt.compare(password, user.password);
}

const createToken = (data) =>{

    const payload ={
        user :{
            id:data._id,
            name:data.name,
            lastName:data.lastName
        }
    }

    return jwt.sign(payload,process.env.CLAVE,{expiresIn:14400})
}

const verifyToken = async token =>{
    const userId = await jwt.verify(token,process.env.CLAVE)
    return userId
}

const sendToken = ({req}) =>{
    const token = req.headers.authorization || ''
    if(token){
        try {
            const user = jwt.verify(token,process.env.CLAVE)
            return {user}
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports ={
    createHash,
    comparePassword,
    createToken,
    verifyToken,
    sendToken
}