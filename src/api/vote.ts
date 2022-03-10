import { Response, Request } from 'express'
import { IVote } from '../types/vote'
import Vote from '../models/vote'
import { IMachine } from '../types/machine'
import Machine from '../models/machine'
const apiSetVote = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = {$and: [{machine_id: req.body.machine_id},{user_addr: req.body.user_addr}]};
        const isSaved = await Vote.findOne(query)
        if(!isSaved) {
            const body = req.body;
            const { machine_id, user_addr, vote_type } = body;
            const machine: IVote = new Vote({
                machine_id,
                user_addr,
                vote_type
            })
            await machine.save()
            const queryVote = {machine_id: req.body.machine_id};
            let updateMachine = await Machine.findOne(queryVote);
            if(vote_type) {
                updateMachine.like++
            } else {
                updateMachine.dislike++
            }
            
            await Machine.findByIdAndUpdate(
                { _id: updateMachine._id },
                updateMachine
            )
            res.status(201).json({ message: 'Machine added successfully.', status: true })  
        } 
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

export { apiSetVote }
