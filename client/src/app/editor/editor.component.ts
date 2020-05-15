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
  img: any = '../../images/logo.png';
  // @Input() uml = new Uml();
  uml = new Uml();
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  constructor(private umlService: UmlService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.umlService
        .getUmlById(params.id)
        .subscribe((u: Uml) => (this.uml = u));
      console.log(this.uml);
    });
  }

  // onSearch(term: string) {
  //   this.router.navigate(['search', term])
  // }

  ngOnInit(): void {
    this.uml.context = '';
  }

  getUmlByFilename(filename) {
    this.umlService
      .getUmlByFilename(filename)
      .subscribe((u: Uml) => (this.uml = u));
  }

  addUml(uml: Uml) {
    this.umlService.addUml(uml).subscribe(u => {
      console.log(u);
    });
  }

  updateUml(uml: Uml) {
    this.umlService.updateUml(uml).subscribe(u => {
      console.log(u);
      this.getUmlByFilename(u.filename);
    });
  }

  getImage() {
    this.updateUml(this.uml);
  }

  // compress(text: string) {
  //   console.log('before');
  //   console.log(JSON.stringify(text));
  //   this.plantumlService.compress(JSON.stringify(text))
  //     .subscribe(i => console.log(i));
  // }
}
