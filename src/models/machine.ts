import { IMachine } from '../types/machine';
import {model, Schema} from 'mongoose';

const machineSchema:Schema = new Schema( {
	machine_type: String,
	machine_id: String,
	admin: String,
	price: Number,
	go_live_date: String,
	total_items: Number,
	captcha: Boolean,
	image_url: String,
	machine_collection: String,
	user_id: Schema.Types.ObjectId,
	like: Number,
	dislike: Number,
	remain: Number,
	date : { type : Date, default: Date.now }
})

export default model<IMachine>('machine', machineSchema);