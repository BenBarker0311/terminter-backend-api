"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const machineSchema = new mongoose_1.Schema({
    machine_type: String,
    machine_id: String,
    admin: String,
    price: Number,
    go_live_date: String,
    total_items: Number,
    captcha: Boolean,
    image_url: String,
    machine_collection: String,
    user_id: mongoose_1.Schema.Types.ObjectId,
    like: Number,
    dislike: Number,
    date: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('machine', machineSchema);
//# sourceMappingURL=machine.js.map