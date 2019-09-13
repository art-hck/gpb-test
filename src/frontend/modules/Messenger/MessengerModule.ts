import {NgModule} from "@angular/core";
import {MessengerRoute} from "./Route/Messenger";
import {MessengerRESTService} from "./Service/MessengerRESTService";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CommonModule} from "../Common/CommonModule";
import {MessengerFakeBackendInterceptor} from "./Interceptor/FakeBackendInterceptor";
import {MessengerService} from "./Service/MessengerService";
import {MessengerInputComponent} from "./Component/MessengerInput";
import {MessageComponent} from "./Component/Message";
import {MessageTypingComponent} from "./Component/MessageTyping";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MessengerRoute,
        MessengerInputComponent,
        MessageTypingComponent,
        MessageComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MessengerFakeBackendInterceptor,
            multi: true,
        },
        MessengerRESTService,
        MessengerService
    ]
})
export class MessengerModule {}