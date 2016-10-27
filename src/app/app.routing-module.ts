import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ExecutePlanComponent} from './execute-plan/execute-plan.component';
import {PlanningComponent} from './planning/planning.component';
import {PresentationComponent} from './presentation/presentation.component';
import {NotesComponent} from './notes/notes.component';


@NgModule({
  imports: [
    /*
     LoginComponent,
     TutorialsComponent,
     SupportComponent,
     NewsComponent,
     */
    RouterModule.forRoot([
      {path: 'executeplan', component: ExecutePlanComponent},
      {path: 'planning', component: PlanningComponent},
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
