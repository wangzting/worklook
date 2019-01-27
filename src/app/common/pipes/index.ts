import { NgModule } from '@angular/core';
import { ErrorInfoToErrorMsg } from './errorInfoToErrorMsg.pipe';

@NgModule({
  declarations: [
    ErrorInfoToErrorMsg
  ],
  exports: [
    ErrorInfoToErrorMsg
  ]
})
export class PipeModule {}
