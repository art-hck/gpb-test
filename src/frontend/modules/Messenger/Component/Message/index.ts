import {Component, HostBinding, Input} from "@angular/core";
import {Message} from "../../Entity/Message";

@Component({
    selector: "message",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class MessageComponent {
    @Input() message: Message;

    @HostBinding("class.isOwner")
    get isOwner() { 
        return this.message.isOwner; 
    }
}