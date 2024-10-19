import { Directive, ElementRef, Host, HostBinding, Input, Renderer2 } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
    selector: '' +
        '[mat-button] [viewerDisabled], ' +
        '[mat-flat-button] [viewerDisabled], ' +
        '[mat-raised-button] [viewerDisabled], ' +
        '[mat-stroked-button] [viewerDisabled]',
    hostDirectives: [
        {
            directive: MatTooltip,
            inputs: ['matTooltip:viewerTooltip']
        }
    ],
    standalone: true
})
export class ViewerDisabledHostDirective {

    @Input({alias: 'viewerDisabled', required: true})
    public set disabled(value: boolean) {
        this._matButtonBase.disabled = value;
        this._matButtonBase.disableRipple = value;
        this._matTooltip.disabled = !value;
        this.renderer.setStyle(this._elementRef.nativeElement, 'cursor', value ? 'not-allowed' : 'auto')
    }

    @HostBinding('style.pointer-events') pointerEvents = 'all'

    constructor(
        @Host() private readonly _matButtonBase: MatButton,
        @Host() private readonly _matTooltip: MatTooltip,
        @Host() private readonly _elementRef: ElementRef,
        private readonly renderer: Renderer2
    ) {
    }

}
