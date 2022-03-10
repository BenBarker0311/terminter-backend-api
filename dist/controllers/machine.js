"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllMachines = exports.deleteMachine = exports.editMachine = exports.addMachine = exports.getMachine = exports.getMachines = void 0;
const machine_1 = __importDefault(require("../models/machine"));
const vote_1 = __importDefault(require("../models/vote"));
const COUNT_PER_PAGE = 10;
const getMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.search ? { $or: [{ machine_id: { $regex: req.query.search.toString() } }, { admin: { $regex: req.query.search.toString() } }, { machine_collection: { $regex: req.query.search.toString() } }] } : {};
        const curPage = +req.query.page;
        const machines = yield machine_1.default.find(query).sort({ date: -1 }).skip((curPage - 1) * COUNT_PER_PAGE).limit(COUNT_PER_PAGE);
        const totalNum = yield machine_1.default.find(query).count();
        const pages = Math.floor(totalNum % COUNT_PER_PAGE ? totalNum / COUNT_PER_PAGE + 1 : totalNum / COUNT_PER_PAGE);
        res.status(200).json({ machines, pages });
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.getMachines = getMachines;
const getMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const machine_id = req.body.machine_id;
        const machine = yield machine_1.default.findOne({ machine_id: machine_id });
        if (machine)
            res.status(200).json({ isExist: true });
        else
            res.status(200).json({ isExist: false });
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.getMachine = getMachine;
const addMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { machine_id: req.body.machine_id };
        const isSaved = yield machine_1.default.findOne(query);
        if (!isSaved) {
            const body = req.body;
            const { image_url, machine_type, machine_id, machine_collection, admin, price, total_items, go_live_date, captcha } = body;
            const machine = new machine_1.default({
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
            });
            yield machine.save();
            res.status(201).json({ message: 'Machine added successfully.', status: true });
        }
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
        throw error;
    }
});
exports.addMachine = addMachine;
const editMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const machine = {
            image_url: body.image_url
        };
        yield machine_1.default.findByIdAndUpdate({ _id: body._id }, machine);
        res.status(200).json({
            message: 'Machine updated successfully.',
            status: true
        });
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.editMachine = editMachine;
const deleteMachine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield machine_1.default.findByIdAndRemove(req.body.id);
        res.status(200).json({
            message: 'Machine deleted successfully.',
            status: true
        });
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.deleteMachine = deleteMachine;
const deleteAllMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield machine_1.default.remove();
        yield vote_1.default.remove();
        res.status(200).json({
            message: 'All Machines deleted successfully.',
            status: true
        });
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.deleteAllMachines = deleteAllMachines;
//# sourceMappingURL=machine.js.map