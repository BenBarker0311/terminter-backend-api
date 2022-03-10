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
exports.verify = exports.logout = exports.register = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const COUNT_PER_PAGE = 10;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { $and: [{ userid: req.body.user_id }, { password: req.body.password }] };
        const user = yield user_1.default.findOne(query);
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                _id: user._id,
            }, "admin123", {
                expiresIn: '2h'
            });
            res.status(201).json({ token, message: "success", status: true });
        }
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
        throw error;
    }
});
exports.login = login;
const verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (token) {
        jsonwebtoken_1.default.verify(token, "admin123", (err, decoded) => {
            console.log(err, ":", decoded);
            if (err) {
                res.status(401).json({
                    errors: 'Expired link. Signup again'
                });
            }
            else {
                res.status(201).json({
                    msg: "success"
                });
            }
        });
    }
});
exports.verify = verify;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { $and: [{ userid: req.body.user_id }, { password: req.body.password }] };
        const isSaved = yield user_1.default.findOne(query);
        if (!isSaved) {
            const user = new user_1.default({
                userid: req.body.user_id,
                password: req.body.password
            });
            yield user.save();
        }
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
        throw error;
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("t");
    }
    catch (error) {
        res.status(400).json({ errorMessage: error, status: false });
        throw error;
    }
});
exports.logout = logout;
//# sourceMappingURL=user.js.map