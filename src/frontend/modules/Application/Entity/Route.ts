import {Route} from "@angular/router";

export interface AppRoute extends Route {
    children?: AppRoute[];
    data?: {
        [name: string]: any;
        title?: string;
        description?: string;
    }
}

export type AppRoutes = AppRoute[];