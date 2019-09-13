import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule as AngularCommonModule} from "@angular/common";

@NgModule({
    imports: [
        AngularCommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
    ],
    exports: [
        AngularCommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class CommonModule {
}