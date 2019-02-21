import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { List } from 'linqts';
import { MembersDto, MemberListDto } from 'src/app/models/member-list-dto';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { MemberSearchDto } from 'src/app/models/member-search-dto';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
 
  datePickerConfig: Partial<BsDatepickerConfig>;
  memberListDto: MemberListDto;
  membersDto: List<MembersDto>;

  memberSearchDto: MemberSearchDto = {
    memberFullName: null,
    memberNumber: null,
    tcnumber: null,
    statusParameterId: -1,
    associationBranchParameterId: -1,
    cityAddressId: -1,
    motherName: null,
    memberDate: null,
    isDisabled: -1,
  }

  pageSizes: number[] = [5, 10, 25, 50, 100];
  totalMembersCount: number = 1;
  displayPagination: boolean = false;
  pageNumber = 1;
  pageSize = 10;
  tr: any;

  constructor(
    private _router: Router,
    private _memberService: MemberService,
    private _toolsService: ToolsService,
    private _toastrService: ToastrService,
    private _localeService: BsLocaleService
  ) { }

  ngOnInit() {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'DD/MM/YYYY',
        showWeekNumbers: false,
        utc:false,      
      });

    this.getParameterCityList();
    this.getParameterMemberStatusList();
    this.getParameterAssociationBranchList();  
  }


  pageChanged(event) {
    this.pageNumber = event.page;

    this._memberService.getMemberSearchCacheList(this.pageNumber, this.pageSize).subscribe(
      data => {
        this.memberListDto = data as MemberListDto;
        this.membersDto = this.memberListDto.memberList;
        this.totalMembersCount = this.memberListDto.totalMembersCount;
      },
      error => {
        console.log(error) // error path        
      }
    );
  }

  onClickIdentityDetail(id: number) {
    this._router.navigate(['/memberDetail', id]);
  }

  getMemberSearchList() {
    this._memberService.getMemberSearchList(this.memberSearchDto).subscribe(
      data => {
        this.memberListDto = data as MemberListDto;
        
        if(this.memberListDto != null){
          if (this.memberListDto.totalMembersCount == 0) {
            this._toastrService.info("Aradığınız kriterlerde kayıt bulunamamıştır", "Bilgi");            
            this.membersDto = null;
            this.displayPagination = false;
          }
          else {
            this.totalMembersCount = this.memberListDto.totalMembersCount;
            this.membersDto = this.memberListDto.memberList;
            this.displayPagination = true;
          }
        }
        else{
            this.membersDto = null;
            this.displayPagination = false;
          this._toastrService.info("Aradığınız kriterlerde kayıt bulunamamıştır", "Bilgi");
        }
        
      },
      error => {
        console.log(error) // error path        
      }
    )
  }

  resetMemberSearchForm(form: NgForm) {
    // form.reset();
    this.memberSearchDto = {
      memberFullName: null,
      memberNumber: null,
      tcnumber: null,
      statusParameterId: -1,
      associationBranchParameterId: -1,
      cityAddressId: -1,
      motherName: null,
      memberDate: null,
      isDisabled: -1,
    }
    this.membersDto = null;
    this.displayPagination = false;
  }


  //#region parameters

  parameterCityList: CityParameterDto[];
  getParameterCityList() {
    this._toolsService.getCityParameterActiveList().subscribe(
      data => {
        this.parameterCityList = data;
      },
      error => {
        console.error(error)
      });
  }

  parametermemberStatusList: ParameterListDto[];
  getParameterMemberStatusList() {
    this._toolsService.getParameterForSelect(2).subscribe(
      data => {
        this.parametermemberStatusList = data;
      },
      error => {
        console.error(error)
      });
  }

  parameterassociationBranchList: ParameterListDto[];
  getParameterAssociationBranchList() {
    this._toolsService.getParameterForSelect(5).subscribe(
      data => {
        this.parameterassociationBranchList = data;
      },
      error => {
        console.error(error)
      });
  }

  //#endregion









}
