import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';
import { InitData } from '../models/init-data';
import { ActivatedRoute, Router } from '@angular/router';
import { PusherService } from '../services/pusher.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [UmlService],
})
export class EditorComponent implements OnInit, AfterViewInit {
  uml = new Uml();
  imgSrc: any = "http://www.plantuml.com/plantuml/png/";
  userId = v4();

  constructor(private umlService: UmlService,
    private pusherService: PusherService,
    private route: ActivatedRoute,
    private router: Router,
    private pusher: PusherService) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.umlService
        .getUmlById(params.id)
        .subscribe((u: Uml) => (this.uml = u));
      console.log(this.uml);
      this.imgSrc =  this.imgSrc + this.uml.encoded;
    });
  }

  makeRequest() {
    // Make a request to the server containing the user's Id and the line array.
    this.pusherService.makeRequest(this.uml.encoded, this.userId)
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngAfterViewInit(): void {
    // const channel = this.pusher.init();
    // channel.bind('typing', (data) => {
    //   if (data.userId !== this.userId) {
    //     this.uml.encoded = data.encoded;
    //   }
    // });
  }

  // onSearch(term: string) {
  //   this.router.navigate(['search', term])
  // }

  ngOnInit(): void {
  }

  addUml(uml: Uml) {
    this.umlService.addUml(uml).subscribe(u => {
      console.log(u);
    });
  }

  async updateImage() {
    // const u = await this.umlService.updateUml(this.uml).toPromise();
    // console.log(u);
    // const x = await this.umlService.getUmlByFilename(u.filename).toPromise();
    // this.uml = <Uml> x;

    this.umlService.updateUml(this.uml).subscribe(u => {
      console.log(u);
      this.umlService
      .getUmlByFilename(u.filename)
      .subscribe((x: Uml) => (this.uml = x));
    });
  }

}
