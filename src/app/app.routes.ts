import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    // default route
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then(
            (component) => component.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (component) => component.RegisterComponent
          ),
      },
    ],
  },
  {
    path: "home",
    loadComponent() {
        return import("./pages/home/home.component").then(component => component.HomeComponent)
    },
  },
  {
    path: "employees",
    loadComponent() {
        return import("./pages/employees/employees.component").then(component => component.EmployeesComponent)
    }
  }
];
