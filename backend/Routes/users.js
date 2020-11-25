const express = require('express');
const fs = require('fs');
// const { v4: uuid } = require('uuid'); // This will generate random unique ID
const createError = require('http-errors'); // You can create error and pass it to next() middleware, thi will force to trigger the ErrorHandling middleware which have 4 parameters.
const {check, validationResult} = require('express-validator'); // Validate all the fields comming in request.

const FileUploadMiddleWare = require('../middleWares/fileUpload');

const User = require('../Models/user');

const Router = express.Router();

const defaultResponse = {isSuccessfull : true};


// This will return all the users list.
Router.get('/', async (req,res,next)=>{

    try {
        const users = await User.find({}, '-password').exec(); // This will fetch all the users created till now, and select everything except password.
        res.send({...defaultResponse, users : users.map(user => user.toObject({getters : true}))});
    } catch(err) {
        res.status(422);
        res.send({isSuccessfull : false, error : err})
    }
    
});

// This will return the single user's details.
Router.get('/:userId', async (req,res,next)=>{
    const {userId} = req.params;

    try {
        const user = await User.findById(userId).exec();
        if(user){
            res.send({...defaultResponse, user : user.toObject({getters : true})});
        } else {
            const error = createError.NotFound('No user found for this userId');
            next(error);
        }
        
    } catch(err) {
        res.status(422);
        res.send({isSuccessfull : false, error : err})
    }
});


// This will add a single user
const signupFieldValidator = [
    check('name').not().isEmpty().withMessage('Name is mandatory.'),
    check('email').not().isEmpty().withMessage('Email is mandatory.'),
    check('email').normalizeEmail().isEmail().withMessage('Email seems to be invalid.'),
    check('password').not().isEmpty().withMessage('Password is mandatory.'),
    check('password').isLength({min : 6}).withMessage('Password password must be at least 6 characters long.'),
];
Router.post('/signup', FileUploadMiddleWare.single('image'), signupFieldValidator, async (req,res,next)=>{
    const {name, email, password} = req.body;

    if(validationResult(req).errors.length === 0){
        try{
            const existingUsersWithThisMailId = await User.find({email : email}).exec();

            if(existingUsersWithThisMailId.length === 0){
                const createdUser = new User({
                    name : name,
                    email : email,
                    password : password,
                    // imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`,
                    imageURL : req.file.path.replace(/\\/g,'/'),
                    places : []
                });
    
                await createdUser.save();
                const {id, imageURL} = createdUser.toObject({getters : true});

                res.status(200);
                res.send({...defaultResponse, user : {id, email, name, imageURL}})
            } else {
                if(req.file){
                    fs.unlink(req.file.path, ()=>{})
                }
                res.status(200);
                res.send({isSuccessfull : false, errorMessage : 'User with this email already exist.'})
                // const error = createError.Conflict('User with this email already exist.');
                // next(error);
            }
            
        } catch(err) {
            if(req.file){
                fs.unlink(req.file.path, ()=>{})
            }
            res.status(200);
            res.send({isSuccessfull : false, errorMessage : 'Something went wrong while saving details.',  error : err})
        }
    } else {
        if(req.file){
            fs.unlink(req.file.path, ()=>{})
        }
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : 'Unable to create user.', error : validationResult(req).errors})
        // res.status(422);
        // res.send({isSuccessfull : false, errors : validationResult(req).errors})
    }
});


// This will validate the Credentials entered by user, and will help user to get logged in.
Router.post('/login', async (req,res,next)=>{
    const {email, password} = req.body;
    try{
        const existingUserWithThisMailId = await User.findOne({email : email}).exec();
        if(existingUserWithThisMailId && existingUserWithThisMailId.password == password){
            const {id, email, name, imageURL} = existingUserWithThisMailId.toObject({getters : true});
            res.status(200);
            res.send({...defaultResponse, user : {id, email, name, imageURL}});
        } else {
            res.status(200);
            res.send({isSuccessfull : false, errorMessage : 'Invalid credentials, Please try again.'})
            // const error = createError.Forbidden('Invalid credentials, Please try again.');
            // next(error);
        }
        
    } catch(err) {
        res.status(200);
        res.send({isSuccessfull : false, errorMessage : "Something went wrong during authentication process, please try again later.", error : err})
    }
});


module.exports = Router;