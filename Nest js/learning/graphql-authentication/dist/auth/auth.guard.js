"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("../user/user.service");
let AuthGuard = class AuthGuard {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        const { email, password } = ctx.req.body.variables;
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password == password) {
            ctx.user = user;
            return true;
        }
        throw new common_1.HttpException('UnAuthenticated!', common_1.HttpStatus.UNAUTHORIZED);
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map