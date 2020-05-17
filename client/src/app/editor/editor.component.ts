import { Component, OnInit, Input } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';
import { InitData } from '../models/init-data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [UmlService],
})
export class EditorComponent implements OnInit {
  uml = new Uml();
  imgSrc: any = "http://www.plantuml.com/plantuml/png/";

  constructor(private umlService: UmlService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.umlService
        .getUmlById(params.id)
        .subscribe((u: Uml) => (this.uml = u));
      console.log(this.uml);
      this.imgSrc =  this.imgSrc + this.uml.encoded;
    });
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
    const u = await this.umlService.updateUml(this.uml).toPromise();
    console.log(u);
    const x = await this.umlService.getUmlByFilename(u.filename).toPromise();
    this.uml = <Uml> x;

    // this.umlService.updateUml(this.uml).subscribe(u => {
    //   console.log(u);
    //   this.umlService
    //   .getUmlByFilename(u.filename)
    //   .subscribe((x: Uml) => (this.uml = x));
    // });
  }

}
