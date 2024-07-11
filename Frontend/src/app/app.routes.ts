import { Routes } from "@angular/router";
import { Page404Component } from "./components/layout-area/page404/page404.component";
import { RegisterComponent } from "./components/AuthArea/register/register.component";
import { LoginComponent } from "./components/AuthArea/login/login.component";
import { VacationListComponent } from "./components/VacationsArea/vacation-list/vacation-list.component";
import { AddComponent } from "./components/AdminArea/add/add.component";
import { EditComponent } from "./components/AdminArea/edit/edit.component";
import { ReportComponent } from "./components/AdminArea/report/report.component";
import { AboutComponent } from "./components/AboutArea/about/about.component";
import { SingleVacationComponent } from "./components/VacationsArea/single-vacation/single-vacation.component";
import { PaymentComponent } from "./components/SharedArea/payment/payment.component";

export const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "add", component: AddComponent },
  { path: "edit/:_id", component: EditComponent },
  { path: "report", component: ReportComponent },
  { path: "about", component: AboutComponent },
  { path: "home", component: VacationListComponent },
  { path: "vacations/:_id", component: SingleVacationComponent },
  { path: "payment/:_id", component: PaymentComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: Page404Component },
];
