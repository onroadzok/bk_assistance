"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportDto = exports.ReportFiltersDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var report_entity_1 = require("../entities/report.entity");
var ReportFiltersDto = function () {
    var _a;
    var _courseId_decorators;
    var _courseId_initializers = [];
    var _courseId_extraInitializers = [];
    var _studentId_decorators;
    var _studentId_initializers = [];
    var _studentId_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _classId_decorators;
    var _classId_initializers = [];
    var _classId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ReportFiltersDto() {
                this.courseId = __runInitializers(this, _courseId_initializers, void 0);
                this.studentId = (__runInitializers(this, _courseId_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
                this.startDate = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
                this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
                this.classId = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _classId_initializers, void 0));
                __runInitializers(this, _classId_extraInitializers);
            }
            return ReportFiltersDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _courseId_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)()];
            _studentId_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)()];
            _startDate_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)()];
            _endDate_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)()];
            _classId_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _courseId_decorators, { kind: "field", name: "courseId", static: false, private: false, access: { has: function (obj) { return "courseId" in obj; }, get: function (obj) { return obj.courseId; }, set: function (obj, value) { obj.courseId = value; } }, metadata: _metadata }, _courseId_initializers, _courseId_extraInitializers);
            __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: function (obj) { return "studentId" in obj; }, get: function (obj) { return obj.studentId; }, set: function (obj, value) { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            __esDecorate(null, null, _classId_decorators, { kind: "field", name: "classId", static: false, private: false, access: { has: function (obj) { return "classId" in obj; }, get: function (obj) { return obj.classId; }, set: function (obj, value) { obj.classId = value; } }, metadata: _metadata }, _classId_initializers, _classId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ReportFiltersDto = ReportFiltersDto;
var CreateReportDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    var _filters_decorators;
    var _filters_initializers = [];
    var _filters_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateReportDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.format = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _format_initializers, void 0));
                this.filters = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _filters_initializers, void 0));
                __runInitializers(this, _filters_extraInitializers);
            }
            return CreateReportDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    enum: report_entity_1.ReportType,
                    example: report_entity_1.ReportType.ATTENDANCE_SUMMARY,
                    description: 'Tipo de reporte a generar',
                }), (0, class_validator_1.IsEnum)(report_entity_1.ReportType), (0, class_validator_1.IsNotEmpty)()];
            _format_decorators = [(0, swagger_1.ApiProperty)({
                    enum: report_entity_1.ReportFormat,
                    example: report_entity_1.ReportFormat.PDF,
                    description: 'Formato del reporte',
                }), (0, class_validator_1.IsEnum)(report_entity_1.ReportFormat), (0, class_validator_1.IsNotEmpty)()];
            _filters_decorators = [(0, swagger_1.ApiProperty)({
                    type: ReportFiltersDto,
                    required: false,
                    description: 'Filtros para generar el reporte',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsObject)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return ReportFiltersDto; })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
            __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: function (obj) { return "filters" in obj; }, get: function (obj) { return obj.filters; }, set: function (obj, value) { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateReportDto = CreateReportDto;
