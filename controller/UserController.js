const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const salt = 10;
const nodemailer = require('nodemailer');
const jsonwebtoken =require('jsonwebtoken');

const register = (req,resp) => {


    UserSchema.findOne({'email':req.body.email}).then(result=>{
        if(result==null){
            bcrypt.hash(req.body.password,salt,function (err,hash) {
                if (err){
                    return resp.status(500).json(err);
                }
                const user = new UserSchema({
                    fullName:req.body.fullName,
                    password:hash,
                    email:req.body.email,
                    activeState:true
                });

                const transporter= nodemailer.createTransport({
                    host: "my.smtp.host",
                    port: 465,
                    secure: true,
                    service:'gmail',
                    auth:{
                        user:'testfullemail9222@gmail.com',
                        pass:'myhy cchc yxyd uqvh',
                    },
                    tls:{
                        rejectUnauthorized: false,
                    }
                });

                const mailOption={
                    from:'testfullemail9222@gmail.com',
                    to:req.body.email,
                    subject:'New Account Creation',
                    text:'You have Created Your Account!'
                }
                transporter.sendMail(mailOption, function (error, info) {
                    if (error){
                        return resp.status(500).json({'error':error});
                    }else{
                        user.save().then(saveResponse=>{
                            return resp.status(201).json({'message':'Saved!'});
                        }).catch(error=>{
                            return resp.status(500).json(error);
                        });
                    }
                })
            })
        }else{
            return resp.status(409).json({'error':'already exists!'});
        }
    })
}

const login = (req,resp) => {
    UserSchema.findOne({'email':req.body.email}).then(selectedUser=>{
        if (selectedUser!==null){
            bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
                if (err){
                    return resp.status(500).json({'message':'internal server error'});
                }

                if(result){
                    const payload={
                        email:selectedUser.email
                    }

                    const secretKey=process.env.SECRET_KEY;
                    const expiresIn='24h';

                    const token = jsonwebtoken.sign(payload,secretKey,{expiresIn});
                    return resp.status(200).json(token);
                }else{
                    return resp.status(401).json({'message':'Password is incorrect!'});
                }
            });
        }else{
            return resp.status(404).json({'message':'not found!'});
        }
    });

}

module.exports = {
    register,login
}
