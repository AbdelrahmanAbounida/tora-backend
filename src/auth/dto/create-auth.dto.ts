import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class SignupAuthDTO extends CreateUserDto {}

export class SigninAuthDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// extends OmitProperty(CreateUserDto, [
//   'hashedPassword',
//   'role',
// ])
