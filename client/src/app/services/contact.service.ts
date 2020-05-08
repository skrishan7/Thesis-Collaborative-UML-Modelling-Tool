import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) { }

  // retrieving ContactService
  getContacts() {
    return this.http.get('http://localhost:3000/api/contacts');
  }

  // add contact
  addContact(newContact) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/contact', newContact, { headers });
  }

  // delete method
  deleteContact(id) {
    return this.http.delete('http://localhost:3000/api/contact/' + id);
  }
}
