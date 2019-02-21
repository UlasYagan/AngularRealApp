import { Component, OnInit, Input } from '@angular/core';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PhoneDto } from 'src/app/models/phone-dto';
import { PhoneListDto } from 'src/app/models/phone-list-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  modalRef: BsModalRef;
  phonenumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  @Input() memberId;
  
  phoneListDto: PhoneListDto[];
  phoneDto: PhoneDto = {
    phoneId : null,
    identityId: null,
    communicationParameterId: -1,
    phone1: null
  }

  constructor(
    public _generalService: GeneralService,
    public _toolsService: ToolsService,
    public _modalService: BsModalService,
    public _toastrService: ToastrService) { }

  ngOnInit() {
    this.getPhoneListByMemberID();
    this.phoneDto.identityId = this.memberId;
  }

  getPhoneListByMemberID() {
    this._generalService.getPhoneListByMemberID(this.memberId).subscribe(
      data => {
        this.phoneListDto = data as PhoneListDto[];
      },
      error => {
        console.error(error)
      });
  }

  savePhone(){
    console.log(this.phoneDto.phone1.length);
    if (this.phoneDto.phoneId == null) {
      this._generalService.savePhone(this.phoneDto).subscribe(
        data => {
          this.getPhoneListByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir.","Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.","Başarısız");
          console.error(error)
        });
    }
    else {
      this._generalService.editPhone(this.phoneDto).subscribe(
        data => {
          this.getPhoneListByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde güncellenmiştir.","Başarılı");
          this.modalRef.hide()         
        },
        error => {
          this._toastrService.error("Bir hata oluştu.","Başarısız");
          console.error(error)
        });
    }

  }

  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));   
    this.getParameterCommunicationList();
    this.phoneDto.phoneId= null;
    this.phoneDto.phone1 = null;
    this.phoneDto.communicationParameterId = -1;
  }

  phoneId:number;
  openModalDelete(phoneId,template) {
    this.modalRef = this._modalService.show(template, {class: 'modal-sm'});
    this.phoneId = phoneId;
  }
 
  confirmDelete(): void {
    this._generalService.deletePhone(this.phoneId).subscribe(
      data => {
        if(data){
          this._toastrService.success("Kayıt başarılı şekilde silinmiştir.","Başarılı");        
          this.getPhoneListByMemberID();
        }
      },
      error => {
        this._toastrService.error("Bir hata oluştu.","Başarısız");
        console.error(error)
      }
    );
    this.modalRef.hide();

  }
 
  declineDelete(): void {
    this.modalRef.hide();
  }

  getPhoneDetail(id, template){
    if(template != null){
      this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.getParameterCommunicationList();
    } 
    this._generalService.getPhoneDetail(id).subscribe(
      data=>{
          this.phoneDto = data;
      },
      error=> console.error(error)
      );
  }

  parameterCommunicationList: ParameterListDto[];
  getParameterCommunicationList() {
     this._toolsService.getParameterForSelect(6).subscribe(data => {
      this.parameterCommunicationList = data;
    });
  }
}
