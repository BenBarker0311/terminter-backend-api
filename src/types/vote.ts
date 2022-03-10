import { Document } from 'mongoose'

export interface IVote extends Document {
	machine_id: string,
	user_addr: string,
	vote_type: boolean,
	date : string
}