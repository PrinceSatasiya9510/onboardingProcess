import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "./auth/auth.guard";
import { UserEntity } from "./user/user.entity";
import * as jwt from "jsonwebtoken";
import { JwtGuard } from "./auth/jwt.guard";
import { RoleGuard, Roles } from "./auth/role.guard";
import 'dotenv/config';


@Resolver(() => String)
export class AppResolver {

    @Query(returns => String)
    tempResolver(): string {
        return "This is Temp Resolver"
    }

    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
    securedResourceForAdmin(@Context('user') user: UserEntity): any {
        return 'for ADMIN' + JSON.stringify(user)
    }

    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
    securedResourceForUser(@Context('user') user: UserEntity): any {
        return 'for user' + JSON.stringify(user)
    }

    @Query(returns => String)
    @UseGuards(AuthGuard)
    login(
        @Args({ name: "email", type: () => String }) email: string,
        @Args({ name: "password", type: () => String }) password: string,
        @Context('user') user: UserEntity
    ): string {
        const payload = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }

        return jwt.sign(payload, process.env.JWT_SECRET ?? "0000", { expiresIn: "3600s" })
    }
}