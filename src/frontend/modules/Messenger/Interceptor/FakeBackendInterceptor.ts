import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {delay, tap} from "rxjs/operators";
import {Message} from "../Entity/Message";
import {MessengerService} from "../Service/MessengerService";

@Injectable()
export class MessengerFakeBackendInterceptor implements HttpInterceptor {
    private readonly fakeMessages = [
        "Ok, so",
        "Incredible!",
        "You typing so fast!",
        "I'll be back",
        "Ceeeeeeeeeeeeeeeeeb!",
        "This guy has no chill",
        "Hire me, hire me, hire me! I'm pretty good"
    ];

    constructor(private messengerService: MessengerService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.endsWith("/messenger/send") && req.headers.has("fake")) {
            const message: Message = {
                text: this.getRandomMessageText(),
                isOwner: false,
                date: new Date()
            };

            return of(new HttpResponse({status: 200})).pipe(
                tap(() => {
                        of(null).pipe(
                            delay(200 + Math.random() * (2000 - 200)),
                            tap(() => this.messengerService.onInterlocutorTyping.emit(true)),
                            delay(200 + Math.random() * (2000 - 200))
                        ).subscribe(() => {
                            this.messengerService.onMessageReceived.emit(message);
                            this.messengerService.onInterlocutorTyping.emit(false);
                        })
                    }
                ));
        }

        return next.handle(req);
    }

    private getRandomMessageText(): string {
        return this.fakeMessages[Math.floor(Math.random() * this.fakeMessages.length)];
    }
}