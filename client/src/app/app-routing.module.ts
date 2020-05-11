import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { InitComponent } from './init/init.component';


const routes: Routes = [
  { path: '', component: InitComponent, pathMatch: 'full' },
  { path: 'uml', component: EditorComponent },
  { path: 'uml/:id', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
