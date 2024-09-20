import { IsEmail, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { USER_ROLE_ENUM } from '../constants/role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @Min(4)
  @IsString()
  password: string;

  // @Transform(({ value }) => value ?? USER_ROLE_ENUM.USER)
  @IsEnum(USER_ROLE_ENUM)
  role: USER_ROLE_ENUM;
}
