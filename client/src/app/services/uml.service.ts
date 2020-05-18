import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Uml } from '../models/uml';

@Injectable()
export class UmlService {
  baseURL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getAllUmls() {
    return this.http.get(this.baseURL + 'umls');
  }

  getUmlByFilename(filename) {
    return this.http.get(this.baseURL + 'uml/' + filename);
  }

  getUmlById(id) {
    return this.http.get(this.baseURL + 'uml/id/' + id);
  }

  addUml(newUml: Uml) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseURL + 'uml', newUml, { headers }) as Observable<Uml>;
  }

  deleteUml(filename) {
    return this.http.delete(this.baseURL + 'uml/' + filename);
  }

  updateUml(newUml: Uml) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseURL + 'uml/' + newUml.filename, newUml, { headers }) as Observable<Uml>;
  }

  // getImage(text) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   const params = new HttpParams();
  //   params.append('text', text);
  //   console.log(headers);
  //   console.log(params);
  //   return this.http.get('http://localhost:3000/api/getImage', { headers, params });
  // }

  // compress(text) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');

  //   const params = new HttpParams();
  //   params.append('text', text);

  //   return this.http.get('http://localhost:3000/api/compress', { headers, params });
  // }
}
