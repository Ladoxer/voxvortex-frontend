import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
})
export class AdComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    document.head.appendChild(adScript);
  }
}
