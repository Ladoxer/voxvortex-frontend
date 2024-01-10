import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent {
  @Input() id: string;
  @Input() title: string;
  @Input() userData: [{name: string}]; 
}
