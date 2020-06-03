import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';
import { ActivatedRoute } from '@angular/router';
import { PusherService } from '../services/pusher.service';
import { v4 } from 'uuid';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [UmlService, PusherService],
})
export class EditorComponent implements OnInit, AfterViewInit {
  uml = new Uml();
  userId = v4();
  imgSrcBase: any = "http://www.plantuml.com/plantuml/png/";
  timer: any;
  timeout = 5000;

  language: string;
  languageList: string[] = ['C#', 'C++', 'Java', 'PHP', 'Python', 'Ruby', 'Typescript'];


  constructor(private umlService: UmlService,
    private pusherService: PusherService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {

    this.route.params.subscribe(params => {
      this.umlService
        .getUmlById(params.id)
        .subscribe((u: Uml) => (this.uml = u));
    });
  }

  ngAfterViewInit() {
    const channel = this.pusherService.init();
    channel.bind('typing', data => {
        this.umlService.getUmlByFilename(this.uml.filename)
        .subscribe((updatedUml: Uml) => {
          this.uml = updatedUml;
        });
    });
  }

  ngOnInit(): void {
  }

  async updateImage() {
    this.umlService.updateUml(this.uml).subscribe(u => {
      this.umlService
        .getUmlByFilename(u.filename)
        .subscribe((x: Uml) => (this.uml = x));
    });
  }

  update() {
    this.openSnackBar('Updating...', '');
    this.resetCounter();
    this.timer = setTimeout(() => { this.updateServers(); }, this.timeout);
  }

  
  updateServers() {
    console.log("servers being updated");
    // send pusher an update
    this.pusherService.makeRequest(this.uml.encoded, this.userId)
    .subscribe(x => {
    });
    
    // update uml in db
    this.umlService.updateUml(this.uml).subscribe((u: Uml) => {
      console.log("updating UML");
      this.openSnackBar('Saved!', '');
      // retrieve back the updated uml from db
      this.umlService.getUmlByFilename(this.uml.filename)
      .subscribe((updatedUml: Uml) => {
        this.uml = updatedUml;
      });
    });
  }
  
  resetCounter() {
    clearTimeout(this.timer);
  }
  
  generateCode() {
    this.umlService.generateCode(this.uml._id, this.language.toLowerCase())
      .subscribe(x => {
        var str = "<pre>";

        for (let file in x['_files']) {
            str += "<h1>" + file + ":\n" + "</h1>" + x['_files'][file] +  "\n" ;
        }

        str += "</pre>";

        console.log(str);
        var win = window.open('', 'Code Generation');
        win.document.body.innerHTML = str;
    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
