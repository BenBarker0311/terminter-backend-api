import { Response, Request } from 'express'
import { IMachine } from '../types/machine'
import Machine from '../models/machine'
import Vote from '../models/vote'

const COUNT_PER_PAGE = 10;

const getMachines = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.search ? {$or: [{machine_id: {$regex: req.query.search.toString()}}, {admin: {$regex: req.query.search.toString()}}, {machine_collection: {$regex: req.query.search.toString()}}]} : {};
        
        const curPage: number = +req.query.page;
        const machines: IMachine[] = await Machine.find(query).sort({date: -1}).skip((curPage - 1) * COUNT_PER_PAGE).limit(COUNT_PER_PAGE);
        const totalNum: number = await Machine.find(query, ).count();

        const pages: number = Math.floor(totalNum % COUNT_PER_PAGE? totalNum / COUNT_PER_PAGE + 1: totalNum / COUNT_PER_PAGE);
        res.status(200).json({ machines, pages })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

const getMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const machine_id = req.body.machine_id
        const machine: IMachine = await Machine.findOne({machine_id: machine_id})

        if(machine)
            res.status(200).json({ isExist: true })
        else
            res.status(200).json({ isExist: false })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

const addMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = {machine_id: req.body.machine_id};
        const isSaved = await Machine.findOne(query)
        if(!isSaved) {
            const body = req.body;
            const { image_url, machine_type, machine_id, machine_collection, admin, price, total_items, go_live_date, captcha } = body;
            const machine: IMachine = new Machine({
                image_url,
                machine_type,
                machine_id,
                admin,
                price,
                total_items,
                go_live_date,
                machine_collection,
                captcha,
                like: 0,
                dislike: 0
            })
    
            await machine.save()
    
            res.status(201).json({ message: 'Machine added successfully.', status: true })    
        }
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
        throw error
    }
}

const editMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const machine= {
            image_url: body.image_url
        }
        await Machine.findByIdAndUpdate(
            { _id: body._id },
            machine
        )
        res.status(200).json({
            message: 'Machine updated successfully.',
            status: true
        })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

const deleteMachine = async (req: Request, res: Response): Promise<void> => {
    try {
        await Machine.findByIdAndRemove(req.body.id)
        res.status(200).json({
            message: 'Machine deleted successfully.',
            status: true
        })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}
const deleteAllMachines = async (req: Request, res: Response): Promise<void> => {
    try {
        await Machine.remove();
        await Vote.remove();
        res.status(200).json({
            message: 'All Machines deleted successfully.',
            status: true
        });
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

const statusEdit = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body;
        const machine= {
            image_url: body.image_url
        }
        await Machine.findOneAndUpdate(
            { machine_id: body.machine_id },
            {$set: {is_soldout : body.is_soldout} }
        )
        res.status(200).json({
            message: `Machine updated successfully.${body.machine_id}`,
            status: true
        })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}
export { getMachines, getMachine, addMachine, editMachine, deleteMachine,deleteAllMachines, statusEdit }
