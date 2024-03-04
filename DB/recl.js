const mongoose = require('mongoose');

const reclDb = async()=>{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' });
        console.log(process.env.MONGO_URI);
        // await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        // await mongoose.connect("mongodb+srv://deptitamin23:deptit123456@cluster0.2yvvr91.mongodb.net/?retryWrites=true&w=majority")
        console.log('Database connected')
    }catch(error){
        console.log('Not connected to Data base',error)
    }
}

module.exports = reclDb;