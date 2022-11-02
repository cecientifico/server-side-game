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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var bson_1 = require("bson");
var client_1 = require("@prisma/client");
var databaseOperations_1 = require("./databaseOperations");
var prisma = new client_1.PrismaClient();
var id = new bson_1.ObjectId();
var server = (0, express_1["default"])();
server.use(express_1["default"].json());
server.use(express_1["default"].urlencoded({ extended: true }));
server.use((0, cors_1["default"])());
server.get("/", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        response.status(200).json({ connected: true });
        return [2 /*return*/];
    });
}); });
server.post("/handle-user", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, userEmail, userID, user, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = request.body, userName = _a.userName, userEmail = _a.userEmail, userID = _a.userID;
                return [4 /*yield*/, (0, databaseOperations_1.searchUser)(userID)];
            case 1:
                user = _b.sent();
                if (!(user === null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, databaseOperations_1.createUser)({ userName: userName, userEmail: userEmail, userID: userID })];
            case 2:
                newUser = _b.sent();
                return [2 /*return*/, response.status(200).json({ user: newUser })];
            case 3:
                response.status(200).json({ user: user });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                response.status(400).json({ msg: "Erro Inesperado!" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
server.post("/new-result", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userName, userEmail, userID, userResult, modality, user, result, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = request.body, userName = _a.userName, userEmail = _a.userEmail, userID = _a.userID, userResult = _a.userResult, modality = _a.modality;
                return [4 /*yield*/, (0, databaseOperations_1.searchUser)(userID)];
            case 1:
                user = _b.sent();
                if (!(user !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, databaseOperations_1.newResult)({ userName: userName, userEmail: userEmail, userID: userID }, modality, userResult.toString())];
            case 2:
                result = _b.sent();
                return [2 /*return*/, response.status(200).json({ result: result })];
            case 3: return [2 /*return*/, response.status(400).json({ error: "User not found!" })];
            case 4:
                error_2 = _b.sent();
                response.status(400).json({ msg: "Erro Inesperado!" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
server.get("/user-results/:modality/:userID", function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, modality, userID, user, results, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = request.params, modality = _a.modality, userID = _a.userID;
                return [4 /*yield*/, (0, databaseOperations_1.searchUser)(userID)];
            case 1:
                user = _b.sent();
                if (!(user !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, databaseOperations_1.getUserResults)(userID, modality)];
            case 2:
                results = _b.sent();
                return [2 /*return*/, response.status(200).json({ result: results })];
            case 3: return [2 /*return*/, response
                    .status(400)
                    .json({ error: "O usuário não foi encontrado!" })];
            case 4:
                error_3 = _b.sent();
                response.status(400).json({ msg: "Erro Inesperado!" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// server.post("/all-results", async (request, response) => {
//   const results = await getAllResults();
//   response.status(200).json({ results: results });
// });
server.get('/check', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        response.status(200).send('ok');
        return [2 /*return*/];
    });
}); });
server.listen(process.env.PORT || '3000');
//# sourceMappingURL=index.js.map