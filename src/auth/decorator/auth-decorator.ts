import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { USER_ROLE_ENUM } from 'src/modules/users/constants/role.enum';
import { JWTAuthGuard } from '../guards/jwt.guard';
import { Public } from '../guards/public.guard';

// a sample decorator to merge all together

export function Auth(role: USER_ROLE_ENUM, isPublic: boolean) {
  if (isPublic) {
    return applyDecorators(SetMetadata('role', role), Public());
  } else {
    return applyDecorators(SetMetadata('role', role), UseGuards(JWTAuthGuard));
  }
}
