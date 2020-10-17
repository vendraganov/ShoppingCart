import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //We Load them using Lazy Loading via Router Module
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    // share module has all the module and components that we can use it in the entire app
    SharedModule,
    CoreModule
  ],
  providers: [
   // all providers are in the core module
  ],
  bootstrap: [AppComponent],
  // we declare component which we created using the ComponentFactoryResolver.resolveComponentFactory
  entryComponents: []
})
export class AppModule { }
