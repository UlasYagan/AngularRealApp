import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RelationListDto } from 'src/app/models/relation-list-dto';
import { RelationDto } from 'src/app/models/relation-dto';
import { MemberService } from 'src/app/services/member.service';
import { ToolsService } from 'src/app/services/tools.service';
import { ToastrService } from 'ngx-toastr';
import { ParameterListDto } from 'src/app/models/parameter-list-dto';

@Component({
  selector: 'relation-list',
  templateUrl: './relation-list.component.html',
  styleUrls: ['./relation-list.component.css']
})
export class RelationListComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() memberId;

  relationListDTO: RelationListDto[];
  relationDTO: RelationDto = {
    relationId : null,
    nameSurname: null,
    relationMemberId : this.memberId,
    relationTypeParameterId: -1,
    email: null,
    phone: null
  }
  constructor(
    private _memberService: MemberService,
    private _modalService: BsModalService,
    private _toolsService: ToolsService,
    private _toastrService: ToastrService     
  ) { }

  ngOnInit() {
    this.getRelationByMemberID();
  }

  getRelationByMemberID() {
    this._memberService.getRelationByMemberID(this.memberId).subscribe(
      data => {
        this.relationListDTO = data;
      },
      error => {
        console.error(error)
      });
  }

  openModal(template) {
    this.relationDTO.relationId = null;
    this.relationDTO.relationMemberId = this.memberId;
    this.relationDTO.relationTypeParameterId = -1;
    this.relationDTO.nameSurname = null;
    this.relationDTO.phone = null;
    this.relationDTO.email = null;
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.getParameterRelationTypeList();
    
  }

  relationId: number;
  openModalDelete(relationID: number, deleteTemplate){
    this.modalRef = this._modalService.show(deleteTemplate, { class: 'modal-sm' });   
    this.relationId = relationID; 
  }

  confirmDelete(): void {
    this._memberService.deleteRelation(this.relationId).subscribe(
      data => {
        if (data) {
          this._toastrService.success("Kayıt başarılı şekilde silinmiştir.", "Başarılı");
          this.getRelationByMemberID();
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

  saveRelation() {
     if(this.relationDTO.relationId === null){
      this._memberService.saveRelation(this.relationDTO).subscribe(
        data => {
          this.getRelationByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde kaydedilmiştir.", "Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
     }
     else{
      this._memberService.editRelaiton(this.relationDTO).subscribe(
        data => {
          this.getRelationByMemberID();
          this._toastrService.success("İşleminiz başarılı şekilde güncellenmiştir.", "Başarılı");
          this.modalRef.hide()
        },
        error => {
          this._toastrService.error("Bir hata oluştu.", "Başarısız");
          console.error(error)
        });
     }
  }

  getRelationDetail(id,template){
    this.modalRef = this._modalService.show(template, Object.assign({}, { class: 'gray modal-lg' }));
    this.getParameterRelationTypeList();
    this._memberService.getRelationDetail(id).subscribe(
      data => {
        this.relationDTO = data;
      },
      error => console.error(error)
    )
  }

  parameterRelationTypeList: ParameterListDto[];
  getParameterRelationTypeList() {
    this._toolsService.getParameterForSelect(3).subscribe(data => {
      this.parameterRelationTypeList = data;
    });
  }
}
