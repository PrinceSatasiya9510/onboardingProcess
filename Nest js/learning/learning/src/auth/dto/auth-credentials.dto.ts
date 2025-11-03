import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    userName: string;

    @IsNotEmpty()
    @MinLength(6, { message: 'password minimum length is 6 letters' })
    @MaxLength(20, { message: 'password maximum length is 20 letters' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is weak!' })
    password: string;
}