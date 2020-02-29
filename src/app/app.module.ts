import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AuthService } from './shared/services/auth.service';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    PublicComponent,
    SecureComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    RouterModule,
    ToastrModule.forRoot(),
    PokemonModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('token');
}
