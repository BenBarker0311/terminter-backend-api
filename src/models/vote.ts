import { IVote } from '../types/vote';
import {model, Schema} from 'mongoose';

const voteSchema:Schema = new Schema( {
	machine_id: String,
	user_addr: String,
	vote_type: Boolean,
	date : { type : Date, default: Date.now }
})

export default model<IVote>('vote', voteSchema);