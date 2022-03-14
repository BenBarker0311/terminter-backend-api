import { Document } from 'mongoose'

export interface IMachine extends Document {
    machine_type: string,
	machine_id: string,
	admin: string,
	price: number,
	image_url: string,
	total_items: number,
	go_live_date: string,
	captcha: boolean,
	machine_collection: string,
	like: number,
	dislike: number,
	remain: Boolean,
	date : string
}