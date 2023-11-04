import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  // if a function is async then the return type will include Promise
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // It is used to share data and state across different parts of your application and provide a way for resolvers to access information that is relevant to the current operation. The context object is typically created when a GraphQL query or mutation is executed and can be populated with various data that might be needed by the resolvers.
    const ctx = GqlExecutionContext.create(context).getContext(); // here we use context to access request object
    const authorizationHeader = ctx.req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1]; // token is expected to be recived as "Bearer token" in header as authorization key

      try {
        const user = jwt.verify(token, 'secretkey');
        ctx.user = user;

        return true;
      } catch (error) {
        throw new HttpException(
          'Invalid token: ' + error.message,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
