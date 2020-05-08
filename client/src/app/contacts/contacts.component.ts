import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts()
      .subscribe((contacts: Contact[]) =>
        this.contacts = contacts);
  }

  deleteContact(id: any) {
    const contacts = this.contacts;
    this.contactService.deleteContact(id).subscribe(data => {
      if (data === 1) {
        for (let i = 0; i < contacts.length; i++) {
          if (contacts[i]._id === id) {
            contacts.splice(i, 1);
          }
        }
      }
    });
  }

  addContact() {
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    };
    this.contactService.addContact(newContact).subscribe((contact: Contact) => {
      this.contacts.push(contact);
      this.contactService.getContacts()
        .subscribe((contacts: Contact[]) =>
          this.contacts = contacts);
    });
  }

}
