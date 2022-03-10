"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const voteSchema = new mongoose_1.Schema({
    machine_id: String,
    user_addr: String,
    vote_type: Boolean,
    date: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('vote', voteSchema);
//# sourceMappingURL=vote.js.map