interface User {
  email: string;
  password: string;
}

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserScheme = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },
});

UserScheme.pre('save', async function (next) {
  const user = this;
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UserScheme.methods.isValidPassword = async function (password: string) {
  const user = this;
  return await bcrypt.compare(password, user.password);
}

const Users = mongoose.model('Users', UserScheme, 'Users');

export { Users };
