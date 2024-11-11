import mongoose from "mongoose";


const DBconnection = async () => {
    const MONGODB_URI = `mongodb://dhrubojitc007:TransferHub2556@transferhub-shard-00-00.xgo5y.mongodb.net:27017,transferhub-shard-00-01.xgo5y.mongodb.net:27017,transferhub-shard-00-02.xgo5y.mongodb.net:27017/?ssl=true&replicaSet=atlas-2pc70o-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Transferhub`;

    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
        console.log('Connected to database sucessfully');

    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
}

export default DBconnection;