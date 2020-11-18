const express = require('express');
const { v4: uuid } = require('uuid'); // This will generate random unique ID
const createError = require('http-errors'); // You can create error and pass it to next() middleware, thi will force to trigger the ErrorHandling middleware which have 4 parameters.
const {check, validationResult} = require('express-validator'); // Validate all the fields comming in request.

const User = require('../Models/user');

const Router = express.Router();

const defaultResponse = {isSuccessfull : true};

const USERS = [
    {id : 1, name : 'Rahul', email : 'rkant25@SpeechGrammarList.com', password : 'Tester97', imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
    {id : 2, name : 'Ravi', email : 'rkant225@SpeechGrammarList.com', password : 'Tester98', imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
    {id : 3, name : 'Rohit', email : 'rkant2225@SpeechGrammarList.com', password : 'Tester99', imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`},
];


// This will return all the users list.
Router.get('/', (req,res,next)=>{
    res.send({...defaultResponse, users : USERS});
});

// This will return the single user's details.
Router.get('/:userId', (req,res,next)=>{
    const {userId} = req.params;
    const index = USERS.findIndex((user)=> user.id == userId);
    if(index >= 0){
        res.send({...defaultResponse, user : USERS[index]});
    } else {
        const error = createError.NotFound('No user found for this userId');
        next(error);
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
Router.post('/signup', signupFieldValidator, async (req,res,next)=>{
    const {name, email, password} = req.body;

    if(validationResult(req).errors.length === 0){
        try{
            const existingUserWithThisMailId = await User.find({email : email}).exec();
            if(existingUserWithThisMailId.length === 0){
                const createdUser = new User({
                    name : name,
                    email : email,
                    password : password,
                    imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/50`
                });
    
                await createdUser.save();
    
                res.status(201);
                res.send({...defaultResponse, user : createdUser.toObject({getters : true})})
            } else {
                const error = createError.Conflict('User with this email already exist.');
                next(error);
            }
            
        } catch(err) {
            res.status(422);
            res.send({isSuccessfull : false, error : err})
        }
    } else {
        res.status(422);
        res.send({isSuccessfull : false, errors : validationResult(req).errors})
    }
});


// This will validate the Credentials entered by user, and will help user to get logged in.
Router.post('/login', (req,res,next)=>{
    const {email, password} = req.body;
    const index = USERS.findIndex((user)=>user.email == email);
    if(index >= 0){
        const identifiedUser = USERS[index];
        if(identifiedUser.password == password){
            res.send({...defaultResponse});
        } else {
            const error = createError.Unauthorized('Invalid credentials.');
            next(error);
        }
    } else {
        const error = createError.NotFound('User does not exist.');
        next(error);
    }
});


module.exports = Router;