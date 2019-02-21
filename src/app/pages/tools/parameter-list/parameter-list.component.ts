import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';
import { ParameterDto } from 'src/app/models/parameter-dto';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolsService } from 'src/app/services/tools.service';

@Component({
  selector: 'parameter-list',
  templateUrl: './parameter-list.component.html',
  styleUrls: ['./parameter-list.component.css']
})
export class ParameterListComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() typeid;
  public parameterName;
  public titleName;
  public inputName;

  parameterList: ParameterListDto[];
  parameter: ParameterListDto;
  selectedParameter: ParameterDto = {
    id: null,
    isPassive: null,
    name: null,
    parameterTypeId: this.typeid
  };

  constructor(
    private _route: ActivatedRoute,
    public _modalService: BsModalService,
    public _toastrService: ToastrService,
    public _toolsService: ToolsService) {

  }

  ngOnInit() {
    this.getParameterList();
    this.parameterTypeNames();

  }

  getParameterList() {
    this._toolsService.getParameterForSelect(this.typeid).subscribe(
      data => {
        this.parameterList = data;
      }
    )
  }

  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.selectedParameter.id = null,
      this.selectedParameter.parameterTypeId = this.typeid,
      this.selectedParameter.name = null,
      this.selectedParameter.isPassive = null
  }

  saveParameter() {
    if (this.selectedParameter.id == null) {

      this._toolsService.addParameter(this.selectedParameter).subscribe(
        data => {
          this.parameter = data;
          this._toastrService.success("İşlem başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getParameterList();
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });

    }
    else {
      this._toolsService.editParameter(this.selectedParameter).subscribe(
        data => {
          this.parameter = data;
          this._toastrService.success("İşlem başarılı şekilde güncellenmiştir.", "Başarılı");
          this.modalRef.hide();
          this.getParameterList();
          console.log(this.parameterList);
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
    }
  }

  getParameterDetail(id, template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this._toolsService.getParameterDetail(id).subscribe(
      data => {
        this.selectedParameter = data;
      }
    );
  }




  parameterTypeNames() {
    if (this.typeid == 1) {
      this.parameterName = "Üye Tipi";
      this.titleName = "Üye Tipi Ekle";
      this.inputName = "Üye Tipi";
    }

    if (this.typeid == 2) {
      this.parameterName = "Üyelik Durumu";
      this.titleName = "Durum Ekle";
      this.inputName = "Üyelik Durumu";
    }

    if (this.typeid == 3) {
      this.parameterName = "İlişkiler";
      this.titleName = "İlişki Ekle";
      this.inputName = "İlişki Türü";
    }
    if (this.typeid == 5) {
      this.parameterName = "Şubeler";
      this.titleName = "Şube Ekle";
      this.inputName = "Şube";
    }
    if (this.typeid == 6) {
      this.parameterName = "İletişim Tipi";
      this.titleName = "İletişim Tipi Ekle";
      this.inputName = "İletişim Tipi";
    }

    if (this.typeid == 8) {
      this.parameterName = "Döküman Tipi";
      this.titleName = "Döküman Tipi Ekle";
      this.inputName = "Döküman Tipi";
    }
  }

}
