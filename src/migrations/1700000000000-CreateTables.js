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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1700000000000 = void 0;
var CreateTables1700000000000 = /** @class */ (function () {
    function CreateTables1700000000000() {
    }
    CreateTables1700000000000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n      CREATE TYPE report_type AS ENUM ('ATTENDANCE_SUMMARY', 'STUDENT_DETAIL', 'COURSE_STATISTICS', 'COMPARATIVE');\n      CREATE TYPE report_format AS ENUM ('PDF', 'CSV', 'EXCEL');\n      CREATE TYPE report_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');\n      CREATE TYPE attendance_status AS ENUM ('PRESENTE', 'AUSENTE', 'TARDANZA');\n\n      CREATE TABLE reports (\n        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n        type report_type NOT NULL,\n        requested_by VARCHAR NOT NULL,\n        filters JSONB,\n        format report_format NOT NULL,\n        status report_status DEFAULT 'PENDING',\n        file_url VARCHAR,\n        error_message TEXT,\n        created_at TIMESTAMP DEFAULT NOW(),\n        updated_at TIMESTAMP DEFAULT NOW()\n      );\n\n      CREATE TABLE attendances (\n        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n        student_id VARCHAR NOT NULL,\n        class_id VARCHAR NOT NULL,\n        course_id VARCHAR NOT NULL,\n        arrival_time TIMESTAMP NOT NULL,\n        status attendance_status DEFAULT 'PRESENTE',\n        coordinates JSONB,\n        created_at TIMESTAMP DEFAULT NOW()\n      );\n\n      CREATE INDEX idx_attendance_student_class ON attendances(student_id, class_id);\n      CREATE INDEX idx_attendance_course_date ON attendances(course_id, created_at);\n    ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateTables1700000000000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n      DROP TABLE attendances;\n      DROP TABLE reports;\n      DROP TYPE attendance_status;\n      DROP TYPE report_status;\n      DROP TYPE report_format;\n      DROP TYPE report_type;\n    ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CreateTables1700000000000;
}());
exports.CreateTables1700000000000 = CreateTables1700000000000;
