import {Component, ElementRef, ViewChild} from "@angular/core";
import {Message} from "../../Entity/Message";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessengerService} from "../../Service/MessengerService";
import {delay, filter} from "rxjs/operators";
import {merge} from "rxjs";

@Component({
    styleUrls: ["./style.shadow.scss"],
    templateUrl: "./template.pug"
})
export class MessengerRoute {

    @ViewChild("messages") messagesEl: ElementRef;
    public unreaded: number = 0;
    public messageForm = new FormGroup({
            text: new FormControl("", [
                Validators.required,
                Validators.minLength(1)
            ]),
            date: new FormControl(new Date()),
            isOwner: new FormControl(true)
        }
    );

    public isScrolledBottom: boolean = true;

    constructor(public service: MessengerService) {
        merge(
            this.service.onMessageSended,
            this.service.onMessageReceived.pipe(filter(() => this.isScrolledBottom)),
            this.service.onInterlocutorTyping.pipe(filter(() => this.isScrolledBottom))
        )
            .pipe(delay(10))
            .subscribe(
                () => this.scrollToBottom()
            )
        ;

        this.service.onMessageReceived.pipe(filter(() => !this.isScrolledBottom))
            .subscribe(() => this.unreaded++)
        ;
    }

    public ngAfterViewInit() {
        this.scrollToBottom()
    }


    private scrollToBottom() {
        this.messagesEl.nativeElement.scrollTop = this.messagesEl.nativeElement.scrollHeight;
    }

    public send() {
        if (this.messageForm.invalid) return;

        const message: Message = this.messageForm.value;
        message.text.slice(0, 2);
        this.service
            .send({message})
            .subscribe(() => this.messageForm.get("text").reset(""));
    }

    public onScroll(el) {
        this.isScrolledBottom = el.scrollTop + el.offsetHeight >= el.scrollHeight - 10;
        if(this.isScrolledBottom) {
            this.unreaded = 0;
        }
    }
}