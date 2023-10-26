const User = require('../models/User')

const UserController = {
    createUser: async (req,res) => {
        const {username,email,password} = req.body;
        
        try {
            if( await  User.findOne({email:email})){
                return res.status(200).json({
                    message: "Email is exist",
                });
            }
            else if (await User.findOne({username:username})){
                return res.status(200).json({
                    message: "Username is exist",
                });
            }
            else{
                User.create({username,email,password}).then(response => {
                    return res.status(200).json({
                        message: "Create user successfully",
                        data: response
                    });
                })
            }
           
        } catch (error) {
            return res.status(500).json({
                message: "Error server",
            });
        }
        
    }

    
}

module.exports = UserController