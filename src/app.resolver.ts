import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './user/entity/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from './auth/jwt.guard';
import { RoleGuard, Roles } from './auth/role.guard';

@Resolver((of) => String)
export class AppResolver {
  @Query((returns) => String)
  index(): string {
    // if query name is not provided then the default query name will be same as method name. Here it will be index
    return 'NestJs graphql server';
  }

  @Query((returns) => String)
  @UseGuards(AuthGuard) // auth guard will have access to email and passowrd arguments
  login(
    // if query name is not provided then the default query name will be same as method name. Here it will be login
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Context('user') user: User, // we can get the user from context as it was set in AuthGuard
  ): string {
    let payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    // if authguard suceesfully autheticates the user(base on the args provided to login query) then we will send this jwt token response if not then the auth guard will throw an error
    return jwt.sign(payload, 'secretkey', { expiresIn: '6000s' }); // if you want to set token in cookie then instead of returing jwt token set it here
  }

  @Query((returns) => String)
  @UseGuards(JwtGuard) // JwtGuard is for authentication
  secretDataForAllUsers(@Context('user') user: User): string {
    return 'This is secured data for every user' + JSON.stringify(user);
  }

  @Query((returns) => String)
  // passing two authguards. JwtGuard for authentication and RoleGuard with "ADMIN" role for authorization
  @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
  secretDataForAdmin(@Context('user') user: User): string {
    return 'This is secured data for Admin only' + JSON.stringify(user);
  }
}
