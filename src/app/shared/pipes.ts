import {DomSanitizer} from '@angular/platform-browser';
import {Pipe} from '@angular/core';

@Pipe({name: 'safe'})
export class Safe {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(style: string) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
