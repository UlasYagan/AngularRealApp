import { Component, OnInit } from '@angular/core';
import { CityParameterDto } from 'src/app/models/city-parameter-dto';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { TownParameterDto } from 'src/app/models/town-parameter-dto';
import { ToastrService } from 'ngx-toastr';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'town-parameter',
  templateUrl: './town-parameter.component.html',
  styleUrls: ['./town-parameter.component.css']
})
export class TownParameterComponent implements OnInit {

  modalRef: BsModalRef;
  townParameterList: TownParameterDto[];
  selectedTownParameter: TownParameterDto = {
     id : null,
     cityParameterId: -1,
     cityName: null,
     isPassive: null,
     name: null
  };

  constructor(
    public _modalService: BsModalService,
    public _toastrService: ToastrService,
    public _toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.getTownParameterList();
    this.getParameterCityList();
  }

  getTownParameterList() {
    this._toolsService.getTownParameterList().subscribe(
      data => {
        this.townParameterList = data;
      },
      error => {
        console.error(error)
      });
    
  }

  getTownParameterDetail(id, template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this._toolsService.getTownParameterDetail(id).subscribe(
      data => {
        this.selectedTownParameter = data;
      },
      error => {
        console.error(error)
      });
  }

  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.selectedTownParameter.id = null,
      this.selectedTownParameter.cityParameterId = -1,
      this.selectedTownParameter.name = null,
      this.selectedTownParameter.cityName = null,
      this.selectedTownParameter.isPassive = null
  }

  saveTownParameter(){
    if (this.selectedTownParameter.id == null) {

      this._toolsService.addTownParameter(this.selectedTownParameter).subscribe(
        data => {
          this.selectedTownParameter = data;
          this._toastrService.success("İşlem başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getTownParameterList();
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });

    }
    else {
      this._toolsService.editTownParameter(this.selectedTownParameter).subscribe(
        data => {
          this.selectedTownParameter = data;
          this._toastrService.success("İşlem başarılı şekilde güncellenmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getTownParameterList();
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
    }
  }

  parameterCityList: CityParameterDto[];
  getParameterCityList() {
    this._toolsService.getCityParameterList().subscribe(data => {
      this.parameterCityList = data;
    });
  }
}
