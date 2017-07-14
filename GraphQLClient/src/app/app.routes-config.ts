import {Routes} from "@angular/router";
import {OverviewComponent} from "./components/overview/overview.component";
import {EditAuthorComponent} from "./components/edit-author/edit-author.component";


export const appRoutes: Routes = [
  {path: '', redirectTo:'/overview', pathMatch: 'full'},
  {path: 'new', component: EditAuthorComponent},
  {path: 'edit/:id', component: EditAuthorComponent},
  {path: 'overview', component: OverviewComponent}
];
