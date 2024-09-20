import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDTO, SignupAuthDTO } from './dto/create-auth.dto';

// @Public()

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupAuthDTO: SignupAuthDTO) {
    return this.authService.signup(signupAuthDTO);
  }

  @Post('signin')
  signIn(@Body() signinAuthDTO: SigninAuthDTO) {
    return this.authService.signIn(signinAuthDTO);
  }
}
