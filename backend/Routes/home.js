const express = require('express');

const router = express.Router();

router.get('/', (req,res,next)=>{
    res.send({message : "Hey there, Its working....!!!"})
});

module.exports = router;