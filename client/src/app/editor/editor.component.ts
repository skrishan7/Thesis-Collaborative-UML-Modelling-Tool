import { Component, OnInit } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [UmlService]
})
export class EditorComponent implements OnInit {

  img: any = '../../images/logo.png';
  uml = new Uml();
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  constructor(private umlService: UmlService) { }

  ngOnInit(): void {
    this.openInitDialog();
  }

  openInitDialog(): void {
    // const dialogRef = this.dialog
  }

  getUmlByFilename(filename) {
    this.umlService.getUmlByFilename(filename)
      .subscribe((u: Uml) => this.uml = u);
  }

  // getImage(text: string) {
  //   this.plantumlService.getImage(text)
  //     .subscribe(i =>
  //       this.img = i);
  // }

  // compress(text: string) {
  //   console.log('before');
  //   console.log(JSON.stringify(text));
  //   this.plantumlService.compress(JSON.stringify(text))
  //     .subscribe(i => console.log(i));
  // }
}
