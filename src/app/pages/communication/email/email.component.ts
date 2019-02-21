import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EmailDto } from 'src/app/models/email-dto';
import { EmailListDto } from 'src/app/models/email-list-dto';
import { GeneralService } from 'src/app/services/general.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  modalRef: BsModalRef;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  @Input() memberId;

  emailListDto: EmailListDto[];
  emailDto: EmailDto = {
    emailId: null,
    identityId: null,
    communicationParameterId: -1,
    email1: null
  }
  constructor(
    public _generalService: GeneralService,
    public _toolsService: ToolsService,
    public _modalService: BsModalService,
    public _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getEmailListByMemberID();
    this.emailDto.identityId = this.memberId;
  }
  getEmailListByMemberID() {
    this._generalService.getEmailListByMemberID(this.memberId).subscribe(
      data => {
        this.emailListDto = data as EmailListDto[];
      },
      error => {
        console.error(error)
      });
  }

  saveEmail() {

    if (this.emailDto.emailId == null) {
      this._generalService.saveEmail(this.emailDto).subscribe(
        data => {
          this.getEmailListByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
    }
    else {
      this._generalService.editEmail(this.emailDto).subscribe(
        data => {
          this.getEmailListByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde güncellenmiştir.", "Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
    }

  }

  openModal(template) {
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.getParameterCommunicationList();
    this.emailDto.emailId = null;
    this.emailDto.email1 = null;
    this.emailDto.communicationParameterId = -1;
  }

  emailId: number;
  openModalDelete(emailId, template) {
    this.modalRef = this._modalService.show(template, { class: 'modal-sm' });
    this.emailId = emailId;
  }

  confirmDelete(): void {
    this._generalService.deleteEmail(this.emailId).subscribe(
      data => {
        if (data) {
          this._toastrService.success("Kayıt başarılı şekilde silinmiştir.", "Başarılı");
          this.getEmailListByMemberID();
        }
      },
      error => {
        this._toastrService.error("Bir hata oluştu.", "Başarısız");
        console.error(error)
      }
    );
    this.modalRef.hide();

  }

  declineDelete(): void {
    this.modalRef.hide();
  }

  getEmailDetail(id, template) {
    if (template != null) {
      this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
      this.getParameterCommunicationList();
    }
    this._generalService.getEmailDetail(id).subscribe(
      data => {
        this.emailDto = data;
      },
      error => console.error(error)
    );
  }

  parameterCommunicationList: ParameterListDto[];
  getParameterCommunicationList() {
    this._toolsService.getParameterForSelect(6).subscribe(data => {
      this.parameterCommunicationList = data;
    });
  }
}

