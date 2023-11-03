import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  // if a function is async then the return type will include Promise
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // It is used to share data and state across different parts of your application and provide a way for resolvers to access information that is relevant to the current operation. The context object is typically created when a GraphQL query or mutation is executed and can be populated with various data that might be needed by the resolvers.
    const ctx = GqlExecutionContext.create(context).getContext(); // here we use context to access request object
    const { email, password } = ctx.req.body.variables;

    const user: User = await this.userService.findUserByEmail(email);

    // if passowrd is encrypted then we will require it to decrypt first
    if (user && user.password === password) {
      // here we will add user to the context which will be persisted across the application
      ctx.user = user;
      return true; // this is basically like calling next() in middleware. When true is returned the control is passed to the calling method and that method will provide the response
    } else {
      throw new HttpException('UnAuthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
