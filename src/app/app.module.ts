import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgxMaskModule } from 'ngx-mask'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from './services/general.service';
import { ToolsService } from './services/tools.service';
import { MemberService } from './services/member.service';
import { ValidatorDirective } from './directive/validator.directive';
import { MemberListComponent } from './pages/member/member-list/member-list.component';
import { environment } from 'src/environments/environment';
import { MemberRegisterComponent } from './pages/member/member-register/member-register.component';
import { MemberDetailComponent } from './pages/member/member-detail/member-detail.component';
import { AddressComponent } from './pages/communication/address/address.component';
import { EmailComponent } from './pages/communication/email/email.component';
import { PhoneComponent } from './pages/communication/phone/phone.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { RelationListComponent } from './pages/member/relation-list/relation-list.component';
import { InsuranceInfoComponent } from './pages/member/insurance-info/insurance-info.component';
import { ParameterComponent } from './pages/tools/parameter/parameter.component';
import { ParameterListComponent } from './pages/tools/parameter-list/parameter-list.component';
import { CityParameterComponent } from './pages/tools/city-parameter/city-parameter.component';
import { TownParameterComponent } from './pages/tools/town-parameter/town-parameter.component';
import { DocumentComponent } from './pages/general/document/document.component';
 
@NgModule({
  declarations: [
    AppComponent,
    ValidatorDirective,
    MemberListComponent,
    MemberRegisterComponent,
    MemberDetailComponent,
    AddressComponent,
    EmailComponent,
    PhoneComponent,
    EmployeeListComponent,
    InsuranceInfoComponent,
    RelationListComponent,
    ParameterComponent,
    ParameterListComponent,
    CityParameterComponent,
    TownParameterComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TabViewModule,
    AccordionModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot(environment.toastr),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    GeneralService,
    ToolsService,
    MemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
