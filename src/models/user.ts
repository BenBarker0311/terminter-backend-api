import { IUser } from '../types/user';
import {model, Schema} from 'mongoose';

const userSchema:Schema = new Schema( {
	userid: String,
	password: String,
	date : { type : Date, default: Date.now }
})

export default model<IUser>('user', userSchema);