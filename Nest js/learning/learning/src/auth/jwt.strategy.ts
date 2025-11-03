import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { JwtPayloadInterface } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "000",
        });
    }

    async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
        const user = await this.usersRepo.findOne({ where: { userName: payload.userName } });
        console.log("🚀 ~ JwtStrategy ~ validate ~ user:", user)

        if (!user) {
            console.log("object")
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}