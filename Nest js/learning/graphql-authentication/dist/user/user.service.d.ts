import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
export declare class UserService {
    readonly userRepo: Repository<UserEntity>;
    constructor(userRepo: Repository<UserEntity>);
    findUserByEmail(email: string): Promise<UserEntity | null>;
}
