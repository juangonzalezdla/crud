import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  _id: { type: String, _id: false },
  name: { type: String, require: true, minLength: 2, maxLength: 20 },
  lastName: { type: String, require: true, minLength: 4, maxLength: 50 },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true }
});

const UserModel = model('User', userSchema);

export default UserModel;