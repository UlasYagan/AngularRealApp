import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DocumentTypeDto } from 'src/app/models/document-type-dto';
import { DocumentDto } from 'src/app/models/document-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ParameterDto } from 'src/app/models/parameter-dto';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  @Input() memberId;
  modalRef: BsModalRef;
  displayDocumentTypeList: boolean = true;
  displayDocumentList: boolean = false;

  documentTypeListDTO: DocumentTypeDto[];
  documentTypeDTO: DocumentTypeDto = {
    documentTypeId: null,
    documentTypeParameterId: -1,
    identityId: null,
    documentTypeName: null
  }

  documentListDTO: DocumentDto[];
  documentDTO: DocumentDto = {
    documentId: null,
    documentName: null,
    createDate: null,
    documentTypeId: null,
    documentUrl: null,
    identityId: null,
    isProfilePhoto: null
  }

  public progress: number;
  public message: string;

  constructor(
    public _generalService: GeneralService,
    public _toolsService: ToolsService,
    public _modalService: BsModalService,
    public _toastrService: ToastrService,
    public http: HttpClient
  ) { }

  ngOnInit() {
    this.documentTypeDTO.identityId = this.memberId;
    this.getParameterDocumetTypeList();
    this.getDocumentByMember();
  }

  //#region DocumentType

  saveDocumentType() {
    this._generalService.saveDoumentType(this.documentTypeDTO).subscribe(
      data => {
        if (data) {
          this._toastrService.info("Bu döküman daha önce eklenmiştir.", "Bilgi");
        }
        else {
          this.getDocumentByMember();
          this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide()
        }
      },
      error => {
        this._toastrService.error("Bir hata oluştu.", "Başarısız");
        console.error(error)
      });
  }

  openModalDocumentType(templateDocumentType) {
    this.modalRef = this._modalService.show(templateDocumentType, Object.assign({}, { class: 'gray modal-lg' }));
  }

  parameterDocumentTypeList: ParameterDto[];
  getParameterDocumetTypeList() {
    this._toolsService.getParameterForSelect(8).subscribe(data => {
      this.parameterDocumentTypeList = data;
    });
  }

  getDocumentByMember() {
    this._generalService.getDocumentType(this.memberId).subscribe(
      data => {
        this.documentTypeListDTO = data;
      },
      error => {
        console.error(error)
      });
  }

  //#endregion


  //#region Document

  documentTypeId: any;
  saveDocument(files) {

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append('file', file);

    formData.append('documentTypeId', this.documentTypeId);
    formData.append('identityId', this.memberId);

    this._generalService.saveDocument(formData).subscribe(res => {
      if (res == "success") {
        this.getDocumentDetailByMember(this.memberId, this.documentTypeId);
        this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir", "Başarılı");
        this.modalRef.hide()
      }
      else if (res == "large") {
        this._toastrService.error("Dosya boyutu en fazla 3 megabyts olabilir", "Başarısız");
      }
    },
      error => {
        this._toastrService.error("Bir hata oluştu.", "Başarısız");
        console.error(error)
      });

    // const uploadReq = new HttpRequest('POST', environment.BASE_URL + `General/DocumentAdd`, formData, {
    //   reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     this.message = event.body.toString();
    // });
  }

  documentDownload(documentId: number, identityId: number) {
    this._generalService.documentDownload(documentId, identityId);
  }

  getDocumentDetailByMember(identityId: number, typeId: number) {
    this.documentListDTO = null;
    this.displayDocumentTypeList = false;
    this.displayDocumentList = true;
    this.documentTypeId = typeId;
    this._generalService.getDocumentDetailByMemberList(identityId, typeId).subscribe(
      data => {
        this.documentListDTO = data;
      },
      error => {
        console.error(error)
      });

  }

  backDocumentList() {
    this.displayDocumentTypeList = true;
    this.displayDocumentList = false;
  }

  openModalDocument(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
  }

  document:DocumentDto;
  openModalDelete(document,templatedelete) {
    this.modalRef = this._modalService.show(templatedelete, {class: 'modal-sm'});
    this.document = document;
  }

  confirmDelete(): void {
    this._generalService.deleteDocument(this.document.documentId).subscribe(
      data => {
        if(data){
          let index = this.documentListDTO.indexOf(this.document);
          this.documentListDTO.splice(index,1);
          this._toastrService.success("Kayıt başarılı şekilde silinmiştir.","Başarılı");   
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


  //#endregion


}
