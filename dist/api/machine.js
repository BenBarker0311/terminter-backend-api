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
exports.apiGetMachines = void 0;
const machine_1 = __importDefault(require("../models/machine"));
const COUNT_PER_PAGE = 12;
const apiGetMachines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.search ? {
            machine_type: req.query.type.toString(),
            $or: [{
                    machine_id: {
                        $regex: req.query.search.toString()
                    }
                }, { admin: {
                        $regex: req.query.search.toString()
                    }
                }, { machine_collection: {
                        $regex: req.query.search.toString()
                    }
                }]
        } : { machine_type: req.query.type.toString() };
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
exports.apiGetMachines = apiGetMachines;
//# sourceMappingURL=machine.js.map