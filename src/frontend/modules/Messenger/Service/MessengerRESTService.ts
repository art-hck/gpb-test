import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SendMessageRequest} from "../Http/SendMessageRequest";
import {Observable} from "rxjs";

@Injectable()
export class MessengerRESTService {

    constructor(private http: HttpClient) {}
    
    public send(sendMessageRequest: SendMessageRequest): Observable<void> 
    {
        const url = `/messenger/send`;
        
        return this.http
            .put<void>(url, sendMessageRequest, {headers: {fake: "fake"}})
        ;
    }
}