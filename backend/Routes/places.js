const express = require('express');
const { v4: uuid } = require('uuid'); // This will generate random unique ID
const createError = require('http-errors'); // You can create error and pass it to next() middleware, thi will force to trigger the ErrorHandling middleware which have 4 parameters.
const {check, validationResult} = require('express-validator'); // Validate all the fields comming in request.

const Place = require('../Models/place');

const Router = express.Router();

const defaultResponse = {isSuccessfull : true};

// This will return all the places
Router.get('/', async (req,res,next)=>{
    try{
        const places = await Place.find().exec();
        const finalResponse = {...defaultResponse, places : places.map(place => place.toObject({getters : true}))};
        res.send(finalResponse);
    } catch(err){
        res.status(404);
        res.send({isSuccessfull : false, error : err});
    }
})

// This will return a single place which matches the 'placeId'.
Router.get('/:placeId', async (req,res,next)=>{
    const {placeId} = req.params;
    try{
        const place = await Place.findById(placeId).exec();
        if(place){
            const finalResponse = {...defaultResponse, place : place.toObject({getters : true})};
            res.send(finalResponse);
        } else {
            const error = createError.NotFound('No place found for this placeId.');
            next(error);
        }
    } catch(err){
        res.status(404);
        res.send({isSuccessfull : false, error : err});
    }
})


// This will return the list of all the places whose creater is user having user Id of 'userId'.
Router.get('/placesOfUser/:userId', async (req,res,next)=>{
    const {userId} = req.params;
    try{
        const places = await Place.find({userId : userId}).exec();
        const finalResponse = {...defaultResponse, places : places.map(place => place.toObject({getters : true}))};
        res.send(finalResponse);
    } catch(err){
        res.status(404);
        res.send({isSuccessfull : false, error : err});
    }
})


// This will add new Place to database.
const AddNewPlaceFieldValidator = [
    check('userId').not().isEmpty().withMessage('User Id is Madatory.'),
    check('title').not().isEmpty().withMessage('Title is Madatory.'),
    check('description').not().isEmpty().withMessage('Description is Madatory.'),
    check('description').isLength({min : 10}).withMessage('Description must contain at least 10 characters.'),
    check('address').not().isEmpty().withMessage('Address is Madatory.')
];
Router.post('/', AddNewPlaceFieldValidator, async (req,res,next)=>{
    
    const {userId, title, description, address} = req.body;
    if(validationResult(req).errors.length === 0){
        const createdPlace = new Place({
            userId,
            title,
            description,
            address,
            imageURL : `https://picsum.photos/id/${Math.round(Math.random() * 100)}/500`,
            coordinates : {
                lat : Math.round((Math.random()) * 10000) / 100,
                lng : Math.round((Math.random()) * 10000) / 100
            }
        });

        try{
            await createdPlace.save();
            res.status(201);
            res.send({...defaultResponse, place : createdPlace})
        } catch(err) {
            res.status(422);
            res.send({isSuccessfull : false, error : err});
        }
    } else {
        res.status(422);
        res.send({isSuccessfull : false, errors : [...validationResult(req).errors]});
    }
    
})


// This will update a place with new data
const EditPlaceFieldValidator = [
    check('placeId').not().isEmpty().withMessage('Place Id is Madatory.'),
    check('title').not().isEmpty().withMessage('Title is Madatory.'),
    check('description').not().isEmpty().withMessage('Description is Madatory.'),
    check('description').isLength({min : 10}).withMessage('Description must contain at least 10 characters.'),
    check('address').not().isEmpty().withMessage('Address is Madatory.')
];
Router.patch('/', EditPlaceFieldValidator, async (req,res,next)=>{
    const {placeId, title, description, address} = req.body;
    if(validationResult(req).errors.length === 0){
        try{
            const place = await Place.findById(placeId).exec();
            if(place){
                place.title = title;
                place.description = description;
                place.address = address;
                await place.save();
                const finalResponse = {...defaultResponse, place : place.toObject({getters : true})};
                res.send(finalResponse);
            } else {
                const error = createError.NotFound('No place found for this placeId.');
                next(error);
            }
        } catch(err){
            res.status(404);
            res.send({isSuccessfull : false, error : err});
        }
    } else {
        res.status(422);
        res.send({isSuccessfull : false, errors : [...validationResult(req).errors]});
    }
})

// This will delete a place
Router.delete('/:placeId', async (req,res,next)=>{
    const {placeId} = req.params;
    try{
        const place = await Place.findById(placeId).exec();
        if(place){
            await place.remove();

            res.status(200);
            res.send({...defaultResponse});
        } else {
            const error = createError.NotFound('No place found for this placeId.');
            next(error);
        }
    } catch(err){
        res.status(404);
        res.send({isSuccessfull : false, error : err});
    }
})


module.exports = Router;