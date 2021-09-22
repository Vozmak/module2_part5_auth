import { CallbackError } from 'mongoose';
import * as mongoose from 'mongoose';

const url: string = 'mongodb+srv://VOZMAK:JkJkJtDf1996@database.o7rur.mongodb.net/Module2_Part4_db?retryWrites=true&w=majority';

const connectDb = async () => {
  mongoose.connect(url, (err: CallbackError) => {
    if (err) console.log(err);
    console.log(`Connection success.`);
  });
}

export { connectDb }
