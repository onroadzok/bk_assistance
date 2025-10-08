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
exports.Attendance = exports.AttendanceStatus = void 0;
var typeorm_1 = require("typeorm");
var AttendanceStatus;
(function (AttendanceStatus) {
    AttendanceStatus["PRESENTE"] = "PRESENTE";
    AttendanceStatus["AUSENTE"] = "AUSENTE";
    AttendanceStatus["TARDANZA"] = "TARDANZA";
})(AttendanceStatus || (exports.AttendanceStatus = AttendanceStatus = {}));
var Attendance = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('attendances'), (0, typeorm_1.Index)(['studentId', 'classId']), (0, typeorm_1.Index)(['courseId', 'createdAt'])];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _studentId_decorators;
    var _studentId_initializers = [];
    var _studentId_extraInitializers = [];
    var _classId_decorators;
    var _classId_initializers = [];
    var _classId_extraInitializers = [];
    var _courseId_decorators;
    var _courseId_initializers = [];
    var _courseId_extraInitializers = [];
    var _arrivalTime_decorators;
    var _arrivalTime_initializers = [];
    var _arrivalTime_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _coordinates_decorators;
    var _coordinates_initializers = [];
    var _coordinates_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var Attendance = _classThis = /** @class */ (function () {
        function Attendance_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.studentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _studentId_initializers, void 0));
            this.classId = (__runInitializers(this, _studentId_extraInitializers), __runInitializers(this, _classId_initializers, void 0));
            this.courseId = (__runInitializers(this, _classId_extraInitializers), __runInitializers(this, _courseId_initializers, void 0));
            this.arrivalTime = (__runInitializers(this, _courseId_extraInitializers), __runInitializers(this, _arrivalTime_initializers, void 0));
            this.status = (__runInitializers(this, _arrivalTime_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.coordinates = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _coordinates_initializers, void 0));
            this.createdAt = (__runInitializers(this, _coordinates_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return Attendance_1;
    }());
    __setFunctionName(_classThis, "Attendance");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _studentId_decorators = [(0, typeorm_1.Column)({ name: 'student_id' })];
        _classId_decorators = [(0, typeorm_1.Column)({ name: 'class_id' })];
        _courseId_decorators = [(0, typeorm_1.Column)({ name: 'course_id' })];
        _arrivalTime_decorators = [(0, typeorm_1.Column)({ name: 'arrival_time', type: 'timestamp' })];
        _status_decorators = [(0, typeorm_1.Column)({
                type: 'enum',
                enum: AttendanceStatus,
                default: AttendanceStatus.PRESENTE,
            })];
        _coordinates_decorators = [(0, typeorm_1.Column)({ type: 'jsonb', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)({ name: 'created_at' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _studentId_decorators, { kind: "field", name: "studentId", static: false, private: false, access: { has: function (obj) { return "studentId" in obj; }, get: function (obj) { return obj.studentId; }, set: function (obj, value) { obj.studentId = value; } }, metadata: _metadata }, _studentId_initializers, _studentId_extraInitializers);
        __esDecorate(null, null, _classId_decorators, { kind: "field", name: "classId", static: false, private: false, access: { has: function (obj) { return "classId" in obj; }, get: function (obj) { return obj.classId; }, set: function (obj, value) { obj.classId = value; } }, metadata: _metadata }, _classId_initializers, _classId_extraInitializers);
        __esDecorate(null, null, _courseId_decorators, { kind: "field", name: "courseId", static: false, private: false, access: { has: function (obj) { return "courseId" in obj; }, get: function (obj) { return obj.courseId; }, set: function (obj, value) { obj.courseId = value; } }, metadata: _metadata }, _courseId_initializers, _courseId_extraInitializers);
        __esDecorate(null, null, _arrivalTime_decorators, { kind: "field", name: "arrivalTime", static: false, private: false, access: { has: function (obj) { return "arrivalTime" in obj; }, get: function (obj) { return obj.arrivalTime; }, set: function (obj, value) { obj.arrivalTime = value; } }, metadata: _metadata }, _arrivalTime_initializers, _arrivalTime_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _coordinates_decorators, { kind: "field", name: "coordinates", static: false, private: false, access: { has: function (obj) { return "coordinates" in obj; }, get: function (obj) { return obj.coordinates; }, set: function (obj, value) { obj.coordinates = value; } }, metadata: _metadata }, _coordinates_initializers, _coordinates_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Attendance = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Attendance = _classThis;
}();
exports.Attendance = Attendance;
