import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Pipe} from '@angular/core';

@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
