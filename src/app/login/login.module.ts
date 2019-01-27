import { LoginComponent } from './login/login.component';

import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../common/shared';
import { ServicesModule } from '../common/services/services.module';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule,
    // 可以直接调用模块的静态方法（static），这里调用forRoot是为了返回一个ModuleWithProviders，
    // 也就是一个带有provides的模块
    ServicesModule.forRoot(),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
})
export class LoginModule {
}
