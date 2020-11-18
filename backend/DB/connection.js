const mongoose = require('mongoose');
const chalk = require('chalk');



const connectDB = async (DB_NAME)=>{
    // const URI = `mongodb+srv://rkant225:rkant225@expresswithmongodb.kfytu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    const URI = `mongodb://rkant225:rkant225@expresswithmongodb-shard-00-00.kfytu.mongodb.net:27017,expresswithmongodb-shard-00-01.kfytu.mongodb.net:27017,expresswithmongodb-shard-00-02.kfytu.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=atlas-h29i6x-shard-0&authSource=admin&retryWrites=true&w=majority`;
    console.log('Trying to connect...')
    try{
        await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(chalk.blueBright('Connected to database successfully...!!!'))
    }catch{
        console.log(chalk.red('Unable to connect to database..!!!'));
        process.exit(1);
    }
}

module.exports = {
    connectDB : connectDB,
};