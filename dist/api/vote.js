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
exports.apiSetVote = void 0;
const vote_1 = __importDefault(require("../models/vote"));
const machine_1 = __importDefault(require("../models/machine"));
const apiSetVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { $and: [{ machine_id: req.body.machine_id }, { user_addr: req.body.user_addr }] };
        const isSaved = yield vote_1.default.findOne(query);
        if (!isSaved) {
            const body = req.body;
            const { machine_id, user_addr, vote_type } = body;
            const machine = new vote_1.default({
                machine_id,
                user_addr,
                vote_type
            });
            yield machine.save();
            const queryVote = { machine_id: req.body.machine_id };
            let updateMachine = yield machine_1.default.findOne(queryVote);
            if (vote_type) {
                updateMachine.like++;
            }
            else {
                updateMachine.dislike++;
            }
            yield machine_1.default.findByIdAndUpdate({ _id: updateMachine._id }, updateMachine);
            res.status(201).json({ message: 'Machine added successfully.', status: true });
        }
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
    }
});
exports.apiSetVote = apiSetVote;
//# sourceMappingURL=vote.js.map