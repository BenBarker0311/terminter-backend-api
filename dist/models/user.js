"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userid: String,
    password: String,
    date: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=user.js.map