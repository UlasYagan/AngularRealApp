import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberListComponent } from './pages/member/member-list/member-list.component';
import { MemberRegisterComponent } from './pages/member/member-register/member-register.component';
import { MemberDetailComponent } from './pages/member/member-detail/member-detail.component';
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component';
import { ParameterComponent } from './pages/tools/parameter/parameter.component';
import { ParameterListComponent } from './pages/tools/parameter-list/parameter-list.component';

const routes: Routes = [
  { path: 'member', component: MemberListComponent },
  { path: 'memberDetail/:id', component: MemberDetailComponent },
  { path: 'memberRegister', component: MemberRegisterComponent },
  { path: 'employee', component: EmployeeListComponent },
  {
    path: 'tools', component: ParameterComponent,
    children: [
      { path: 'parameterlist/:id', component: ParameterListComponent },
    ]
  },
  { path: '', redirectTo: '/member', pathMatch: 'full' },
  { path: '**', redirectTo: '/member', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
