import { Component, ElementRef, inject, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChartApiService } from '../../services/chart.api.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { ChartResponse } from '../../abstract/charts/charts.model';
import { ChartComponent } from '../chart/chart.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-dashboard-container',
    standalone: true,
    imports: [MatDatepickerModule, MatHint, MatFormField, MatInput, MatInputModule, ReactiveFormsModule, ChartComponent, MatButton],
    providers: [provideNativeDateAdapter()],
    templateUrl: './dashboard-container.component.html',
    styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {

    @ViewChild('chartContainer', {read: ViewContainerRef}) public chartContainer!: ViewContainerRef;
    @ViewChild('chartContainer', {read: ElementRef}) public chartContainerRef!: ElementRef<HTMLElement>;


    private readonly _renderer = inject(Renderer2);
    private readonly _api = inject(ChartApiService);
    private readonly _fb = inject(FormBuilder);

    public readonly rangeControl = this._fb.group({
        start: this._fb.control<Date>(new Date('2024-10-14'), [Validators.required]),
        end: this._fb.control<Date>(new Date('2024-10-20'), [Validators.required]),
    });

    public readonly chartData: Observable<ChartResponse> = this.rangeControl.valueChanges
        .pipe(
            startWith(this.rangeControl.value),
            switchMap(value => this._api.getChartsData()),
            shareReplay()
        )

    public readonly chartLabels = this.rangeControl.valueChanges
        .pipe(
            startWith(this.rangeControl.value),
            map(({start, end}) => {
                const dateArray: string[] = [];
                let currentDate = start as Date;

                while (currentDate <= (end as Date)) {
                    dateArray.push(currentDate.toISOString().split('T')[0]);
                    currentDate.setDate(currentDate.getDate() + 1);
                }

                return dateArray;
            }),
            shareReplay()
        )

    public addChart(): void {
        if (this.chartContainerRef.nativeElement.children.length >= 4 ) {
            return;
        }

        const chart = this.chartContainer.createComponent(ChartComponent);

        this._renderer.appendChild(this.chartContainerRef.nativeElement, chart.location.nativeElement);
    }
}
