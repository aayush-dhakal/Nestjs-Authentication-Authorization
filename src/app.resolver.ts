import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { UseGuards } from '@nestjs/common';

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
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ): string {
    // if query name is not provided then the default query name will be same as method name. Here it will be login
    return 'User authenticated successfully'; // if authguard suceesfully autheticates the user then we will send this response if not then the auth guard will throw an error
  }
}
