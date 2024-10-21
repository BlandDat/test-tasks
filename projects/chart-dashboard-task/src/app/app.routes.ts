import { Routes } from '@angular/router';
import { ChartApiService } from './services/chart.api.service';

export const routes: Routes = [{
    path: '',
    providers: [ChartApiService],
    loadComponent: () => import('./features/dashboard-container/dashboard-container.component').then(c => c.DashboardContainerComponent)
}];
