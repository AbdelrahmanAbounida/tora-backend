import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    USER,
    ADMIN
}

// register enum 
registerEnumType(UserRole, {
    name: 'UserRole',
  });
