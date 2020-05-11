import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Uml } from '../models/uml';
import { InitData } from '../models/init-data';
import { DialogComponent } from '../dialog/dialog.component';
import { UmlService } from '../services/uml.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
  providers: [UmlService],
})
export class InitComponent implements OnInit {

  uml = new Uml();
  data = new InitData();
  filename: string;
  editor: string;

  constructor(private umlService: UmlService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('init');
    this.openDialog();
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

  addUml(uml: Uml) {
    this.umlService.addUml(uml).subscribe(u => {
      console.log(u);
      this.getUmlByFilename(u.filename);
    });
  }

  getUmlByFilename(filename) {
    this.umlService
      .getUmlByFilename(filename)
      .subscribe((u: Uml) => (this.uml = u));
  }
}
