import { Component, inject, Input, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { DashboardContainerComponent } from '../dashboard-container/dashboard-container.component';
import { Sensors } from '../../abstract/charts/charts.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { DataByKeyPipe } from '../../pipes/data-by-key.pipe';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { map, Observable } from 'rxjs';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-chart',
    standalone: true,
    imports: [
        BaseChartDirective,
        AsyncPipe,
        DataByKeyPipe,
        NgIf,
        ReactiveFormsModule,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        MatButton,
        MatAnchor,
        MatIcon,
        MatMiniFabButton
    ],
    templateUrl: './chart.component.html',
    styleUrl: './chart.component.scss'
})
export class ChartComponent {
    public chartColors: string[] = ['#ff6384', '#36a2eb', '#cc65fe'];

    public readonly dashboard = inject(DashboardContainerComponent);
    public readonly fb = inject(FormBuilder);

    public readonly formEnabled = signal(true);
    public readonly chartTypes = signal<ChartType[]>(['line', 'bar']);
    public readonly chartData$ = this.dashboard.chartData;
    public readonly chartLabels$ = this.dashboard.chartLabels;
    public readonly chartSensors$: Observable<Sensors[]> = this.dashboard.chartData.pipe(
        map(value => {
            return Object.entries(value).reduce((accum, [key, value]) => {

                accum.push(key as Sensors);

                return accum;
            }, [] as Sensors[])
        })
    )

    public readonly chartConfigForm = this.fb.group({
        chartType: this.fb.control<ChartType>('line', [Validators.required]),
        sensorType: this.fb.control<Sensors[]>([], [Validators.required]),
        chartColors: this.fb.control<string[]>([], [Validators.required]),
    })

    public readonly lineChartOptions = {}

    public updateChart(): void {
        this.formEnabled.set(false)
    }
}
