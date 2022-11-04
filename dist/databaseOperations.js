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
exports.__esModule = true;
exports.getAllResults = exports.getUserResults = exports.newResult = exports.createUser = exports.searchUser = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var searchUser = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.users.findUnique({
                        where: {
                            userProviderID: userID
                        }
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchUser = searchUser;
var createUser = function (_a) {
    var userName = _a.userName, userEmail = _a.userEmail, userID = _a.userID;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prisma.users.create({
                        data: {
                            name: userName,
                            email: userEmail,
                            userProviderID: userID
                        }
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.createUser = createUser;
var newResult = function (_a, modality, newResult) {
    var userName = _a.userName, userEmail = _a.userEmail, userID = _a.userID;
    return __awaiter(void 0, void 0, void 0, function () {
        var lastResult;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    return [4 /*yield*/, prisma.users.findUnique({
                            where: {
                                userProviderID: userID
                            },
                            include: (_b = {},
                                _b[modality] = {
                                    take: 1,
                                    orderBy: {
                                        results: 'desc'
                                    }
                                },
                                _b)
                        })];
                case 1:
                    lastResult = _e.sent();
                    if (!(lastResult[modality].length === 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, prisma.users.update({
                            where: {
                                userProviderID: userID
                            },
                            data: (_c = {},
                                _c[modality] = {
                                    create: {
                                        results: newResult
                                    }
                                },
                                _c)
                        })];
                case 2: return [2 /*return*/, _e.sent()];
                case 3:
                    if (!(modality === "casually")) return [3 /*break*/, 6];
                    if (!(Number(lastResult[modality][0].results) > Number(newResult))) return [3 /*break*/, 5];
                    return [4 /*yield*/, prisma.users.update({
                            where: {
                                userProviderID: userID
                            },
                            data: {
                                casually: {
                                    update: {
                                        where: {
                                            id: lastResult[modality][0].id
                                        },
                                        data: {
                                            results: newResult
                                        }
                                    }
                                }
                            }
                        })];
                case 4: return [2 /*return*/, _e.sent()];
                case 5: return [2 /*return*/];
                case 6:
                    if (!(Number(lastResult[modality][0].results) < Number(newResult))) return [3 /*break*/, 8];
                    return [4 /*yield*/, prisma.users.update({
                            where: {
                                userProviderID: userID
                            },
                            data: (_d = {},
                                _d[modality] = {
                                    update: {
                                        where: {
                                            id: lastResult[modality][0].id
                                        },
                                        data: {
                                            results: newResult
                                        }
                                    }
                                },
                                _d)
                        })];
                case 7: return [2 /*return*/, _e.sent()];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.newResult = newResult;
var getUserResults = function (userID, modality) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prisma.users.findUnique({
                    where: {
                        userProviderID: userID
                    },
                    include: (_a = {},
                        _a[modality] = {
                            take: 1,
                            orderBy: {
                                results: "desc"
                            }
                        },
                        _a)
                })];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.getUserResults = getUserResults;
var getAllResults = function (modality) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, prisma.users.findMany({
                    include: (_a = {},
                        _a[modality] = {
                            orderBy: {
                                results: "desc"
                            }
                        },
                        _a),
                    orderBy: (_b = {},
                        _b[modality] = {
                            _count: 'desc'
                        },
                        _b)
                })];
            case 1: return [2 /*return*/, _c.sent()];
        }
    });
}); };
exports.getAllResults = getAllResults;
//# sourceMappingURL=databaseOperations.js.map