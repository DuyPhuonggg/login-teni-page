import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, RouterOutlet, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
