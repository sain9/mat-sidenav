import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isHovered: boolean = false;

  onEnter() {
    this.isHovered = true;
  }

  onLeave() {
    this.isHovered = false;
  }

}
