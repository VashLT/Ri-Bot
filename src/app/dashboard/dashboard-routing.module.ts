import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'crear-proyecto',
        component: CreateProjectComponent,
      },
      {
        path: 'proyecto/:id',
        component: ProjectComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '**',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
