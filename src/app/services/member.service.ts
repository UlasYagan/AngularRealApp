import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MemberRegisterDto } from '../models/member-register-dto';
import { MemberDetailDto } from '../models/member-detail-dto';
import { MemberSearchDto } from '../models/member-search-dto';
import { RelationListDto } from '../models/relation-list-dto';
import { RelationDto } from '../models/relation-dto';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    public httpClient: HttpClient
  ) { }


  postMemberRegister(param): Observable<MemberRegisterDto> {
    return this.httpClient.post<MemberRegisterDto>(environment.BASE_URL + "Member/MemberRegister", param);
  }

  getMemberDetail(id: number) {
    return this.httpClient.get<MemberDetailDto>(environment.BASE_URL + "Member/GetMemberDetail/" + id);
  }

  putMemberDetailEdit(param: MemberDetailDto): Observable<MemberDetailDto> {
    return this.httpClient.put<MemberDetailDto>(environment.BASE_URL + "Member/MemberDetailEdit/" + param.memberId, param);
  }

  getMemberSearchList(param: MemberSearchDto) {
    return this.httpClient.post(environment.BASE_URL + "Member/MemberSearch", param);
  }

  getMemberSearchCacheList(pageNumber: number, pageSize: number) {
    return this.httpClient.get(environment.BASE_URL + "Member/MemberSearch/" + pageNumber + "/" + pageSize);
  }


  //#region Relation
  getRelationByMemberID(memberId: number) {
    return this.httpClient.get<RelationListDto[]>(environment.BASE_URL + "Member/GetRelationByMemberID/" + memberId);
  }

  getRelationDetail(id: number) {
    return this.httpClient.get<RelationDto>(environment.BASE_URL + "Member/GetRelationDetail/" + id);
  }
  
  saveRelation(param: RelationDto) {
    return this.httpClient.post(environment.BASE_URL + "Member/RelationRegister", param);
  }

  editRelaiton(param: RelationDto) {
    return this.httpClient.put(environment.BASE_URL + "Member/RelationEdit/" + param.relationId, param);
  }
  
  deleteRelation(id: number) {
    return this.httpClient.delete(environment.BASE_URL + "Member/DeleteRelation/" + id);
  }
  //#endregion

}
