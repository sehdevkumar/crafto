import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event'])
    onInputChange(event: { stopPropagation: () => void; }) {
        const initalValue = this.el.nativeElement.value;

        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

}