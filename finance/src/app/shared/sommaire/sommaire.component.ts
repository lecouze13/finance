import { Component, Input, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface SommaireItem {
  id: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-sommaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sommaire.component.html',
  styleUrls: ['./sommaire.component.scss']
})
export class SommaireComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() items: SommaireItem[] = [];
  @Input() title: string = 'Sommaire';
  @Input() autoGenerate: boolean = false; // Si true, génère automatiquement depuis les h2

  activeId: string = '';
  isCollapsed: boolean = false;
  private isBrowser: boolean;
  private scrollTimeout: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser && window.innerWidth < 1200) {
      this.isCollapsed = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Petit délai pour laisser le DOM se charger
      setTimeout(() => {
        if (this.autoGenerate) {
          this.generateFromHeadings();
        }
        this.updateActiveItem();
      }, 100);
    }
  }

  private generateFromHeadings(): void {
    const headings = document.querySelectorAll('h2[id], h3[id]');
    this.items = Array.from(headings).map((heading) => ({
      id: heading.id,
      label: heading.textContent?.trim() || '',
      icon: heading.tagName === 'H2' ? 'pi pi-bookmark' : 'pi pi-angle-right'
    }));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;

    // Debounce pour performance
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.updateActiveItem();
    }, 50);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser && window.innerWidth < 1200) {
      this.isCollapsed = true;
    }
  }

  private updateActiveItem(): void {
    if (!this.isBrowser || this.items.length === 0) return;

    const scrollPosition = window.scrollY + 150;
    let currentActiveId = '';

    for (const item of this.items) {
      const element = document.getElementById(item.id);
      if (element && element.offsetTop <= scrollPosition) {
        currentActiveId = item.id;
      }
    }

    // Si aucun élément actif trouvé et qu'on est en haut, activer le premier
    if (!currentActiveId && this.items.length > 0 && window.scrollY < 200) {
      currentActiveId = this.items[0].id;
    }

    this.activeId = currentActiveId;
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) return;

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeId = id;

      // Fermer sur mobile après clic
      if (window.innerWidth < 1200) {
        this.isCollapsed = true;
      }
    }
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  getProgressPercent(): number {
    if (this.items.length === 0) return 0;
    const activeIndex = this.items.findIndex(item => item.id === this.activeId);
    if (activeIndex === -1) return 0;
    return ((activeIndex + 1) / this.items.length) * 100;
  }

  ngOnDestroy(): void {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}
