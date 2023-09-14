import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesRoutingModule } from './notes/notes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiErrorService } from '@services/api-error.service';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { ErrorInterceptor } from './http-interceptors/error-interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { noteReducer } from 'src/state/notes/note.reducer';
import { NoteEffects } from 'src/state/notes/note.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotesRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,

    StoreModule.forRoot(
      { notes: noteReducer },
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictActionSerializability: true,
          strictActionTypeUniqueness: true,
          strictStateSerializability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    EffectsModule.forRoot([NoteEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    ApiErrorService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
