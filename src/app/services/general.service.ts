import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AddressDto } from '../models/address-dto';
import { PhoneDto } from '../models/phone-dto';
import { EmailDto } from '../models/email-dto';
import { DocumentTypeDto } from '../models/document-type-dto';
import { DocumentDto } from '../models/document-dto';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    public _httpClient: HttpClient
  ) { }

//#region Address
  getAddressListByMemberID(id) {
    return this._httpClient.get(environment.BASE_URL + "General/GetAddressListByMemberID/" + id);
  }

  getAddressDetail(id) {
    return this._httpClient.get(environment.BASE_URL + "General/GetAddressDetailById/" + id);
  }

  saveAddress(formData: AddressDto): Observable<AddressDto> {
    return this._httpClient.post<AddressDto>(environment.BASE_URL + "General/AddAddress", formData);
  }

  editAddress(formData: AddressDto): Observable<AddressDto> {
    return this._httpClient.put<AddressDto>(environment.BASE_URL + "General/UpdateAddress/" + formData.addressId, formData);
  }

  deleteAddress(id) {
    return this._httpClient.delete<AddressDto>(environment.BASE_URL + "General/DeleteAddress/" + id);
  }

//#endregion

//#region Phone

getPhoneListByMemberID(id) {
  return this._httpClient.get(environment.BASE_URL + "General/GetPhoneListByMemberID/" + id);
}

getPhoneDetail(id) {
  return this._httpClient.get<PhoneDto>(environment.BASE_URL + "General/GetPhoneDetailById/" + id);
}

savePhone(formData: PhoneDto): Observable<PhoneDto> {
  return this._httpClient.post<PhoneDto>(environment.BASE_URL + "General/AddPhone", formData);
}

editPhone(formData: PhoneDto): Observable<PhoneDto> {
  return this._httpClient.put<PhoneDto>(environment.BASE_URL + "General/UpdatePhone/" + formData.phoneId, formData);
}

deletePhone(id) {
  return this._httpClient.delete<PhoneDto>(environment.BASE_URL + "General/DeletePhone/" + id);
}

//#endregion

//#region Email
getEmailListByMemberID(id) {
  return this._httpClient.get(environment.BASE_URL + "General/GetEmailListByMemberID/" + id);
}

getEmailDetail(id) {
  return this._httpClient.get<EmailDto>(environment.BASE_URL + "General/GetEmailDetailById/" + id);
}

saveEmail(formData: EmailDto): Observable<EmailDto> {
  return this._httpClient.post<EmailDto>(environment.BASE_URL + "General/AddEmail", formData);
}

editEmail(formData: EmailDto): Observable<EmailDto> {
  return this._httpClient.put<EmailDto>(environment.BASE_URL + "General/UpdateEmail/" + formData.emailId, formData);
}

deleteEmail(id) {
  return this._httpClient.delete<EmailDto>(environment.BASE_URL + "General/DeleteEmail/" + id);
}

//#endregion

//#region DocumentType

getDocumentType(memberid: number) {
  return this._httpClient.get<DocumentTypeDto[]>(environment.BASE_URL + "General/GetDocumentTypeList/" + memberid);
}

saveDoumentType(formData: DocumentTypeDto): Observable<DocumentTypeDto> {
  return this._httpClient.post<DocumentTypeDto>(environment.BASE_URL + "General/DocumentTypeAdd", formData);
}

//#endregion

 //#region Document

 getDocumentDetailByMemberList(memberId: number, typeId: number){
   return this._httpClient.get<DocumentDto[]>(environment.BASE_URL + "General/GetDocumentListByMember/"+memberId+"/"+typeId);
 }

 saveDocument(formData: FormData){
   return this._httpClient.post(environment.BASE_URL + "General/DocumentAdd", formData);
 }

 documentDownload(documentId: number, identityId: number){
  var url = environment.BASE_URL+ "General/DocumentDownload/"+documentId + "/" + identityId;
  window.open(url);
  //  return this._httpClient.get(environment.BASE_URL+ "General/DocumentDownload/"+documentId + "/" + identityId);
 }

 deleteDocument(documentId: number){
   return this._httpClient.delete(environment.BASE_URL+ "General/DocumentDelete/" + documentId);
 }
 //#endregion

 











}
