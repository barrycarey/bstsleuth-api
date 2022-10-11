import {Router} from "express";

export interface IComponentRoutes<T> {
    readonly name: string;
    readonly controller: T;
    readonly router: Router;

    initRoutes(): void;
    initChildRoutes?(): void;
}
