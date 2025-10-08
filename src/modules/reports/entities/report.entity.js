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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportStatus = exports.ReportFormat = exports.ReportType = void 0;
var typeorm_1 = require("typeorm");
var ReportType;
(function (ReportType) {
    ReportType["ATTENDANCE_SUMMARY"] = "ATTENDANCE_SUMMARY";
    ReportType["STUDENT_DETAIL"] = "STUDENT_DETAIL";
    ReportType["COURSE_STATISTICS"] = "COURSE_STATISTICS";
    ReportType["COMPARATIVE"] = "COMPARATIVE";
})(ReportType || (exports.ReportType = ReportType = {}));
var ReportFormat;
(function (ReportFormat) {
    ReportFormat["PDF"] = "PDF";
    ReportFormat["CSV"] = "CSV";
    ReportFormat["EXCEL"] = "EXCEL";
})(ReportFormat || (exports.ReportFormat = ReportFormat = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["PENDING"] = "PENDING";
    ReportStatus["PROCESSING"] = "PROCESSING";
    ReportStatus["COMPLETED"] = "COMPLETED";
    ReportStatus["FAILED"] = "FAILED";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var Report = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('reports')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _requestedBy_decorators;
    var _requestedBy_initializers = [];
    var _requestedBy_extraInitializers = [];
    var _filters_decorators;
    var _filters_initializers = [];
    var _filters_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _fileUrl_decorators;
    var _fileUrl_initializers = [];
    var _fileUrl_extraInitializers = [];
    var _errorMessage_decorators;
    var _errorMessage_initializers = [];
    var _errorMessage_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var Report = _classThis = /** @class */ (function () {
        function Report_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
            this.requestedBy = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _requestedBy_initializers, void 0));
            this.filters = (__runInitializers(this, _requestedBy_extraInitializers), __runInitializers(this, _filters_initializers, void 0));
            this.format = (__runInitializers(this, _filters_extraInitializers), __runInitializers(this, _format_initializers, void 0));
            this.status = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.fileUrl = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _fileUrl_initializers, void 0));
            this.errorMessage = (__runInitializers(this, _fileUrl_extraInitializers), __runInitializers(this, _errorMessage_initializers, void 0));
            this.createdAt = (__runInitializers(this, _errorMessage_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return Report_1;
    }());
    __setFunctionName(_classThis, "Report");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _type_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ReportType,
            })];
        _requestedBy_decorators = [(0, typeorm_1.Column)({ name: 'requested_by' })];
        _filters_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _format_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ReportFormat,
            })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: ReportStatus,
                default: ReportStatus.PENDING,
            })];
        _fileUrl_decorators = [(0, typeorm_1.Column)({ name: 'file_url', nullable: true })];
        _errorMessage_decorators = [(0, typeorm_1.Column)({ name: 'error_message', nullable: true, type: 'text' })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _requestedBy_decorators, { kind: "field", name: "requestedBy", static: false, private: false, access: { has: function (obj) { return "requestedBy" in obj; }, get: function (obj) { return obj.requestedBy; }, set: function (obj, value) { obj.requestedBy = value; } }, metadata: _metadata }, _requestedBy_initializers, _requestedBy_extraInitializers);
        __esDecorate(null, null, _filters_decorators, { kind: "field", name: "filters", static: false, private: false, access: { has: function (obj) { return "filters" in obj; }, get: function (obj) { return obj.filters; }, set: function (obj, value) { obj.filters = value; } }, metadata: _metadata }, _filters_initializers, _filters_extraInitializers);
        __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _fileUrl_decorators, { kind: "field", name: "fileUrl", static: false, private: false, access: { has: function (obj) { return "fileUrl" in obj; }, get: function (obj) { return obj.fileUrl; }, set: function (obj, value) { obj.fileUrl = value; } }, metadata: _metadata }, _fileUrl_initializers, _fileUrl_extraInitializers);
        __esDecorate(null, null, _errorMessage_decorators, { kind: "field", name: "errorMessage", static: false, private: false, access: { has: function (obj) { return "errorMessage" in obj; }, get: function (obj) { return obj.errorMessage; }, set: function (obj, value) { obj.errorMessage = value; } }, metadata: _metadata }, _errorMessage_initializers, _errorMessage_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Report = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Report = _classThis;
}();
exports.Report = Report;
