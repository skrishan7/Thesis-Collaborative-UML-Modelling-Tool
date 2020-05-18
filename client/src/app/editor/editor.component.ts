import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';
import { ActivatedRoute } from '@angular/router';
import { PusherService } from '../services/pusher.service';
import { v4 } from 'uuid';

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
  timeout = 2000;

  constructor(private umlService: UmlService,
    private pusherService: PusherService,
    private route: ActivatedRoute) {

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

}
