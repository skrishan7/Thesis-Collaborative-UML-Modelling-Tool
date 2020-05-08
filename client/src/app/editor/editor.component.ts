import { Component, OnInit } from '@angular/core';
import { UmlService } from '../services/uml.service';
import { Uml } from '../models/uml';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { InitData } from '../models/init-data';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [UmlService],
})
export class EditorComponent implements OnInit {
  img: any = '../../images/logo.png';
  uml = new Uml();
  data = new InitData();
  filename: string;
  editor: string;
  // foods: Food[] = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

  constructor(private umlService: UmlService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
    this.uml.context = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { filename: this.filename, editor: this.editor },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.uml.filename = result.filename;
      this.uml.lastEditedBy = result.editor;
      this.addUml(this.uml);
    });
  }

  getUmlByFilename(filename) {
    this.umlService
      .getUmlByFilename(filename)
      .subscribe((u: Uml) => (this.uml = u));
  }

  addUml(uml: Uml) {
    this.umlService.addUml(uml).subscribe(u => {
      console.log(u);
      this.getUmlByFilename(u.filename);
    });
  }

  updateUml(uml: Uml) {
    this.umlService.updateUml(uml).subscribe(u => {
      console.log(u);
      this.getUmlByFilename(u.filename);
    })
  }

  getImage() {
    this.addUml(this.uml);
  }

  // compress(text: string) {
  //   console.log('before');
  //   console.log(JSON.stringify(text));
  //   this.plantumlService.compress(JSON.stringify(text))
  //     .subscribe(i => console.log(i));
  // }
}
