import { Response, Request } from 'express'
import { IUser } from '../types/user'
import User from '../models/user'
import jwt from "jsonwebtoken";

const COUNT_PER_PAGE = 10;

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = {$and: [{userid: req.body.user_id},{password: req.body.password}]};
        const user = await User.findOne(query)
        if(user) {
            const token = jwt.sign(
                    {
                        _id: user._id,
                    },
                    "admin123",
                    {
                        expiresIn: '2h'
                    }
                )
            
            
            res.status(201).json({ token, message: "success", status: true })
        }
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
        throw error
    }
}
const verify = async (req: Request, res: Response): Promise<void> => {
    const {token} = req.body;
    if(token) {
        jwt.verify(token, "admin123", (err: any, decoded: any) => {
            console.log(err,":", decoded)
            if(err) {
                res.status(401).json({
                    errors: 'Expired link. Signup again'
                  });
            }
            else {
                res.status(201).json({
                    msg: "success"
                })
            }
        })
    }
}
const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = {$and: [{userid: req.body.user_id},{password: req.body.password}]};
        const isSaved = await User.findOne(query)
        if(!isSaved) {
            const user: IUser = new User({
                userid: req.body.user_id,
                password: req.body.password
            });
            await user.save()
        }
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
        throw error
    }
}
const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("t");
    } catch (error) {
        res.status(400).json({ errorMessage: error, status: false })
        throw error
    }
}
export { login, register, logout, verify }
