import { Component, ElementRef, Host, HostBinding, Input, NgZone, Renderer2 } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Platform } from '@angular/cdk/platform';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'button[viewerDisabledComponentFlat], button[viewerDisabledComponent]',
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: ['matTooltip:viewerTooltip']
    }
  ],
  standalone: true,
  imports: [],
  templateUrl: './viewer-disabled-component-directive.component.html',
  styleUrl: './viewer-disabled-component-directive.component.scss'
})
export class ViewerDisabledComponentDirectiveComponent extends MatButton{

  @Input({alias: 'viewerDisabled', required: false})
  public set disabledViewer(value: boolean) {
    this.disabled = value;
    this.disableRipple = value;
    this._matTooltip.disabled = !value;
    this.renderer.setStyle(this._elementRef.nativeElement, 'cursor', value ? 'not-allowed' : 'auto')
  }
  @HostBinding('class') get class(){

    if(this.elementRef.nativeElement.hasAttribute('viewerDisabledComponentFlat')) {
      return 'mdc-button mat-mdc-button mat-mdc-unelevated-button'
    }

    if(this.elementRef.nativeElement.hasAttribute('viewerDisabledComponent')) {
      return 'mdc-button mat-mdc-button'
    }

    return 'mdc-button'
  }

  @HostBinding('style.pointer-events') pointerEvents = 'all'

  constructor(
      @Host() private readonly _matTooltip: MatTooltip,
      readonly elementRef: ElementRef<HTMLElement>,
      readonly platform: Platform,
      readonly zone: NgZone,
      private readonly renderer: Renderer2

  ){
    super(elementRef, platform, zone)
  }
}
