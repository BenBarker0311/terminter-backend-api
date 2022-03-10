import { Response, Request } from 'express'
import { IMachine } from '../types/machine'
import Machine from '../models/machine'

const COUNT_PER_PAGE = 12;

const apiGetMachines = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.search? {
            machine_type: req.query.type.toString(),
            $or: [{
                machine_id: {
                    $regex: req.query.search.toString()
                }
            }, {admin: {
                    $regex: req.query.search.toString()
                }
            }, {machine_collection: {
                    $regex: req.query.search.toString()
                }
            }]
        } : {machine_type: req.query.type.toString()};
        const curPage: number = +req.query.page;
        const machines: IMachine[] = await Machine.find(query).sort({date: -1}).skip((curPage - 1) * COUNT_PER_PAGE).limit(COUNT_PER_PAGE);
        const totalNum: number = await Machine.find(query).count();
        const pages: number = Math.floor(totalNum % COUNT_PER_PAGE? totalNum / COUNT_PER_PAGE + 1: totalNum / COUNT_PER_PAGE);
        res.status(200).json({ machines, pages })
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
    }
}

export { apiGetMachines }
