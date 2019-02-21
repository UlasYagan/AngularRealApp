import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';
import { ToastrService } from 'ngx-toastr';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'city-parameter',
  templateUrl: './city-parameter.component.html',
  styleUrls: ['./city-parameter.component.css']
})
export class CityParameterComponent implements OnInit {

  modalRef: BsModalRef;
  cityParameterList: CityParameterDto[];  
  selectedCityParameter: CityParameterDto = {
    id: null,
    name: null,
    isPassive:null
  };

  constructor(
    public _modalService: BsModalService,
    public _toastrService: ToastrService,
    public _toolsService: ToolsService
  ) { }

  ngOnInit() {
  
    this.getCityParameterList();
  }

  getCityParameterList() {
    this._toolsService.getCityParameterList().subscribe(
      data => {
        this.cityParameterList = data;
      },
      error => {
        console.error(error)
      });
    
  }

  getCityParameterDetail(id, template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this._toolsService.getCityParameterDetail(id).subscribe(
      data => {
        this.selectedCityParameter = data;
      },
      error => {
        console.error(error)
      });
  }

  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.selectedCityParameter.id = null,
      this.selectedCityParameter.name = null,
      this.selectedCityParameter.isPassive = null
  }

  saveCityParameter(){
    if (this.selectedCityParameter.id == null) {

      this._toolsService.addCityParameter(this.selectedCityParameter).subscribe(
        data => {
          this.selectedCityParameter = data;
          this._toastrService.success("İşlem başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getCityParameterList();
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });

    }
    else {
      this._toolsService.editCityParameter(this.selectedCityParameter).subscribe(
        data => {
          this.selectedCityParameter = data;
          this._toastrService.success("İşlem başarılı şekilde güncellenmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getCityParameterList();
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
    }
  }
  
}
