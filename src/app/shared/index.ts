import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule,
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { ErrorComponent } from './error/error.component';
import { EqualGroupComponent } from './equal-group/equal-group.component';
import { CombatInputComponent } from './combat/combat-input/combat-input.component';
import { SelfInputComponent } from './self-defining/self-input/self-input.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { DirectivesModule } from '../common/directives';
import { PipeModule } from '../common/pipes';

const material = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonToggleModule,
];

const commonModule = [
  HttpClientModule,
  CommonModule,
  DirectivesModule,
  FormsModule,
  ReactiveFormsModule,
  PipeModule,
];

@NgModule({
  imports: [
    ...material,
    ...commonModule
  ],
  exports: [
    ...material,
    ...commonModule,
    ImageListSelectComponent,
    CombatInputComponent,
    ErrorComponent,
    EqualGroupComponent,
    SelfInputComponent,
    AgeInputComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    CombatInputComponent,
    ErrorComponent,
    EqualGroupComponent,
    SelfInputComponent,
    AgeInputComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule {}
