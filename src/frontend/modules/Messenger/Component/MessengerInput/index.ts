import {Component, ElementRef, forwardRef, OnChanges, Renderer2, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'messenger-input',
    styleUrls: ['./style.shadow.scss'],
    templateUrl: './template.pug',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MessengerInputComponent),
        multi: true
    }]
})
export class MessengerInputComponent implements ControlValueAccessor, OnChanges {
    private onChange: (value: string) => void = () => {};
    private onTouched = () => {};
    private _value = "";

    @ViewChild('textarea') public textarea: ElementRef;

    constructor(private el: ElementRef, private readonly renderer: Renderer2) {}

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.onChange(value);
    }

    ngOnChanges() {
        this.onChange(this.value);
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }
    
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    onInput() {
        this.value = this.textarea.nativeElement.innerText || '';
    }

    writeValue(value) {
        this.value = value || '';

        this.renderer.setProperty(
            this.textarea.nativeElement,
            'innerText',
            value,
        );
    }
}