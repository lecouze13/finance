import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-share-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="share-container">
      <button
        class="share-btn"
        [class.copied]="showCopied"
        (click)="onShare()"
        [attr.aria-label]="ariaLabel"
        [title]="title">
        <i [class]="showCopied ? 'pi pi-check' : 'pi pi-share-alt'"></i>
        <span>{{ showCopied ? 'Lien copié !' : label }}</span>
      </button>
    </div>
  `,
  styles: [`
    .share-container {
      display: inline-block;
    }

    .share-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
      }

      &:active {
        transform: translateY(0);
      }

      &.copied {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      }

      i {
        font-size: 0.9rem;
      }
    }

    :host-context(html.dark-mode) {
      .share-btn {
        &:hover {
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
      }
    }
  `]
})
export class ShareButtonComponent {
  @Input() label: string = 'Partager';
  @Input() title: string = 'Partager ce simulateur';
  @Input() ariaLabel: string = 'Partager ce simulateur avec les valeurs actuelles';

  @Output() share = new EventEmitter<void>();

  showCopied = false;

  onShare(): void {
    this.share.emit();
  }

  showCopiedFeedback(): void {
    this.showCopied = true;
    setTimeout(() => {
      this.showCopied = false;
    }, 2000);
  }
}
