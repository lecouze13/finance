import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  linkedin?: string;
  twitter?: string;
}

// Auteur par défaut du site
export const DEFAULT_AUTHOR: Author = {
  name: 'CalculateurFinance.fr',
  role: 'Expert en Finance Personnelle',
  bio: 'Notre mission est de rendre la finance accessible à tous. Nous proposons des simulateurs gratuits et des guides pratiques pour vous aider à prendre les meilleures décisions financières : immobilier, épargne, fiscalité et investissement.',
  avatar: 'assets/images/logo-icon.png'
};

@Component({
  selector: 'app-author-bio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- <div class="author-bio" itemscope itemtype="https://schema.org/Person">
      <div class="author-avatar">
        <img *ngIf="author.avatar" [src]="author.avatar" [alt]="author.name" itemprop="image">
        <div *ngIf="!author.avatar" class="avatar-placeholder">
          <i class="pi pi-user"></i>
        </div>
      </div>
      <div class="author-info">
        <div class="author-header">
          <h4 itemprop="name">{{ author.name }}</h4>
          <span class="author-role" itemprop="jobTitle">{{ author.role }}</span>
        </div>
        <p class="author-description" itemprop="description">{{ author.bio }}</p>
        <div class="author-links" *ngIf="author.linkedin || author.twitter">
          <a *ngIf="author.linkedin" [href]="author.linkedin" target="_blank" rel="noopener noreferrer"
             aria-label="Profil LinkedIn" title="LinkedIn">
            <i class="pi pi-linkedin"></i>
          </a>
          <a *ngIf="author.twitter" [href]="author.twitter" target="_blank" rel="noopener noreferrer"
             aria-label="Profil Twitter" title="Twitter">
            <i class="pi pi-twitter"></i>
          </a>
        </div>
      </div>
    </div> -->
  `,
  styles: [`
    .author-bio {
      display: flex;
      gap: 1.25rem;
      padding: 1.5rem;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      margin: 1.5rem 0;
    }

    .author-avatar {
      flex-shrink: 0;

      img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #e2e8f0;
      }

      .avatar-placeholder {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 2rem;
          color: white;
        }
      }
    }

    .author-info {
      flex: 1;
    }

    .author-header {
      margin-bottom: 0.5rem;

      h4 {
        margin: 0;
        color: #1e293b;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .author-role {
        color: #3b82f6;
        font-size: 0.85rem;
        font-weight: 500;
      }
    }

    .author-description {
      color: #64748b;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0.5rem 0;
    }

    .author-links {
      display: flex;
      gap: 0.75rem;
      margin-top: 0.75rem;

      a {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        transition: all 0.2s ease;

        &:hover {
          background: #3b82f6;
          color: white;
        }

        i {
          font-size: 0.9rem;
        }
      }
    }

    @media (max-width: 576px) {
      .author-bio {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .author-links {
        justify-content: center;
      }
    }

    :host-context(html.dark-mode) {
      .author-bio {
        background: var(--bg-card);
        border-color: var(--border-color);
      }

      .author-avatar img {
        border-color: var(--border-color);
      }

      .author-header h4 {
        color: #e2e8f0;
      }

      .author-role {
        color: #60a5fa;
      }

      .author-description {
        color: var(--text-secondary);
      }

      .author-links a {
        background: var(--bg-secondary);
        color: var(--text-secondary);

        &:hover {
          background: #3b82f6;
          color: white;
        }
      }
    }
  `]
})
export class AuthorBioComponent {
  @Input() author: Author = DEFAULT_AUTHOR;
}
