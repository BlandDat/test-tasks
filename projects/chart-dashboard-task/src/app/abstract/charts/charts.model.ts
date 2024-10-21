export interface ChartData {
    date: string;
    value: number;
}

export type Sensors = 'Humidity' | 'Pressure' | 'Temperature'

export type ChartResponse = { [K in Sensors]: ChartData[] }