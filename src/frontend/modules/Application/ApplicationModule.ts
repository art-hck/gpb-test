import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {appRoutes} from "../../app/routes";
import "../../assets/styles/index.scss";

import {ApplicationComponent} from "./Component/Application";
import {RouteHelperService} from "./Service/RouteHelperService";

import {CommonModule} from "../Common/CommonModule";
import {MessengerModule} from "../Messenger/MessengerModule";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: "reload"}),
        HttpClientModule,
        MessengerModule
    ],

    declarations: [
        ApplicationComponent,
    ],
    providers: [
        RouteHelperService
    ],
    exports: [ApplicationComponent]
})
export class ApplicationModule {}
