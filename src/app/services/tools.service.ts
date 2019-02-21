import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ParameterListDto } from '../models/parameter-list-dto';
import { ParameterDto } from '../models/parameter-dto';
import { Observable } from 'rxjs';
import { CityParameterDto } from '../models/city-parameter-dto';
import { TownParameterDto } from '../models/town-parameter-dto';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private httpClient: HttpClient) { }
  
  //#region Parameter
  getParameter(typeid) {
    return this.httpClient.get<ParameterListDto[]>(environment.BASE_URL + "parameter/GetParameterTypeListById/" + typeid);
  }

  getParameterDetail(id) {
    return this.httpClient.get<ParameterListDto>(environment.BASE_URL + "parameter/GetParameterById/" + id);
  }

  addParameter(param: ParameterDto) {
    return this.httpClient.post<ParameterListDto>(environment.BASE_URL + "parameter/AddParameter", param);
  }

  editParameter(param: ParameterDto) {
    return this.httpClient.put<ParameterListDto>(environment.BASE_URL + "parameter/EditParameter/" + param.id, param);
  }

  getParameterForSelect(typeid): Observable<ParameterListDto[]> {
    return this.httpClient.get<ParameterListDto[]>(environment.BASE_URL + "parameter/GetParameterTypeListById/" + typeid)
  }
  //#endregion

  //#region cityParameter

  getCityParameterList(): Observable<CityParameterDto[]> {
    return this.httpClient.get<CityParameterDto[]>(environment.BASE_URL + "parameter/GetCityParameters");
  }

  getCityParameterActiveList() {
    return this.httpClient.get<CityParameterDto[]>(environment.BASE_URL + "parameter/GetCityParametersActive");
  }

  getCityParameterDetail(id) {
    return this.httpClient.get<CityParameterDto>(environment.BASE_URL + "parameter/GetCityParameterById/" + id);
  }

  addCityParameter(param: CityParameterDto) {
    return this.httpClient.post<CityParameterDto>(environment.BASE_URL + "parameter/AddCityParameter", param);
  }

  editCityParameter(param: CityParameterDto) {
    return this.httpClient.put<CityParameterDto>(environment.BASE_URL + "parameter/EditCityParameter/" + param.id, param);
  }

  //#endregion

  //#region townParameter

  getTownParameterList() {
    return this.httpClient.get<TownParameterDto[]>(environment.BASE_URL + "parameter/GetTownParameters");
  }

  getTownParameterActiveList(id) {
    return this.httpClient.get<TownParameterDto[]>(environment.BASE_URL + "parameter/GetTownParameterListByCityId/" + id);
  }

  getTownParameterDetail(id) {
    return this.httpClient.get<TownParameterDto>(environment.BASE_URL + "parameter/GetTownParameterById/" + id);
  }

  addTownParameter(param: TownParameterDto) {
    return this.httpClient.post<TownParameterDto>(environment.BASE_URL + "parameter/AddTownParameter", param);
  }

  editTownParameter(param: TownParameterDto) {
    return this.httpClient.put<TownParameterDto>(environment.BASE_URL + "parameter/EditTownParameter/" + param.id, param);
  }

  //#endregion
}
