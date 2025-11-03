import { CanActivate, ExecutionContext } from "@nestjs/common";
import 'dotenv/config';
export declare class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
