import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MemberRegisterDto } from 'src/app/models/member-register-dto';
import { ToolsService } from 'src/app/services/tools.service';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.css']
})
export class MemberRegisterComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  memberRegisterDto: MemberRegisterDto = {
    memberId: null,
    name: null,
    surname: null,
    memberNumber: null,
    birthCityId: -1,
    birthOfDate: null,
    memberDate: null,
    decisionDate: null,
    decisionNumber: null,
    isDisabled: -1,
    tcnumber: null,
    motherName: null,
    fatherName: null,
    phoneNumber: null,
    statusParameterId: -1,
    associationBranchParameterId: -1
  }
  constructor(
    public _router: Router,
    public _toastrService: ToastrService,
    public _memberService: MemberService,
    public _toolsService: ToolsService,
  ) { }

  ngOnInit() {    
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'DD/MM/YYYY',
        showWeekNumbers: false,

      });

    this.getParameterCityList();
    this.getParameterMemberStatusList();
    this.getParameterAssociationBranchList();
  }


  saveMemberRegister() {
    this._memberService.postMemberRegister(this.memberRegisterDto).subscribe(data => {
      this._toastrService.success("İşlem başarılı şekilde kaydedilmiştir.", "Başarılı");
      this._router.navigate(['/memberDetail', data]);
    }, error => {
      this._toastrService.error("İşlem sırasında bir hata oluştu.", "İşlem başarısız");
      console.error(error)
    });
  }

  resetRegisterForm(form: NgForm) {
    form.reset();
    this.memberRegisterDto;
  }

 //#region parameters

 parameterCityList: CityParameterDto[];
 getParameterCityList() {
   this._toolsService.getCityParameterActiveList().subscribe(data => {
     this.parameterCityList = data;
   }, error => {
     console.error(error)
   });
 }
 
 parametermemberStatusList: ParameterListDto[];
 getParameterMemberStatusList() {
   this._toolsService.getParameterForSelect(2).subscribe(data => {
     this.parametermemberStatusList = data;
   }, error => {
     console.error(error)
   });
 }

 parameterassociationBranchList: ParameterListDto[];
 getParameterAssociationBranchList() {
   this._toolsService.getParameterForSelect(5).subscribe(data => {
     this.parameterassociationBranchList = data;
   }, error => {
     console.error(error)
   });
 }


 //#endregion













}
