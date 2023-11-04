import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Roles = {
  ADMIN: 'ADMIN',
  NORMAL_USER: 'NORMAL_USER',
};

export class RoleGuard implements CanActivate {
  public role: string;

  constructor(role: string) {
    this.role = role;
  }

  canActivate(context: ExecutionContext): boolean {
    // It is used to share data and state across different parts of your application and provide a way for resolvers to access information that is relevant to the current operation. The context object is typically created when a GraphQL query or mutation is executed and can be populated with various data that might be needed by the resolvers.
    const ctx = GqlExecutionContext.create(context).getContext(); // here we use context to access request object
    const { role } = ctx.user; // getting the role of logged in user from context

    if (role === this.role) return true; // if the lopgged in user role matches with the role defined in guard then return true
    return false;
  }
}
