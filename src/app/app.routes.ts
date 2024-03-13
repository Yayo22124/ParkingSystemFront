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
    async loadComponent() {
        const component = await import("./pages/home/home.component");
      return component.HomeComponent;
    },
  },
  {
    path: "employees",
    async loadComponent() {
        const component = await import("./pages/employees/employees.component");
      return component.EmployeesComponent;
    }
  },
  {
    path: "clients",
    async loadComponent() {
        const component = await import("./pages/clients/clients.component");
      return component.ClientsComponent;
    }
  },
  {
    path: "vehicles",
    async loadComponent() {
        const component = await import("./pages/vehicles/vehicles.component");
      return component.VehiclesComponent;
    }
  },
  {
    path: "fees",
    async loadComponent() {
        const component = await import("./pages/fees/fees.component");
      return component.FeesComponent;
    }
  },
  {
    path: "slots",
    async loadComponent() {
        const component = await import("./pages/slots/slots.component");
      return component.SlotsComponent;
    }
  },
  {
    path: "records",
    async loadComponent() {
        const component = await import("./pages/records/records.component");
      return component.RecordsComponent;
    }
  },
  {
    path: "sensors",
    children: [
      {
        path:"humidity-sensors",
        async loadComponent() {
          const component = await import("./pages/humidity-sensors/humidity-sensors.component")
          return component.HumiditySensorsComponent;
        },
      },
      {
        path:"proximity-sensors",
        async loadComponent() {
          const component = await import("./pages/proximity-sensors/proximity-sensors.component")
          return component.ProximitySensorsComponent;
        },
      },
      {
        path:"photoresistors",
        async loadComponent() {
          const component = await import("./pages/photoresistors/photoresistors.component")
          return component.PhotoresistorsComponent;
        },
      },
      {
        path:"fan-actuators",
        async loadComponent() {
          const component = await import("./pages/fans/fans.component")
          return component.FANsComponent;
        },
      },
    ]
  },
  {
    path: "update",
    children: [
      {
        path: "client/:uuid",
        async loadComponent() {
          const component = await import("./update/update-client/update-client.component");
          return component.UpdateClientComponent;
        },
      },
      {
        path: "employee/:uuid",
        async loadComponent() {
          const component = await import("./update/update-employee/update-employee.component");
          return component.UpdateEmployeeComponent;
        },
      },
      {
        path: "vehicle/:uuid",
        async loadComponent() {
          const component = await import("./update/update-vehicle/update-vehicle.component");
          return component.UpdateVehicleComponent;
        },
      },
      {
        path: "fee/:uuid",
        async loadComponent() {
          const component = await import("./update/update-fee/update-fee.component");
          return component.UpdateFeeComponent;
        },
      },
      {
        path: "slot/:uuid",
        async loadComponent() {
          const component = await import("./update/update-slot/update-slot.component");
          return component.UpdateSlotComponent;
        },
      },
      {
        path: "record/:uuid",
        async loadComponent() {
          const component = await import("./update/update-record/update-record.component");
          return component.UpdateRecordComponent;
        },
      }
    ]
  }
];
