import { UserEntity } from "./user/user.entity";
import 'dotenv/config';
export declare class AppResolver {
    tempResolver(): string;
    securedResourceForAdmin(user: UserEntity): any;
    securedResourceForUser(user: UserEntity): any;
    login(email: string, password: string, user: UserEntity): string;
}
