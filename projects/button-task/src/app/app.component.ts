import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ViewerDisabledHostDirective } from './directvies/viewer-disabled-host.directive';
import {
  ViewerDisabledComponentDirectiveComponent
} from './components/viewer-disabled-component-directive/viewer-disabled-component-directive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, ViewerDisabledHostDirective, ViewerDisabledComponentDirectiveComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
