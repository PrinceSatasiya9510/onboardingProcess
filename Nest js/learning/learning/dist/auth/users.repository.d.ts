import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
export type UsersRepository = Repository<UserEntity>;
