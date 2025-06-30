"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.router);
app.use("/files", express_1.default.static((0, path_1.resolve)(__dirname, "..", "..", "tmp")));
// Middleware de tratamento de erros — deve vir por último
const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message,
        });
        return;
    }
    res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("Server is running on port 3333");
});
