import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { userName, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)
        const user = this.userRepository.create({ userName, password: hashPassword });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code == 23505) {
                throw new ConflictException('User name already exits!')
            } else {
                console.log("object")
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { userName, password } = authCredentialsDto
        const user = await this.userRepository.findOne({ where: { userName } })

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayloadInterface = { userName }
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken }
        } else {
            console.log("object")
            throw new UnauthorizedException('Please check username and password!')
        }
    }
}