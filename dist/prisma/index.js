"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("../../generated/prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
