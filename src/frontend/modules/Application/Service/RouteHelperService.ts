import {DOCUMENT} from "@angular/common";
import {Inject, Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs/internal/operators";

@Injectable()
export class RouteHelperService {

    constructor(
        private titleService: Title,
        private metaService: Meta,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document
    ) {}

    public metaTagsWatcher(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            filter(route => route.outlet === "primary"),
            mergeMap(route => route.data)
        ).subscribe(data => {
            if(data["title"]) {
                this.titleService.setTitle(data["title"]);
            }
            
            if(data["description"]) {
                this.metaService.addTag({"name": "description", "content": data["description"]})
            }
        });
    }
}