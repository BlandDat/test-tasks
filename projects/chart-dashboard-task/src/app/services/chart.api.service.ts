import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartResponse } from '../abstract/charts/charts.model';

const chartDataMock = `{
  "Temperature": [
    {"date": "2024-10-14", "value": "21.54"},
    {"date": "2024-10-15", "value": "22.85"},
    {"date": "2024-10-16", "value": "23.21"},
    {"date": "2024-10-17", "value": "19.43"},
    {"date": "2024-10-18", "value": "20.71"},
    {"date": "2024-10-19", "value": "18.33"},
    {"date": "2024-10-20", "value": "21.08"}
  ],
  "Humidity": [
    {"date": "2024-10-14", "value": "55.43"},
    {"date": "2024-10-15", "value": "52.12"},
    {"date": "2024-10-16", "value": "50.32"},
    {"date": "2024-10-17", "value": "53.19"},
    {"date": "2024-10-18", "value": "48.44"},
    {"date": "2024-10-19", "value": "51.03"},
    {"date": "2024-10-20", "value": "49.77"}
  ],
  "Pressure": [
    {"date": "2024-10-14", "value": "1015.12"},
    {"date": "2024-10-15", "value": "1016.78"},
    {"date": "2024-10-16", "value": "1014.53"},
    {"date": "2024-10-17", "value": "1013.44"},
    {"date": "2024-10-18", "value": "1012.63"},
    {"date": "2024-10-19", "value": "1016.43"},
    {"date": "2024-10-20", "value": "1018.99"}
  ]
}`


@Injectable()
export class ChartApiService {

  public getChartsData(): Observable<ChartResponse> {
    return of(JSON.parse(chartDataMock));
  }

}
