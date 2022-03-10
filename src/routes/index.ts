import { Router } from 'express'
import { getMachines, getMachine, addMachine, editMachine, deleteMachine, deleteAllMachines } from '../controllers/machine'
import { apiGetMachines } from '../api/machine';
import { apiSetVote } from '../api/vote';
import { login, register, logout, verify } from '../controllers/user'

const router: Router = Router()

router.post('/user/login', login)
router.post('/user/logout', logout)
router.post('/user/authenticated', verify)

router.post('/register', register)

router.get('/get-machines', getMachines)

router.post('/get-machine', getMachine)

router.post('/add-machine', addMachine)

router.post('/edit-machine', editMachine)

router.post('/delete-machine', deleteMachine)

router.post('/delete-all-machines', deleteAllMachines)

// api
router.get('/api/get-machines', apiGetMachines)
router.post('/api/set-vote', apiSetVote)
export default router
