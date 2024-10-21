import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponentComponent } from './layout/layout-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, LayoutComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  constructor(
  ){}

  public ngOnInit(): void {

  }
}
