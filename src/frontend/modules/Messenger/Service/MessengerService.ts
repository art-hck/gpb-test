import {EventEmitter, Injectable} from "@angular/core";
import {MessengerRESTService} from "./MessengerRESTService";
import {SendMessageRequest} from "../Http/SendMessageRequest";
import {Message} from "../Entity/Message";
import {finalize, map, switchMap, tap,} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable()
export class MessengerService {
    private readonly maxCachedMessages = 20;
    private messages: Message[] = [];
    public onMessageReceived = new EventEmitter<Message>();
    public onMessageSended = new EventEmitter<Message>();
    public onInterlocutorTyping = new EventEmitter<boolean>();

    constructor(private rest: MessengerRESTService) 
    {
        this.onMessageReceived
            .pipe(
                tap(message => this.messages.push(message)),
                map(() => this.messages.slice(Math.max(this.messages.length - this.maxCachedMessages, 0)))
            )
            .subscribe(messages => this.cache(messages))
        ;
    }


    public send(sendMessageRequest: SendMessageRequest): Observable<Message[]> 
    {
        this.messages.push(sendMessageRequest.message);
        return this.rest.send(sendMessageRequest).pipe(
            map(() => this.messages.slice(Math.max(this.messages.length - this.maxCachedMessages, 0))),
            tap((messages:Message[]) => this.cache(messages)),
            finalize(() => this.onMessageSended.emit(sendMessageRequest.message))
        );
    }

    public get(): Observable<Message[]> 
    {
        return of(this.messages).pipe(
            switchMap(messages => {

                if (messages.length == 0) {
                    this.messages = messages = JSON.parse(localStorage.getItem('messages') || "[]");
                }

                return of(messages);
            })
        )
    }

    public cache(messages: Message[]): void 
    {
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}