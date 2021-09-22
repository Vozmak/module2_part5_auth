import * as mongoose from 'mongoose';

const url: string = 'mongodb+srv://VOZMAK:JkJkJtDf1996@database.o7rur.mongodb.net/Module2_Part4_db?retryWrites=true&w=majority';

const connectDb = async () => {
  await mongoose.connect(url);
};

export { connectDb };
