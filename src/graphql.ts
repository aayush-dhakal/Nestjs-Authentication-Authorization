
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    index(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
    secretDataForAllUsers(): string | Promise<string>;
    secretDataForAdmin(): string | Promise<string>;
}

type Nullable<T> = T | null;
