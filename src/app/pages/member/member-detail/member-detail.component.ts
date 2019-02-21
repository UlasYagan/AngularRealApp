import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { MemberDetailDto } from 'src/app/models/member-detail-dto';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { MemberService } from 'src/app/services/member.service';
import { ToastrService } from 'ngx-toastr';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  memberDetailDto: MemberDetailDto = {
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
    associationBranchParameterId: -1,
    exitDate: null,
    exitDecisionNumber: null,
    reasonForExit: null
  }

  public memberID: number;
  constructor(
    private _route: ActivatedRoute,
    private _toolsService: ToolsService,
    private _memberService: MemberService,
    private _toastrService: ToastrService,
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

    this.memberID = parseInt(this._route.snapshot.paramMap.get('id'));
    this.getMemberDetail(this.memberID);
  }


  editMemberDetail() {
    this._memberService.putMemberDetailEdit(this.memberDetailDto).subscribe(
      data => {
        this._toastrService.success("İşlemler başarılı şekilde güncellenmiştir.", "başarılı", {});
        this.getMemberDetail(data.memberId);
      },
      error => {
        console.error(error)
      });

  }

  getMemberDetail(id) {
    this._memberService.getMemberDetail(this.memberID).subscribe(data => {
      this.memberDetailDto = data;
    }, error => {
      console.error(error)
    });



  }

  statusParameterChange(event) {
    let value = event.target.value;
    if (value != 5) {
      this.memberDetailDto.reasonForExit = null;
      this.memberDetailDto.exitDate = null;
      this.memberDetailDto.exitDecisionNumber = null;

    }
  }


  //#region parameters

  parameterCityList: CityParameterDto[];
  getParameterCityList() {
    this._toolsService.getCityParameterList().subscribe(data => {
      this.parameterCityList = data;
    });
  }

  parametermemberStatusList: ParameterListDto[];
  getParameterMemberStatusList() {
    this._toolsService.getParameterForSelect(2).subscribe(data => {
      this.parametermemberStatusList = data;
    });
  }

  parameterassociationBranchList: ParameterListDto[];
  getParameterAssociationBranchList() {
    this._toolsService.getParameterForSelect(5).subscribe(data => {
      this.parameterassociationBranchList = data;
    });
  }


  //#endregion



}
