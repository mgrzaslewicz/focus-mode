import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  private _isShowingNotes: boolean = false;
  public newNote: string = '';
  public notes: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  public addNewNote() {
    if (this.hasNewNote()) {
      if (this.hasAnyNote()) {
        this.notes += '\n' + this.newNote;
      } else {
        this.notes = this.newNote;
      }
      this.newNote = '';
    }
  }

  private hasAnyNote() {
    return this.notes.length > 0;
  }

  public isShowingNotes() {
    return this._isShowingNotes;
  }

  public hasNewNote() {
    return this.newNote.length > 0;
  }

  public hideNotes() {
    this._isShowingNotes = false;
  }

  public showNotes() {
    this._isShowingNotes = true;
  }

}
