import { Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { JwtPayloadInterface } from "./jwt-payload.interface";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepo;
    constructor(usersRepo: Repository<UserEntity>);
    validate(payload: JwtPayloadInterface): Promise<UserEntity>;
}
export {};
