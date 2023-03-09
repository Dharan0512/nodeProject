const User = require('../models/Users')

const register = async (req, res)=>{
    try {
        
        const {emailId, password} = req.body
        
        //throw bad request
        if(!emailId || !password){
            res.status(400).json('please provide all values')
        }
        
        const userAlreadyExist = await User.findOne({emailId})
        
        
        //throw conflict error
        if(userAlreadyExist){
            res.status(409).json('email already in use')
        }
        
        const user = await User.create(req.body)    
        
        const token = user.createJWT();
        
        res.status(200).json({
            msg: 'user created successfully',
            token
        })
    } catch (error) {
        console.log('authCerr',error);
        
    }
}


const login = async (req, res)=>{
    const {emailId, password} = req.body

    //throw bad request
    if(!emailId || !password){
        res.status(400).json('please provide all values')
    }

    const user = await User.findOne({emailId}).select('+password');

     //throw conflict error
    if(!user){
        res.status(401).json('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    user.password = undefined;
    user.userId = user._id 
    res.status(200).json({
        user,
        token
    })

}


module.exports = {register, login}