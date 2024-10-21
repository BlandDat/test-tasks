import { Pipe, PipeTransform } from '@angular/core';
import { ChartResponse, Sensors, ChartData } from '../abstract/charts/charts.model';

@Pipe({
  name: 'dataByKey',
  standalone: true
})

export class DataByKeyPipe implements PipeTransform {

  public transform(sensor: Sensors[] | null, data: ChartResponse | null, color: string[] | null): { label: string, data: number[], color: string }[] {
    console.log(data)
    return sensor!.map((sensor, index) => {
      return {
        label: sensor,
        data: data![sensor].map(chartData => chartData.value),
        color: color![index] ?? '',
      }
    })
  }

}
