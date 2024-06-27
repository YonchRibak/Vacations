import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { DataListComponent } from './components/data-area/data-list/data-list.component';
import { AddDataComponent } from './components/data-area/add-data/add-data.component';
import { Page404Component } from './components/layout-area/page404/page404.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: DataListComponent },
    { path: "new", component: AddDataComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: Page404Component },
];
