import {Component} from "@angular/core";
import {RouteHelperService} from "../../Service/RouteHelperService";

@Component({
    selector: "application",
    styleUrls: ["./style.shadow.scss"],
    templateUrl: "./template.pug"
})
export class ApplicationComponent {
    constructor(private routeHelperService: RouteHelperService) {}

    ngOnInit() {
        this.routeHelperService.metaTagsWatcher();
    }
}