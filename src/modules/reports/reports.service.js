"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
var common_1 = require("@nestjs/common");
var PDFDocument = require("pdfkit");
var json2csv_1 = require("json2csv");
var fs = require("fs");
var path = require("path");
var report_entity_1 = require("./entities/report.entity");
var ReportsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ReportsService = _classThis = /** @class */ (function () {
        function ReportsService_1(reportRepository, attendanceRepository, rabbitClient, configService) {
            this.reportRepository = reportRepository;
            this.attendanceRepository = attendanceRepository;
            this.rabbitClient = rabbitClient;
            this.configService = configService;
            this.logger = new common_1.Logger(ReportsService.name);
            this.storagePath = this.configService.get('STORAGE_PATH', './uploads/reports');
            if (!fs.existsSync(this.storagePath)) {
                fs.mkdirSync(this.storagePath, { recursive: true });
            }
        }
        ReportsService_1.prototype.create = function (createReportDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var report, savedReport;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            report = this.reportRepository.create(__assign(__assign({}, createReportDto), { requestedBy: userId, status: report_entity_1.ReportStatus.PENDING }));
                            return [4 /*yield*/, this.reportRepository.save(report)];
                        case 1:
                            savedReport = _a.sent();
                            // Emit event to RabbitMQ
                            this.rabbitClient.emit('ReportRequested', {
                                reportId: savedReport.id,
                                type: savedReport.type,
                                format: savedReport.format,
                                filters: savedReport.filters,
                            });
                            this.logger.log("Report ".concat(savedReport.id, " created and queued"));
                            return [2 /*return*/, savedReport];
                    }
                });
            });
        };
        ReportsService_1.prototype.findAll = function (query, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var page, limit, type, status, startDate, endDate, skip, queryBuilder, _a, reports, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            page = query.page, limit = query.limit, type = query.type, status = query.status, startDate = query.startDate, endDate = query.endDate;
                            skip = (page - 1) * limit;
                            queryBuilder = this.reportRepository
                                .createQueryBuilder('report')
                                .where('report.requestedBy = :userId', { userId: userId });
                            if (type) {
                                queryBuilder.andWhere('report.type = :type', { type: type });
                            }
                            if (status) {
                                queryBuilder.andWhere('report.status = :status', { status: status });
                            }
                            if (startDate && endDate) {
                                queryBuilder.andWhere('report.createdAt BETWEEN :startDate AND :endDate', {
                                    startDate: new Date(startDate),
                                    endDate: new Date(endDate),
                                });
                            }
                            return [4 /*yield*/, queryBuilder
                                    .orderBy('report.createdAt', 'DESC')
                                    .skip(skip)
                                    .take(limit)
                                    .getManyAndCount()];
                        case 1:
                            _a = _b.sent(), reports = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: reports,
                                    meta: {
                                        total: total,
                                        page: page,
                                        limit: limit,
                                        totalPages: Math.ceil(total / limit),
                                    },
                                }];
                    }
                });
            });
        };
        ReportsService_1.prototype.findOne = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var report;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reportRepository.findOne({
                                where: { id: id, requestedBy: userId },
                            })];
                        case 1:
                            report = _a.sent();
                            if (!report) {
                                throw new common_1.NotFoundException("Report with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, report];
                    }
                });
            });
        };
        ReportsService_1.prototype.processReport = function (reportId) {
            return __awaiter(this, void 0, void 0, function () {
                var report, attendanceData, filePath, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.reportRepository.findOne({ where: { id: reportId } })];
                        case 1:
                            report = _a.sent();
                            if (!report) {
                                this.logger.error("Report ".concat(reportId, " not found"));
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 10, , 12]);
                            // Update status to PROCESSING
                            report.status = report_entity_1.ReportStatus.PROCESSING;
                            return [4 /*yield*/, this.reportRepository.save(report)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.queryAttendanceData(report.filters)];
                        case 4:
                            attendanceData = _a.sent();
                            filePath = void 0;
                            if (!(report.format === report_entity_1.ReportFormat.PDF)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.generatePDF(reportId, attendanceData, report)];
                        case 5:
                            filePath = _a.sent();
                            return [3 /*break*/, 8];
                        case 6:
                            if (!(report.format === report_entity_1.ReportFormat.CSV)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.generateCSV(reportId, attendanceData)];
                        case 7:
                            filePath = _a.sent();
                            _a.label = 8;
                        case 8:
                            // Update report with file URL
                            report.status = report_entity_1.ReportStatus.COMPLETED;
                            report.fileUrl = filePath;
                            return [4 /*yield*/, this.reportRepository.save(report)];
                        case 9:
                            _a.sent();
                            // Emit completion event
                            this.rabbitClient.emit('ReportGenerated', {
                                reportId: report.id,
                                userId: report.requestedBy,
                                fileUrl: filePath,
                                format: report.format,
                            });
                            this.logger.log("Report ".concat(reportId, " completed successfully"));
                            return [3 /*break*/, 12];
                        case 10:
                            error_1 = _a.sent();
                            this.logger.error("Error processing report ".concat(reportId, ":"), error_1.stack);
                            report.status = report_entity_1.ReportStatus.FAILED;
                            report.errorMessage = error_1.message;
                            return [4 /*yield*/, this.reportRepository.save(report)];
                        case 11:
                            _a.sent();
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        ReportsService_1.prototype.queryAttendanceData = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var queryBuilder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryBuilder = this.attendanceRepository.createQueryBuilder('attendance');
                            if (filters === null || filters === void 0 ? void 0 : filters.courseId) {
                                queryBuilder.andWhere('attendance.courseId = :courseId', {
                                    courseId: filters.courseId,
                                });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.studentId) {
                                queryBuilder.andWhere('attendance.studentId = :studentId', {
                                    studentId: filters.studentId,
                                });
                            }
                            if (filters === null || filters === void 0 ? void 0 : filters.classId) {
                                queryBuilder.andWhere('attendance.classId = :classId', {
                                    classId: filters.classId,
                                });
                            }
                            if ((filters === null || filters === void 0 ? void 0 : filters.startDate) && (filters === null || filters === void 0 ? void 0 : filters.endDate)) {
                                queryBuilder.andWhere('attendance.createdAt BETWEEN :startDate AND :endDate', {
                                    startDate: new Date(filters.startDate),
                                    endDate: new Date(filters.endDate),
                                });
                            }
                            return [4 /*yield*/, queryBuilder.orderBy('attendance.createdAt', 'DESC').getMany()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        ReportsService_1.prototype.generatePDF = function (reportId, data, report) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var fileName = "".concat(reportId, ".pdf");
                            var filePath = path.join(_this.storagePath, fileName);
                            var doc = new PDFDocument({ margin: 50 });
                            var stream = fs.createWriteStream(filePath);
                            doc.pipe(stream);
                            // Header
                            doc.fontSize(20).text('AssitClass - Reporte de Asistencia', { align: 'center' });
                            doc.moveDown();
                            doc.fontSize(12).text("Tipo: ".concat(report.type), { align: 'left' });
                            doc.text("Generado: ".concat(new Date().toLocaleString('es-ES')), { align: 'left' });
                            doc.moveDown();
                            // Table header
                            doc.fontSize(10).font('Helvetica-Bold');
                            var headers = ['Estudiante', 'Curso', 'Clase', 'Estado', 'Fecha/Hora'];
                            var colWidth = 100;
                            var xPos = 50;
                            headers.forEach(function (header) {
                                doc.text(header, xPos, doc.y, { width: colWidth });
                                xPos += colWidth;
                            });
                            doc.moveDown();
                            doc.font('Helvetica');
                            // Data rows
                            data.forEach(function (record) {
                                xPos = 50;
                                doc.text(record.studentId, xPos, doc.y, { width: colWidth });
                                xPos += colWidth;
                                doc.text(record.courseId, xPos, doc.y, { width: colWidth });
                                xPos += colWidth;
                                doc.text(record.classId, xPos, doc.y, { width: colWidth });
                                xPos += colWidth;
                                doc.text(record.status, xPos, doc.y, { width: colWidth });
                                xPos += colWidth;
                                doc.text(new Date(record.arrivalTime).toLocaleString('es-ES'), xPos, doc.y, {
                                    width: colWidth,
                                });
                                doc.moveDown(0.5);
                            });
                            // Footer
                            doc.moveDown();
                            doc.fontSize(10).text("Total de registros: ".concat(data.length), { align: 'center' });
                            doc.end();
                            stream.on('finish', function () { return resolve(fileName); });
                            stream.on('error', reject);
                        })];
                });
            });
        };
        ReportsService_1.prototype.generateCSV = function (reportId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var fileName, filePath, fields, parser, csv;
                return __generator(this, function (_a) {
                    fileName = "".concat(reportId, ".csv");
                    filePath = path.join(this.storagePath, fileName);
                    fields = [
                        { label: 'ID', value: 'id' },
                        { label: 'Estudiante ID', value: 'studentId' },
                        { label: 'Curso ID', value: 'courseId' },
                        { label: 'Clase ID', value: 'classId' },
                        { label: 'Estado', value: 'status' },
                        { label: 'Hora de Llegada', value: 'arrivalTime' },
                        { label: 'Fecha Registro', value: 'createdAt' },
                    ];
                    parser = new json2csv_1.Parser({ fields: fields });
                    csv = parser.parse(data);
                    fs.writeFileSync(filePath, csv);
                    return [2 /*return*/, fileName];
                });
            });
        };
        ReportsService_1.prototype.getFileStream = function (id, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var report, filePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id, userId)];
                        case 1:
                            report = _a.sent();
                            if (report.status !== report_entity_1.ReportStatus.COMPLETED || !report.fileUrl) {
                                throw new common_1.NotFoundException('Report file not available');
                            }
                            filePath = path.join(this.storagePath, report.fileUrl);
                            if (!fs.existsSync(filePath)) {
                                throw new common_1.NotFoundException('Report file not found on disk');
                            }
                            return [2 /*return*/, {
                                    stream: fs.createReadStream(filePath),
                                    filename: report.fileUrl,
                                }];
                    }
                });
            });
        };
        return ReportsService_1;
    }());
    __setFunctionName(_classThis, "ReportsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportsService = _classThis;
}();
exports.ReportsService = ReportsService;
