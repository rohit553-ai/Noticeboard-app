const express = require("express");
const { verifyLogin } = require("../middlewares/verifyLogin");
const router = express.Router();
const {getUserAuthorization} = require("../middlewares/authorization");

const {User} = require("../models/user");

router.get("/users", verifyLogin, getUserAuthorization, async (req, res)=>{

    try{
        await User.find({}, async (error, users)=>{
        if(error){
            return res.satus(400).send("Something went wrong");
        }

        return res.status(200).json({status: "success", data:{user: users}});
       }); 
    }catch(ex){
        return res.status(400).send({status: "fail", data:{user: "can't get users"}})
    }

});

module.exports = router;