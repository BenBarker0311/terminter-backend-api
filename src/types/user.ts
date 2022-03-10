import { Document } from 'mongoose'

export interface IUser extends Document {
	userid: string,
	password: string,
	date : string
}