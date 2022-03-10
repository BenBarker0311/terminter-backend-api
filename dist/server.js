"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const mongoURI = 'mongodb+srv://root:password1!@cluster0.cagnj.mongodb.net/db_terminter?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoURI);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use(routes_1.default);
app.use(express_1.default.static(`${__dirname}/build`));
app.use('/*', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
});
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is Runing On port 5000");
});
//# sourceMappingURL=server.js.map