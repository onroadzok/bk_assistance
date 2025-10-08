"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
exports.winstonLogger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.colorize(), winston.format.printf(function (_a) {
                var timestamp = _a.timestamp, level = _a.level, message = _a.message, context = _a.context, trace = _a.trace;
                return "".concat(timestamp, " [").concat(context || 'Application', "] ").concat(level, ": ").concat(message).concat(trace ? "\n".concat(trace) : '');
            })),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
});
