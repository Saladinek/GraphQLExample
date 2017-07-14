import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import {ApolloModule} from "apollo-angular";
import {createNetworkInterface} from "apollo-client";
import { AppComponent } from './components/app/app.component';
import {OverviewComponent} from "./components/overview/overview.component";
import {appRoutes} from "./app.routes-config";
import ApolloClient from "apollo-client/ApolloClient";
import {EditAuthorComponent} from "./components/edit-author/edit-author.component";
import {AuthorsService} from "./services/authors.service";
import {authorsQuery} from "./models/QueriesAndMutations";



const networkInterface = createNetworkInterface('http://localhost:3000/graphql');

const client = new ApolloClient({
  networkInterface,
});

//const queryObserver = client.query(authorsQuery, {cachePolicy: 'no-cache'});


export function provideClient(): ApolloClient {
  return client;
}



@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    EditAuthorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [AuthorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
