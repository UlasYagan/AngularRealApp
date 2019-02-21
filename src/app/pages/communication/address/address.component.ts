import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AddressDto } from 'src/app/models/address-dto';
import { AddressListDto } from 'src/app/models/address-list-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';
import { TownParameterDto } from 'src/app/models/town-parameter-dto';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() memberId;

  addressListDto: AddressListDto[];
  address : AddressListDto;
  addressDto: AddressDto = {
    addressId: null,
    address1: null,
    cityParameterId: -1,
    communicationParameterId: -1,
    identityId: null,
    townParameterId: -1
  }

  constructor(
    public _generalService: GeneralService,
    public _toolsService: ToolsService,
    public _modalService: BsModalService,
    public _toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.getAddressByMemberID(this.memberId);
    this.addressDto.identityId = this.memberId;
  }
  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.getParameterCityList();
    this.getParameterCommunicationList();
    this.addressDto.addressId = null;
    this.addressDto.cityParameterId = -1;
    this.addressDto.communicationParameterId = -1;
    this.addressDto.townParameterId = -1;
    this.addressDto.address1 = null;
    this.parameterTownList = null;

  }

  addressId:number;
  openModalDelete(adresId,template) {
    this.modalRef = this._modalService.show(template, {class: 'modal-sm'});
    this.addressId = adresId;
  }
 
  confirmDelete(): void {
    this._generalService.deleteAddress(this.addressId).subscribe(
      data => {
        if(data){
          this._toastrService.success("Kayıt başarılı şekilde silinmiştir.","Başarılı");        
          this.getAddressByMemberID(this.memberId);
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

  getAddressByMemberID(id) {
    this._generalService.getAddressListByMemberID(id).subscribe(
      data => {
        this.addressListDto = data as AddressListDto[]
      },
      error => {
        console.error(error)
      });
  }

  getAddressDetail(id, template) {
    if(template != null){
      this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.getParameterCityList();
      this.getParameterCommunicationList();
    }    

    this._generalService.getAddressDetail(id).subscribe(
      data => {
        this.addressDto = data as AddressDto;
        this.getParameterTownList(this.addressDto.cityParameterId);     
      },
      error => {
        console.error(error)
      });
  }

  saveAddress() {
    if (this.addressDto.addressId == null) {
      this._generalService.saveAddress(this.addressDto).subscribe(
        data => {
          this.getAddressByMemberID(this.memberId);
          this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir.","Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.","Başarısız");
          console.error(error)
        });
    }
    else {
      this._generalService.editAddress(this.addressDto).subscribe(
        data => {
          this.getAddressByMemberID(this.memberId);
          this._toastrService.success("İşleminiz başarılı şekilde güncellenmiştir.","Başarılı");
          this.modalRef.hide()         
        },
        error => {
          this._toastrService.error("Bir hata oluştu.","Başarısız");
          console.error(error)
        });
    }

  }

  cityParameterChange(event) {
    let value = event.target.value;
    this.getParameterTownList(value);
  }

  //#region parameters

  parameterCityList: CityParameterDto[];
  getParameterCityList() {
    this._toolsService.getCityParameterActiveList().subscribe(data => {
      this.parameterCityList = data;
    });
  }

  parameterTownList: TownParameterDto[];
  getParameterTownList(id) {
    this._toolsService.getTownParameterActiveList(id).subscribe(data => {
      this.parameterTownList = data;
    });
  }

  parameterCommunicationList: ParameterListDto[];
  getParameterCommunicationList() {
    this._toolsService.getParameterForSelect(6).subscribe(data => {
      this.parameterCommunicationList = data;
    });
  }
  //#endregion
}
