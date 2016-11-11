import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExecutePlanComponent} from './execute-plan/execute-plan.component';
import {PlanningComponent} from './planning/planning.component';
import {PresentationComponent} from './presentation/presentation.component';
import {NotesComponent} from './notes/notes.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: '/plan'},
      {path: 'plan', component: PlanningComponent},
      {path: 'executeplan', component: ExecutePlanComponent},
      {path: 'presentation', component: PresentationComponent},
      {path: 'notes', component: NotesComponent},
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
