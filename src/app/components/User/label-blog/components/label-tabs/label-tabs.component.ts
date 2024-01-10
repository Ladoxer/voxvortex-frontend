import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-label-tabs',
  templateUrl: './label-tabs.component.html',
  styleUrls: ['./label-tabs.component.css']
})
export class LabelTabsComponent {
  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
  tabs: Array<{_id:string,label:string,description:string}> = [];

  showLeftArrow = false;
  showRightArrow = false;

  constructor(private adminService: AdminServiceService) {}

  updateScrollArrows() {
    setTimeout(() => {
      if (this.tabsContainer) {
        const tabsEl = this.tabsContainer.nativeElement as HTMLElement;

        this.showLeftArrow = tabsEl.scrollLeft > 0;
        this.showRightArrow = tabsEl.scrollWidth > tabsEl.clientWidth && tabsEl.scrollWidth - tabsEl.clientWidth > tabsEl.scrollLeft;
      }
    }, 100);
  }

  ngOnInit(): void {
    this.adminService.getAllLabels().subscribe((data) => {
      this.tabs = data;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScrollArrows();
  }

  ngAfterViewInit(): void {
    this.updateScrollArrows();
  }

  scrollTabs(direction: 'left' | 'right'): void {
    const container = this.tabsContainer.nativeElement;
    const scrollAmount = 200; // Adjust scroll distance as needed

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    this.updateScrollArrows();
  }
}
