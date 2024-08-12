"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
// route imports
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// routes
app.use("/dashboard", dashboardRoutes_1.default); // dashboard routes
app.use('/products', productRoutes_1.default); // product routes
app.use('/expenses', expenseRoutes_1.default); // expenses routes
app.use('/users', userRoutes_1.default); // users routes
// server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
